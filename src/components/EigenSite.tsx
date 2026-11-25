"use client";

import Link from "next/link";
import { useEffect } from "react";
import { contact, slides } from "@/data/site";
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
            {slides.map((html, i) => (
              <div id={`c${i}`} key={i}>
                {i === 0 ? <h1 dangerouslySetInnerHTML={{ __html: html }} /> : <h2 dangerouslySetInnerHTML={{ __html: html }} />}
              </div>
            ))}
          </div>
          <div className="eq">
            <span className="lhs" id="lhs">A =</span>
            <div className="mx" id="mx">
              <canvas id="ascii" role="img" aria-label="A liquid mercury drop" />
              <button className="tap" id="tap" type="button" aria-label="Break the mercury into a matrix" />
              <p className="cue" id="cue"><i />click the mercury</p>
            </div>
            <span className="lhs" style={{ visibility: "hidden" }} aria-hidden="true">A =</span>
          </div>
          <p className="hint" id="hint">click an eigenvalue</p>
          <div className="story-nav" id="storyNav" aria-label="Story progress">
            <div className="dots" id="dots" />
            <span className="adv">click or press → to continue</span>
            <button type="button" id="skipStory">Skip</button>
          </div>
          <button className="replay" id="replay" type="button">↺ replay</button>
        </div>
      </section>

      <section className="contact">
        <div className="wrap">
          <h2>Let&apos;s find a shared eigenvector.</h2>
          <a className="mail" href={`mailto:${contact.email}`}>{contact.email}</a>
          <div className="more">
            <a href={contact.cv} target="_blank" rel="noopener">CV</a>
            <a href={contact.linkedin}>LinkedIn</a>
            <a href={contact.github}>GitHub</a>
          </div>
        </div>
      </section>
      <footer><div className="wrap">© {new Date().getFullYear()} {contact.name}</div></footer>

      <div className="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="pageTitle" hidden>
        <div className="sbar" id="sbar">
          <span className="grab" aria-hidden="true" />
          <div className="wrap">
            <button className="back" id="back" type="button">
              <svg viewBox="0 0 8 13" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6.5 1 1 6.5 6.5 12" /></svg>
              All eigenvalues
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
