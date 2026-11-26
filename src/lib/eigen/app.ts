// The whole landing experience: a liquid-mercury blob that breaks into a matrix A, tells a short story,
// and eigendecomposes into Λ, whose diagonal entries open the site's sections as expanding sheets.
// It is imperative on purpose (WebGL, rAF, Web Animations); React only renders the static shell.
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { LAMBDA, SECTIONS } from "@/data/site";

type Cell = { ch: string; kind: "n" | "h" | "d" | "z"; k?: number };

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

// ---------- the matrix A = Q Λ Qᵀ, built so its eigenvalues really are LAMBDA ----------
function buildA(): number[][] {
  let s0 = 20261125;
  const rnd = () => (s0 = (s0 * 16807) % 2147483647) / 2147483647;
  const M = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => rnd() * 2 - 1));
  const Qm: number[][] = [];
  for (const v of M) {
    const u = v.slice();
    for (const q of Qm) { const d = u.reduce((s, x, i) => s + x * q[i], 0); for (let i = 0; i < 5; i++) u[i] -= d * q[i]; }
    const n = Math.hypot(...u); Qm.push(u.map((x) => x / n));
  }
  return Array.from({ length: 5 }, (_, i) => Array.from({ length: 5 }, (_, j) => Qm.reduce((s, q, k) => s + q[i] * LAMBDA[k] * q[j], 0)));
}
export function jacobiEigenvalues(S: number[][]): number[] {
  const B = S.map((r) => r.slice()), N = B.length;
  for (let it = 0; it < 200; it++) {
    let p = 0, q = 1, mx = 0;
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (Math.abs(B[i][j]) > mx) { mx = Math.abs(B[i][j]); p = i; q = j; }
    if (mx < 1e-12) break;
    const th = (B[q][q] - B[p][p]) / (2 * B[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
    for (let k = 0; k < N; k++) { const a = B[k][p], b = B[k][q]; B[k][p] = c * a - s * b; B[k][q] = s * a + c * b; }
    for (let k = 0; k < N; k++) { const a = B[p][k], b = B[q][k]; B[p][k] = c * a - s * b; B[q][k] = s * a + c * b; }
  }
  return B.map((r, i) => r[i]).sort((a, b) => b - a);
}
const A = buildA();
// self-check: the matrix on screen really has these eigenvalues
console.assert(jacobiEigenvalues(A).every((l, i) => Math.abs(l - LAMBDA[i]) < 1e-6), "the eigendecomposition of A does not give LAMBDA");

const BLOB_SHADER = `#include <common>
  uniform float uT,uAmp,uRip,uRipT; uniform vec4 uPull;
  vec4 perm(vec4 x){ return mod(((x*34.)+1.)*x,289.); }
  float snoise(vec3 v){ const vec2 C=vec2(1./6.,1./3.); vec3 i=floor(v+dot(v,C.yyy)), x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz), l=1.-g, i1=min(g,l.zxy), i2=max(g,l.zxy); vec3 x1=x0-i1+C.x, x2=x0-i2+C.y, x3=x0-.5;
    i=mod(i,289.); vec4 p=perm(perm(perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    vec4 j=p-49.*floor(p/49.), x_=floor(j/7.), y_=floor(j-7.*x_), x=(x_*2.+.5)/7.-1., y=(y_*2.+.5)/7.-1., h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy), b1=vec4(x.zw,y.zw), s0=floor(b0)*2.+1., s1=floor(b1)*2.+1., sh_=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh_.xxyy, a1=b1.xzyw+s1.xzyw*sh_.zzww;
    vec3 g0=vec3(a0.xy,h.x), g1=vec3(a0.zw,h.y), g2=vec3(a1.xy,h.z), g3=vec3(a1.zw,h.w);
    vec4 nr=inversesqrt(vec4(dot(g0,g0),dot(g1,g1),dot(g2,g2),dot(g3,g3))); g0*=nr.x; g1*=nr.y; g2*=nr.z; g3*=nr.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
    return 42.*dot(m*m,vec4(dot(g0,x0),dot(g1,x1),dot(g2,x2),dot(g3,x3))); }
  vec3 disp(vec3 p){
    // a drop in zero gravity: surface tension holds it round while it wobbles through its first modes
    // (an oval, then a pear) about two slowly turning axes, with a trace of noise so it never repeats
    vec3 a1=normalize(vec3(sin(uT*.21),cos(uT*.17),.45)), a2=normalize(vec3(cos(uT*.13+1.),sin(uT*.19),-.5));
    float z1=dot(p,a1), z2=dot(p,a2);
    float m2=(3.*z1*z1-1.)*.5, m3=z2*(5.*z2*z2-3.)*.5;
    float n=snoise(p*.9+vec3(0.,uT*.1,uT*.08));
    float r=1.+uAmp*(.62*m2*sin(uT*1.05)+.38*m3*sin(uT*.77+1.3)+.3*n);
    r+=uPull.w*exp((dot(p,normalize(uPull.xyz))-1.)*3.);
    float a=acos(clamp(p.z,-1.,1.)), age=uT-uRipT;
    r+=uRip*step(0.,age)*sin(a*6.5-age*10.)*exp(-age*1.8)*.06;
    return p*r; }`;
const BLOB_NORMAL = `vec3 pp=normalize(position);
    vec3 t1=normalize(cross(pp,abs(pp.y)<.99?vec3(0.,1.,0.):vec3(1.,0.,0.))), t2=cross(pp,t1);
    vec3 d0=disp(pp), d1=disp(normalize(pp+t1*.012)), d2=disp(normalize(pp+t2*.012));
    vec3 objectNormal=normalize(cross(d1-d0,d2-d0));`;
const STUDIO_FRAG = `varying vec3 d;
  float box(float az,float y,float a0,float aw,float y0,float y1,float s){
    return smoothstep(aw,aw-s,abs(az-a0))*smoothstep(y0-s,y0,y)*(1.-smoothstep(y1,y1+s,y)); }
  void main(){ float y=d.y, az=atan(d.z,d.x);
    vec3 sky=mix(vec3(.30),vec3(1.15),smoothstep(.05,.95,y));
    vec3 floor_=mix(vec3(.10),vec3(.58),smoothstep(-.15,-1.,y));
    vec3 c=y>0.?sky:floor_;
    c*=1.-.75*exp(-pow((y-.01)/.035,2.));
    c*=1.-.6*smoothstep(1.,.15,abs(az+1.5708))*smoothstep(.55,-.1,y)*smoothstep(-.6,0.,y);
    c+=vec3(2.4)*box(az,y,1.95,.55,.32,.72,.12);
    c+=vec3(3.2)*box(az,y,.85,.10,.05,.85,.05);
    c+=vec3(.9)*exp(-pow((y-.16)/.03,2.))*smoothstep(2.6,1.2,abs(az-1.57));
    gl_FragColor=vec4(c*vec3(.96,.985,1.03),1.); }`;
const COMP_FRAG = `
  uniform sampler2D tText,tMass,tDrop; uniform vec2 uRes,uCell; uniform float uT,uDis,uMove,uShadow; uniform vec3 uPtr; varying vec2 vUv;
  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.); }
  vec3 tone(vec3 c){ return pow(aces(c*1.1),vec3(1./2.2)); }
  float chrome(float y){
    float c = y>0. ? mix(.46,.96,smoothstep(0.,.85,y)) : mix(.06,.42,smoothstep(-.08,-1.,y));
    return c*(1.-.62*exp(-pow((y+.12)/.06,2.)));
  }
  void main(){
    vec2 px=vUv*uRes; vec4 tx=texture2D(tText,vUv); float t=uT*uMove;
    float dist=length(px-uPtr.xy)/uRes.y;
    float ring=uPtr.z*sin(dist*60.-t*7.)*exp(-dist*6.)*.9;
    float swell=.2*sin(px.x*.011+t*.8)+.12*sin(px.y*.017-t*1.1+px.x*.005);
    float line=fract(px.y/uCell.y);
    float y=(line-.5)*2.3+swell+ring+.3*sin(px.x*.0035-t*.45);
    float c=chrome(y)+.55*pow(max(0.,sin(px.x*.005-px.y*.009+t*.7)),50.);
    vec3 ink=vec3(c*.8)*vec3(.98,.99,1.03);
    vec3 mat=mix(vec3(.2,.26,.1),vec3(.74,.82,.55),clamp(c,0.,1.));
    float yb=(vUv.y-.5)*2.4+swell*.6+ring;
    vec3 brk=vec3((chrome(yb)+.45*pow(max(0.,sin(vUv.y*9.-t*.6)),30.))*.8);
    vec3 col = (tx.r>.5&&tx.g>.5) ? brk : tx.r>.5 ? ink : tx.g>.5 ? mat : vec3(mix(.86,.52,tx.b));
    vec4 o=vec4(col*tx.a,tx.a);
    float sh=uShadow*.2*exp(-pow((vUv.x-.5)/.17,2.)-pow((vUv.y-.27)/.028,2.));
    o=vec4(0.,0.,0.,sh)+o*(1.-sh);
    vec4 mb=texture2D(tMass,vUv); float keep=step(uDis,hash(floor(px/uCell))*.98+.01); mb*=keep;
    o=vec4(tone(mb.rgb),mb.a)+o*(1.-mb.a);
    vec4 db=texture2D(tDrop,vUv); o=vec4(tone(db.rgb),db.a)+o*(1.-db.a);
    gl_FragColor=o;
  }`;

/** Starts the experience inside the shell rendered by EigenSite. Returns a cleanup function. */
export function startEigen(): () => void {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
  const offs: (() => void)[] = [];
  const on = (t: EventTarget, type: string, fn: (e: Event) => void, o?: AddEventListenerOptions) => {
    t.addEventListener(type, fn, o); offs.push(() => t.removeEventListener(type, fn, o));
  };
  let alive = true, raf = 0;
  document.body.classList.add("intro", "locked");

  // ================= hero: a written matrix, inked in liquid mercury =================
  const view = $<HTMLCanvasElement>("ascii"), mxBox = $("mx");
  const tc = document.createElement("canvas"), ctx = tc.getContext("2d")!;
  const RAMP = ".:-=+*#%@", SCR = "0123456789.-+";
  // mask colours: red = chrome ink, green = matcha chrome, blue = flat grey (strength sets the shade)
  const BRACKET = "rgb(255,255,0)", INK = "rgb(255,0,0)", MATCHA = "rgb(0,255,0)", HEAD = "rgb(0,0,255)", ZERO = "rgb(0,0,110)", SCRAM = "rgb(0,0,180)";
  let COLS = 1, ROWS_ = 1, CW = 1, CH = 1, FS = 16, narrow = false, CELLW = 10, GAP = 3, W = 1, H = 1, dpr = 1;
  let S_T: (Cell | null)[] = [], L_T: (Cell | null)[] = [], D1 = new Float32Array(0), D2 = new Float32Array(0), dgEls: HTMLButtonElement[] = [];
  const FONT = () => `700 ${FS}px "Computer Modern Typewriter", ui-monospace, monospace`;

  function buildTargets() {
    const N = COLS * ROWS_; S_T = new Array(N).fill(null); L_T = new Array(N).fill(null);
    const w = CELLW, g = GAP, blockW = 5 * w + 4 * g, c0 = 3 + Math.floor((COLS - 6 - blockW) / 2);
    const step = 2, blockH = 2 + 4 * step + 1, r0 = 1 + Math.floor((ROWS_ - 2 - blockH) / 2), rh = r0, rn = r0 + 2;
    const put = (T: (Cell | null)[], r: number, c: number, str: string, kind: Cell["kind"], k?: number) => {
      const off = Math.floor((w - str.length) / 2);
      for (let i = 0; i < str.length; i++) if (str[i] !== " ") T[r * COLS + c + off + i] = { ch: str[i], kind, k };
    };
    const fmt = (x: number) => { if (Math.abs(x) < 0.005) x = 0; return narrow ? (x < 0 ? "-" : "") + Math.abs(x).toFixed(2).replace(/^0/, "") : x.toFixed(2); };
    for (let j = 0; j < 5; j++) put(L_T, rh, c0 + j * (w + g), "λ" + (j + 1), "h");
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const r = rn + i * step, c = c0 + j * (w + g);
      put(S_T, r, c, fmt(A[i][j]), "n");
      if (i === j) put(L_T, r, c, narrow ? SECTIONS[i].short : SECTIONS[i].name, "d", i); else put(L_T, r, c, "0", "z");
    }
    D1 = Float32Array.from({ length: N }, () => Math.random() * 0.45); D2 = Float32Array.from({ length: N }, () => Math.random() * 0.4);
    // a button over each eigenvalue on the diagonal
    dgEls.forEach((e) => e.remove());
    dgEls = SECTIONS.map((s, k) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "dg"; b.setAttribute("aria-label", "Open " + s.name);
      // as big as it can be without touching a neighbour: the full cell plus its gap, two rows tall (diagonal cells never share a row or column)
      b.style.left = (c0 + k * (w + g) - g / 2) * CW + "px"; b.style.top = (rn + k * step - 0.5) * CH + "px"; b.style.width = (w + g) * CW + "px"; b.style.height = CH * 2 + "px";
      b.addEventListener("click", () => openSheet(k, b)); mxBox.appendChild(b); return b;
    });
  }

  // ---------- three.js: mercury blob, chrome cursor, and the compositing shader ----------
  const renderer = new THREE.WebGLRenderer({ canvas: view, antialias: false, alpha: true, premultipliedAlpha: true });
  renderer.setClearColor(0x000000, 0);
  const studioScene = new THREE.Scene();
  studioScene.add(new THREE.Mesh(new THREE.SphereGeometry(10, 64, 32), new THREE.ShaderMaterial({ side: THREE.BackSide,
    vertexShader: "varying vec3 d; void main(){ d=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
    fragmentShader: STUDIO_FRAG })));
  const pm = new THREE.PMREMGenerator(renderer), env = pm.fromScene(studioScene, 0.02).texture; pm.dispose();
  const metal = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.025, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.05 });
  const massScene = new THREE.Scene(), dropScene = new THREE.Scene(); massScene.environment = env; dropScene.environment = env;
  // the blob: a dense sphere the GPU deforms every frame, with normals rebuilt from the deformed surface
  const BU = { uT: { value: 0 }, uAmp: { value: 0.16 }, uPull: { value: new THREE.Vector4(0, 0, 1, 0) }, uRip: { value: 0 }, uRipT: { value: -99 } };
  const blobMat = metal.clone();
  blobMat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, BU);
    sh.vertexShader = sh.vertexShader.replace("#include <common>", BLOB_SHADER).replace("#include <beginnormal_vertex>", BLOB_NORMAL).replace("#include <begin_vertex>", "vec3 transformed=d0;");
  };
  const mass = new THREE.Mesh(new THREE.IcosahedronGeometry(1, innerWidth < 760 ? 40 : 80), blobMat); massScene.add(mass);
  // springs that give the blob its feel: a pop on arrival, a squish when pressed, a lean toward the cursor
  const blob = { pop: 0, popV: 0, sq: 0, sqV: 0, press: 0, pull: 0, pullV: 0 };
  // the cursor: a bevelled chrome arrow, tip at the origin, so it can track the pointer 1:1
  const arrow = new THREE.Shape();
  [[0, 0], [0, -1], [0.25, -0.77], [0.42, -1.17], [0.58, -1.1], [0.41, -0.71], [0.73, -0.71]].forEach(([x, y], i) => (i ? arrow.lineTo(x, y) : arrow.moveTo(x, y)));
  arrow.closePath();
  // smooth normals across the face and bevel make it shade like a pillowed drop of metal rather than a flat cut-out
  let arrowGeo: THREE.BufferGeometry = new THREE.ExtrudeGeometry(arrow, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.065, bevelSegments: 12, curveSegments: 8 });
  arrowGeo.deleteAttribute("normal"); arrowGeo.deleteAttribute("uv");
  arrowGeo = mergeVertices(arrowGeo, 1e-4); arrowGeo.computeVertexNormals(); arrowGeo.translate(0, 0, -0.08);
  const cursorMat = metal.clone();
  const drop = new THREE.Mesh(arrowGeo, cursorMat); drop.visible = false; dropScene.add(drop);
  const cur = { rz: 0, rx: 0, ry: 0, s: 1, hot: 0, down: 0 }, MATCHA_C = new THREE.Color(0x8a9a5b), WHITE_C = new THREE.Color(0xffffff);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20); cam.position.z = 5;
  const massRT = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 4 });
  const dropRT = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 4 });
  const lowRT = new THREE.WebGLRenderTarget(4, 4, { type: THREE.UnsignedByteType });
  let lowBuf = new Uint8Array(16);
  const textTex = new THREE.CanvasTexture(tc); textTex.minFilter = THREE.LinearFilter; textTex.generateMipmaps = false;
  const U = { tText: { value: textTex }, tMass: { value: null as THREE.Texture | null }, tDrop: { value: null as THREE.Texture | null },
    uRes: { value: new THREE.Vector2() }, uCell: { value: new THREE.Vector2() }, uT: { value: 0 }, uDis: { value: 0 }, uShadow: { value: 1 },
    uPtr: { value: new THREE.Vector3(-1e4, -1e4, 0) }, uMove: { value: 1 } };
  const comp = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: U, depthTest: false, depthWrite: false, blending: THREE.NoBlending,
    vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }", fragmentShader: COMP_FRAG }));
  const compScene = new THREE.Scene(); compScene.add(comp);
  const compCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  function layout() {
    narrow = innerWidth < 760; const short = innerHeight < 820;
    CELLW = narrow ? 6 : 10; GAP = narrow ? 1 : 3; COLS = 5 * CELLW + 4 * GAP + 8; ROWS_ = 15;
    // size the type so the whole matrix fits beside its label
    ctx.font = '700 100px "Computer Modern Typewriter", ui-monospace, monospace'; const per = ctx.measureText("0").width / 100;
    const avail = innerWidth - (narrow ? 28 : 360);
    // ...and fits vertically between the nav + caption above and the hint below
    const availH = innerHeight - (narrow ? 260 : 300);
    FS = Math.max(10, Math.min(short ? 19 : 22, Math.floor(avail / (COLS * per)), Math.floor(availH / (ROWS_ * 1.24))));
    ctx.font = FONT(); CW = ctx.measureText("0").width; CH = Math.round(FS * 1.24);
    dpr = Math.min(devicePixelRatio, 2); W = COLS * CW; H = ROWS_ * CH;
    view.style.width = W + "px"; view.style.height = H + "px"; renderer.setPixelRatio(dpr); renderer.setSize(W, H, false);
    tc.width = Math.round(W * dpr); tc.height = Math.round(H * dpr);
    massRT.setSize(tc.width, tc.height); dropRT.setSize(tc.width, tc.height); lowRT.setSize(COLS, ROWS_); lowBuf = new Uint8Array(COLS * ROWS_ * 4);
    U.uRes.value.set(tc.width, tc.height); U.uCell.value.set(CW * dpr, CH * dpr);
    const aspect = W / H; cam.left = -aspect; cam.right = aspect; cam.updateProjectionMatrix();
    buildTargets();
  }

  const ptr = { x: 0, y: 0, on: false, hot: false, sx: 0, sy: 0, vx: 0, vy: 0, px: 0, py: 0, s: 0 };
  on(mxBox, "pointerdown", () => (cur.down = 1)); on(window, "pointerup", () => { cur.down = 0; blob.press = 0; });
  on(mxBox, "pointermove", (ev) => {
    const e = ev as PointerEvent; if (e.pointerType === "touch") return;
    ptr.hot = !!(e.target as HTMLElement).closest(".tap:not([hidden]),.dg");
    const r = view.getBoundingClientRect(), u = (e.clientX - r.left) / r.width, v = (e.clientY - r.top) / r.height;
    ptr.x = (u * 2 - 1) * (W / H); ptr.y = 1 - 2 * v; ptr.px = u; ptr.py = v; ptr.on = true;
  });
  on(mxBox, "pointerleave", () => (ptr.on = false));

  // ---------- the flow: blob → click → a short story → A → Λ ----------
  const lhs = $("lhs"), caps = [$("c0"), $("c1")], hint = $("hint"), tap = $<HTMLButtonElement>("tap"), cue = $("cue"), replay = $("replay");
  const scr = () => SCR[(Math.random() * SCR.length) | 0];
  let loadAt = 0, clickAt: number | null = null, phase = -1, solved = false, decompAt: number | null = null;
  // no narration: one click runs the whole thing. The mercury breaks into A (settled by ~2.8s),
  // A holds for a beat so it can be read, then it eigendecomposes into Λ
  const HOLD_A = 3.4;
  function caption(i: number) { caps.forEach((c, j) => c.classList.toggle("on", j === i)); }
  function decompose(at: number) { decompAt = at; caption(1); lhs.textContent = "Λ ="; lhs.classList.add("on"); }
  function open() { if (clickAt !== null) return; clickAt = performance.now(); tap.hidden = true; cue.classList.remove("on"); }
  function solveNow() { clickAt = performance.now() - 20000; tap.hidden = true; cue.classList.remove("on"); decompose(performance.now() - 20000); }
  on(tap, "click", () => { BU.uRip.value = 1; BU.uRipT.value = performance.now() / 1000; open(); });
  on(tap, "pointerdown", () => (blob.press = 1)); on(tap, "pointerleave", () => (blob.press = 0));
  on(replay, "click", () => {
    clickAt = null; phase = -1; solved = false; decompAt = null;
    caption(0); lhs.classList.remove("on"); lhs.textContent = "A ="; tap.hidden = false; replay.classList.remove("on"); hint.style.opacity = "0";
    document.body.classList.remove("solved"); document.body.classList.add("intro", "locked");
  });

  function frame(now: number) {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    const t = now / 1000, k = reduce ? 0 : 1;
    // the blank page: a bead of mercury swells into the blob, and says hello
    const ti = (now - loadAt) / 1000, bloom = reduce ? 1 : easeOut(clamp01((ti - 0.1) / 1.5));
    if (phase === -1 && ti > 0.55 && clickAt === null) { phase = 0; caption(0); }
    if (clickAt === null && ti > 1.4) cue.classList.add("on");

    // after the click: brackets draw in, the mercury breaks into characters, settles into A, then eigendecomposes into Λ
    const tt = clickAt === null ? -1 : ((now - clickAt) / 1000) * (reduce ? 20 : 1);
    const X = ease(clamp01(tt / 1.1)), B = ease(clamp01((tt - 0.25) / 0.9));
    if (tt > 1.5 && decompAt === null) lhs.classList.add("on");  // "A =" arrives as the characters settle
    if (tt > HOLD_A && decompAt === null) decompose(now);
    const m0 = clamp01((tt - 1.0) / 0.7), m1 = clamp01((tt - 1.5) / 1.3), m2 = decompAt === null ? 0 : clamp01(((now - decompAt) / 1000 / 1.2) * (reduce ? 20 : 1));

    const drain = Math.pow(1 - m1, 1.6);
    // arrival: an underdamped spring, so it overshoots a touch and settles
    blob.popV += ((ti > 0.1 ? 1 : 0) - blob.pop) * 0.05; blob.popV *= reduce ? 0 : 0.86; blob.pop = reduce ? (ti > 0.1 ? 1 : 0) : blob.pop + blob.popV;
    // press: a quick squash, released into a jiggle
    blob.sqV += (blob.press - blob.sq) * 0.22; blob.sqV *= 0.78; blob.sq += blob.sqV;
    // lean: how hard it reaches toward the cursor, strongest when the cursor is close
    const near = ptr.on && clickAt === null ? Math.max(0, 1 - Math.hypot(ptr.sx, ptr.sy) / 1.3) : 0;
    blob.pullV += (near * 0.2 - blob.pull) * 0.08; blob.pullV *= 0.8; blob.pull += blob.pullV;
    BU.uT.value = reduce ? 0 : t; BU.uPull.value.set(ptr.sx, ptr.sy, 0.55, blob.pull);
    mass.visible = drain > 0.01;
    if (mass.visible) {
      const R = 0.44 * Math.max(0, blob.pop) * (0.35 + 0.65 * drain), q = blob.sq;
      // on click it is pulled out toward the brackets before it breaks into characters
      mass.scale.set(R * (1 + 0.12 * q + 0.9 * X), R * (1 - 0.18 * q - 0.12 * X), R * (1 + 0.12 * q));
    }
    const ox = ptr.sx, oy = ptr.sy; ptr.sx += (ptr.x - ptr.sx) * 0.22; ptr.sy += (ptr.y - ptr.sy) * 0.22; ptr.s += ((ptr.on ? 1 : 0) - ptr.s) * 0.35;
    ptr.vx += (ptr.sx - ox - ptr.vx) * 0.3; ptr.vy += (ptr.sy - oy - ptr.vy) * 0.3;
    drop.visible = ptr.s > 0.02;
    if (drop.visible) {
      // the tip is glued to the pointer; only its attitude lags, so it feels like liquid metal with weight
      const vx = ptr.vx * 60, vy = ptr.vy * 60, sp = Math.min(1, Math.hypot(vx, vy) * 0.12);
      cur.rz += ((ptr.hot ? -0.22 : 0) + Math.max(-0.5, Math.min(0.5, -vx * 0.06)) - cur.rz) * 0.18;
      cur.ry += (Math.max(-0.6, Math.min(0.6, vx * 0.1)) - cur.ry) * 0.15; cur.rx += (Math.max(-0.6, Math.min(0.6, -vy * 0.1)) - cur.rx) * 0.15;
      cur.hot += ((ptr.hot ? 1 : 0) - cur.hot) * 0.2; cur.s += ((cur.down ? 0.86 : ptr.hot ? 1.14 : 1) - cur.s) * 0.3;
      const S = 0.15 * cur.s * ptr.s;
      drop.position.set(ptr.x, ptr.y, 0.5); drop.rotation.set(cur.rx + 0.25, cur.ry - 0.3, cur.rz); drop.scale.set(S * (1 - sp * 0.08), S * (1 + sp * 0.16), S);
      cursorMat.color.copy(WHITE_C).lerp(MATCHA_C, cur.hot * 0.7);
    }

    renderer.setRenderTarget(massRT); renderer.clear(); renderer.render(massScene, cam);
    renderer.setRenderTarget(dropRT); renderer.clear(); renderer.render(dropScene, cam);
    renderer.setRenderTarget(lowRT); renderer.clear(); renderer.render(massScene, cam);
    renderer.readRenderTargetPixels(lowRT, 0, 0, COLS, ROWS_, lowBuf);
    renderer.setRenderTarget(null);

    // write the characters into the mask
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); ctx.font = FONT(); ctx.textBaseline = "middle";
    const batches = new Map<string, (string | number)[]>();
    const add = (col: string, ch: string, c: number, r: number) => { let b = batches.get(col); if (!b) batches.set(col, (b = [])); b.push(ch, c, r); };
    if (m0 > 0.01) for (let r = 0; r < ROWS_; r++) for (let c = 0; c < COLS; c++) {
      if (c === 0 || c === COLS - 1 || ((c === 1 || c === COLS - 2) && (r === 1 || r === ROWS_ - 2))) continue;
      const i = r * COLS + c, inner = c >= 3 && c < COLS - 3 && r >= 1 && r < ROWS_ - 1;
      let merc: string | null = null;
      if (inner) {
        const p = ((ROWS_ - 1 - r) * COLS + c) * 4, a = lowBuf[p + 3];
        if (a > 70) {
          const l = clamp01((Math.pow((lowBuf[p] * 0.3 + lowBuf[p + 1] * 0.59 + lowBuf[p + 2] * 0.11) / 255, 1 / 2.2) - 0.18) / 0.72);
          merc = RAMP[Math.min(8, Math.floor(Math.pow(1 - l, 0.7) * 9))];
        }
      }
      const u1 = clamp01((m1 - D1[i]) / 0.25), u2 = clamp01((m2 - D2[i]) / 0.25);
      const S = S_T[i], L = L_T[i], T = u2 >= 1 ? L : u2 > 0 && S?.ch !== L?.ch ? "scr" : S;
      if (merc) { add(INK, merc, c, r); continue; }
      if (u1 <= 0) continue;
      if (u1 < 1 || T === "scr") { if (S || L) add(SCRAM, reduce ? "0" : scr(), c, r); continue; }
      // section names on the diagonal are always matcha, the site's link colour, so they read as clickable before any hover
      if (T) { const kind = T.kind === "d" ? "m" : T.kind; add(kind === "m" ? MATCHA : kind === "h" ? HEAD : kind === "z" ? ZERO : INK, T.ch, c, r); }
    }
    batches.forEach((b, col) => { ctx.fillStyle = col; for (let j = 0; j < b.length; j += 3) ctx.fillText(b[j] as string, (b[j + 1] as number) * CW, (b[j + 2] as number) * CH + CH / 2); });
    // matrix brackets: continuous chrome strokes that draw outward from the middle, then hook their corners
    if (B > 0) {
      ctx.fillStyle = BRACKET; const sw = Math.max(2, FS * 0.14), y0 = CH * 0.6, y1 = H - CH * 0.6, x0 = CW * 0.55, x1 = W - CW * 0.55, tk = CW * 1.3 * clamp01((B - 0.94) / 0.06);
      const mid = H / 2, half = ((y1 - y0) / 2) * B, a = mid - half, b = mid + half;
      ctx.fillRect(x0, a, sw, b - a); ctx.fillRect(x1 - sw, a, sw, b - a);
      if (tk > 0) { ctx.fillRect(x0, y0, tk, sw); ctx.fillRect(x0, y1 - sw, tk, sw); ctx.fillRect(x1 - tk, y0, tk, sw); ctx.fillRect(x1 - tk, y1 - sw, tk, sw); }
    }
    textTex.needsUpdate = true;

    U.tMass.value = massRT.texture; U.tDrop.value = dropRT.texture; U.uT.value = t; U.uMove.value = k; U.uDis.value = m0 * 1.02; U.uShadow.value = (1 - m0) * drain * bloom;
    U.uPtr.value.set(ptr.px * U.uRes.value.x, (1 - ptr.py) * U.uRes.value.y, ptr.s);
    renderer.render(compScene, compCam);

    if (tt >= 0) {
      const done = decompAt !== null && m2 >= 0.999;
      if (done && !solved) {
        solved = true; document.body.classList.remove("intro", "locked"); document.body.classList.add("solved"); replay.classList.add("on");
        view.setAttribute("aria-label", "The matrix Lambda: " + SECTIONS.map((s) => s.name).join(", ") + " on its diagonal, zeros elsewhere");
      }
      hint.style.opacity = done && scrollY < 40 ? "1" : "0";
    }
  }

  // ================= expanding an eigenvalue into its page =================
  const sheet = $("sheet"), body = $("pageBody"), crumb = $("crumb"), backBtn = $("back"), sbar = $("sbar");
  let curK = -1, pushed = false;
  const rectClip = (r: DOMRect) =>
    `inset(${Math.max(0, r.top)}px ${Math.max(0, innerWidth - r.right)}px ${Math.max(0, innerHeight - r.bottom)}px ${Math.max(0, r.left)}px round 22px)`;
  function render(k: number) {
    body.dataset.page = SECTIONS[k].id;
    const s = SECTIONS[k], prev = SECTIONS[k - 1], next = SECTIONS[k + 1];
    crumb.innerHTML = `λ<sub>${k + 1}</sub> · ${s.name}`;
    body.innerHTML = `<div class="pin${s.portrait ? " has-portrait" : ""}"><div><h1 id="pageTitle" tabindex="-1">${s.title || s.name}</h1>${s.head ?? (s.lede ? `<p class="lede">${s.lede}</p>` : "")}</div>${s.portrait || ""}</div>${s.body()}
      <nav class="next" aria-label="Other eigenvalues">${prev ? `<a href="#${prev.id}" data-k="${k - 1}"><span>← λ${k}</span>${prev.name}</a>` : ""}${next ? `<a class="r" href="#${next.id}" data-k="${k + 1}"><span>λ${k + 2} →</span>${next.name}</a>` : ""}</nav>`;
    // links between sections swap the open page in place
    body.querySelectorAll<HTMLAnchorElement>(".next a, .story a[data-k]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault(); const j = +(a.dataset.k ?? 0); history.replaceState(null, "", "#" + SECTIONS[j].id); show(j, true);
    }));
  }
  // one curve for the sheet both ways (iOS's sheet curve: fast out of the gate, long settle), so it can reverse mid-flight
  const SHEET = "cubic-bezier(.32,.72,0,1)";
  let anim: Animation | null = null, closing = false, titleWatch: IntersectionObserver | null = null;
  function show(k: number, swap = false, instant = false) {
    curK = k; render(k); sheet.scrollTop = 0; sbar.classList.remove("edge", "titled");
    // the bar's title appears only once the large title has scrolled under it
    titleWatch?.disconnect();
    titleWatch = new IntersectionObserver(([e]) => sbar.classList.toggle("titled", !e.isIntersecting), { root: sheet, rootMargin: "-52px 0px 0px 0px" });
    titleWatch.observe($("pageTitle"));
    if (!reduce && !instant) [...body.querySelectorAll<HTMLElement>(".pin h1, .pin .lede, .pin .intro-lines > *, .pin .portrait")].forEach((el, i) =>
      el.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 480, delay: (swap ? 0 : 180) + i * 45, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
    $("pageTitle").focus({ preventScroll: true });
  }
  function openSheet(k: number, el: HTMLElement | null, { push = true, instant = false } = {}) {
    // grabbed again while it was shrinking away: reverse from where it is instead of restarting
    if (closing && anim && k === curK) { closing = false; anim.onfinish = null; anim.reverse(); if (push) { history.pushState(null, "", "#" + SECTIONS[k].id); pushed = true; } return; }
    sheet.hidden = false; sheet.style.transform = ""; document.body.style.overflow = "hidden"; show(k, false, instant);
    if (push) { history.pushState(null, "", "#" + SECTIONS[k].id); pushed = true; }
    if (reduce && !instant) anim = sheet.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
    else if (!instant && el) anim = sheet.animate([{ clipPath: rectClip(el.getBoundingClientRect()) }, { clipPath: "inset(0px 0px 0px 0px round 0px)" }], { duration: 560, easing: SHEET });
  }
  function closeSheet(fromY = 0) {
    if (sheet.hidden || closing) return;
    const cell = dgEls[curK], r = cell.getBoundingClientRect(), onScreen = r.width > 0 && r.bottom > 0 && r.top < innerHeight;
    const done = () => { closing = false; sheet.hidden = true; sheet.style.transform = ""; document.body.style.overflow = ""; cell.focus({ preventScroll: true }); curK = -1; };
    if (reduce) { anim = sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200 }); anim.onfinish = done; closing = true; return; }
    // still opening? run the same animation backwards from its current frame, back into the cell
    if (anim && anim.playState === "running" && !fromY) { closing = true; anim.reverse(); anim.onfinish = done; return; }
    closing = true;
    anim = fromY
      ? sheet.animate([{ transform: `translateY(${fromY}px)` }, { transform: `translateY(${innerHeight}px)` }], { duration: 320, easing: SHEET })
      : sheet.animate(onScreen ? [{ clipPath: "inset(0px 0px 0px 0px round 0px)" }, { clipPath: rectClip(r) }] : [{ opacity: 1 }, { opacity: 0 }], { duration: onScreen ? 420 : 220, easing: SHEET });
    anim.onfinish = done;
  }
  const clearHash = () => history.replaceState(null, "", location.pathname + location.search);
  // the bar only grows a divider once content is scrolling under it
  on(sheet, "scroll", () => sbar.classList.toggle("edge", sheet.scrollTop > 4), { passive: true });
  // touch: drag the bar down to dismiss. It tracks the finger 1:1; on release the flick's velocity is projected
  // forward (Apple's deceleration model) to decide between dismissing and springing back
  {
    let y0: number | null = null, hist: [number, number][] = [], dragging = false;
    on(sbar, "pointerdown", (ev) => {
      const e = ev as PointerEvent; if (e.pointerType !== "touch" || (e.target as HTMLElement).closest("a,button")) return;
      y0 = e.clientY; hist = [[e.timeStamp, 0]]; dragging = false; sbar.setPointerCapture(e.pointerId);
    });
    on(sbar, "pointermove", (ev) => {
      const e = ev as PointerEvent; if (y0 === null) return; const dy = Math.max(0, e.clientY - y0);
      if (!dragging && dy < 10) return; dragging = true; sheet.style.transform = `translateY(${dy}px)`; hist.push([e.timeStamp, dy]); if (hist.length > 5) hist.shift();
    });
    const end = () => {
      if (y0 === null) return; const dy = hist[hist.length - 1][1], [t0, p0] = hist[0], [t1, p1] = hist[hist.length - 1];
      const v = t1 > t0 ? ((p1 - p0) / (t1 - t0)) * 1000 : 0, projected = dy + ((v / 1000) * 0.998) / (1 - 0.998); y0 = null;
      if (!dragging) return;
      if (projected > innerHeight * 0.3) { if (pushed) { pushed = false; history.back(); } else clearHash(); closeSheet(dy); }
      else sheet.animate([{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }], { duration: 380, easing: SHEET }).onfinish = () => (sheet.style.transform = "");
    };
    on(sbar, "pointerup", end); on(sbar, "pointercancel", end);
  }
  on(backBtn, "click", () => { if (pushed) { pushed = false; history.back(); } else { clearHash(); closeSheet(); } });
  on(window, "keydown", (ev) => { if ((ev as KeyboardEvent).key === "Escape" && !sheet.hidden) backBtn.click(); });
  on(window, "popstate", () => {
    const k = SECTIONS.findIndex((s) => "#" + s.id === location.hash);
    if (k < 0) { pushed = false; const m = /translateY\(([\d.]+)px\)/.exec(sheet.style.transform); closeSheet(m ? +m[1] : 0); }
    else if (k !== curK) openSheet(k, dgEls[k], { push: false });
  });

  function placeTap() { const s = Math.min(W, H) * 0.62; tap.style.width = tap.style.height = s + "px"; cue.style.top = H / 2 + H * 0.32 + "px"; }
  on(window, "resize", () => { layout(); placeTap(); });
  if (matchMedia("(pointer: coarse)").matches) {
    if (cue.lastChild) cue.lastChild.textContent = "tap the mercury";
    hint.textContent = "tap a section on the diagonal to open it";
  }

  document.fonts.load('700 22px "Computer Modern Typewriter"').then(() => document.fonts.ready).then(() => {
    if (!alive) return;
    layout(); placeTap(); loadAt = performance.now();
    // a shared link to a section skips straight past the opening
    const k = SECTIONS.findIndex((s) => "#" + s.id === location.hash);
    if (k >= 0) { solveNow(); openSheet(k, dgEls[k], { push: false, instant: true }); }
    raf = requestAnimationFrame(frame);
  });

  return () => {
    alive = false; cancelAnimationFrame(raf); offs.forEach((f) => f()); titleWatch?.disconnect();
    dgEls.forEach((e) => e.remove());
    renderer.dispose(); massRT.dispose(); dropRT.dispose(); lowRT.dispose(); textTex.dispose(); env.dispose();
    document.body.classList.remove("intro", "locked", "solved"); document.body.style.overflow = "";
  };
}
