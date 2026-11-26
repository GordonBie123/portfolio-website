import type { Metadata } from "next";
import Link from "next/link";
import { contact, LAMBDA, SECTIONS } from "@/data/site";

export const metadata: Metadata = {
  title: "Eigenvalues, briefly · Gordon Bie",
  description: "What a matrix and an eigenvalue are, and what they have to do with the home page.",
};

/** A small matrix or column vector in brackets. */
function M({ rows }: { rows: (string | number)[][] }) {
  return (
    <span className="mat" style={{ ["--c" as string]: rows[0].length }} role="img" aria-label={`matrix ${rows.map((r) => r.join(" ")).join("; ")}`}>
      {rows.flat().map((v, i) => <span key={i}>{v}</span>)}
    </span>
  );
}

export default function Eigenvalues() {
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link className="brand" href="/">{contact.name}</Link>
          <a className="pill" href={`mailto:${contact.email}`}>Email me</a>
        </div>
      </header>

      <main className="page explain">
        <div className="wrap">
          <Link className="crumb-back" href="/">← Back to the matrix</Link>
          <h1>What’s an eigenvalue?</h1>
          <p className="lede">The short version, for anyone who clicked.</p>

          <h2>A matrix is a grid of numbers</h2>
          <p>
            On its own it’s just a table. The useful part is what it <i>does</i>: multiply a vector by a matrix and you get a
            new vector. So a matrix is really a transformation, a rule that stretches, squashes, rotates or shears space.
          </p>
          <div className="eqn" aria-label="A equals the matrix 2, 1; 1, 2">
            <span><i>A</i> =</span>
            <M rows={[[2, 1], [1, 2]]} />
          </div>

          <h2>Most vectors get knocked off course</h2>
          <p>
            Push a vector through <i>A</i> and it usually comes out pointing somewhere new. But a few special directions
            survive: the vector comes out on the same line it went in on, just longer or shorter. Those are{" "}
            <b>eigenvectors</b>, and how much each one gets stretched is its <b>eigenvalue</b>, written λ.
          </p>
          <div className="eqn">
            <span><i>A</i><i>v</i> = <em>λ</em><i>v</i></span>
          </div>
          <p>For the matrix above there are two:</p>
          <div className="eqn">
            <M rows={[[2, 1], [1, 2]]} /><M rows={[[1], [1]]} /><span>=</span><M rows={[[3], [3]]} /><span>=</span><em>3</em><M rows={[[1], [1]]} />
          </div>
          <div className="eqn">
            <M rows={[[2, 1], [1, 2]]} /><M rows={[[1], ["−1"]]} /><span>=</span><M rows={[[1], ["−1"]]} /><span>=</span><em>1</em><M rows={[[1], ["−1"]]} />
          </div>
          <p>So <i>A</i> stretches everything along the diagonal (1, 1) by 3, and leaves the direction (1, −1) alone.</p>

          <h2>Why they matter</h2>
          <p>
            Change your coordinates, rotate your point of view, write the same transformation down a different way, and the
            numbers in the grid all change. The eigenvalues don’t. They’re the part of a matrix that’s true however you look
            at it, which is why they turn up everywhere: the main directions of variation in a dataset (PCA), how Google
            first ranked web pages, the frequencies a bridge vibrates at, the energy levels of an atom.
          </p>

          <h2>Eigendecomposition</h2>
          <p>
            A symmetric matrix can be taken apart completely into its eigenvectors and eigenvalues:
          </p>
          <div className="eqn">
            <span><i>A</i> = <i>Q</i>Λ<i>Q</i><sup>T</sup></span>
          </div>
          <p>
            <i>Q</i> turns space to line up with the eigenvectors, Λ (capital lambda) stretches along each one by its
            eigenvalue, and <i>Q</i><sup>T</sup> turns it back. Λ is <b>diagonal</b>: the eigenvalues sit on its diagonal
            and every other entry is zero. Everything <i>A</i> does, with the essentials pulled out where you can see them.
          </p>

          <h2>The matrix on the home page</h2>
          <p>
            It’s real. The 5×5 matrix <i>A</i> that the mercury breaks into was built to have exactly these eigenvalues, and
            the page checks that in your browser. When it decomposes into Λ, those eigenvalues land on the diagonal, and
            each one is labelled with a part of me:
          </p>
          <div className="spec lam">
            {SECTIONS.map((s, k) => (
              <Link className="row" href={`/#${s.id}`} key={s.id}>
                <span className="yr">λ<sub>{k + 1}</sub></span>
                <span className="val">{LAMBDA[k].toFixed(1)}</span>
                <span className="role">{s.name} ›</span>
              </Link>
            ))}
          </div>
          <p>
            λ<sub>5</sub> = 0 for now, since Misc is empty. That makes <i>A</i> singular, which I’ll fix once there’s something
            in it.
          </p>

          <div className="next">
            <Link className="r" href="/"><span>Back</span>See them in action</Link>
          </div>
        </div>
      </main>
    </>
  );
}
