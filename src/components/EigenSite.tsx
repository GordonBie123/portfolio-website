"use client";

import Link from "next/link";
import { useEffect } from "react";
import { captions, contact } from "@/data/site";
import { startEigen } from "@/lib/eigen/app";

// The static shell. Everything that moves lives in startEigen(), which binds to these ids.
export default function EigenSite() {
  useEffect(() => startEigen(), []);

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link className="brand" href="/">{contact.name}</Link>
          <a className="pill" href={`mailto:${contact.email}`}>Email me</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="stage">
          <div className="caps" aria-live="polite">
            <div id="c0"><h1>{captions.hello}</h1></div>
            <div id="c1"><h2 dangerouslySetInnerHTML={{ __html: captions.done }} /></div>
          </div>
          <div className="eq">
            <span className="lhs" id="lhs">A =</span>
            <div className="mx" id="mx">
              <canvas id="ascii" role="img" aria-label="A liquid mercury drop" />
              <button className="tap" id="tap" type="button" aria-label="Break the blob into a matrix" />
              <p className="cue" id="cue"><i />click the blob</p>
            </div>
            <span className="lhs" style={{ visibility: "hidden" }} aria-hidden="true">A =</span>
          </div>
          <div className="under">
            <p className="hint" id="hint">click a section on the diagonal to open it</p>
          </div>
          <button className="replay" id="replay" type="button">↺ replay</button>
        </div>
      </section>


      <div className="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="pageTitle" hidden>
        <div className="sbar" id="sbar">
          <span className="grab" aria-hidden="true" />
          <div className="wrap">
            <button className="back" id="back" type="button">
              <svg viewBox="0 0 8 13" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6.5 1 1 6.5 6.5 12" /></svg>
              Go back
            </button>
            <span className="crumb" id="crumb" />
            <a className="pill" href={`mailto:${contact.email}`}>Email me</a>
          </div>
        </div>
        <article className="page"><div className="wrap" id="pageBody" /></article>
      </div>
    </>
  );
}
