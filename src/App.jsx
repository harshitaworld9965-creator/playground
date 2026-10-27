
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./App.css";

gsap.registerPlugin(useGSAP);

function App() {
  const playgroundRef = useRef(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      intro
        .from(".navbar", {
          y: -30,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-title h1",
          {
            y: 100,
            opacity: 0,
            duration: 1,
          },
          "-=0.3",
        )
        .from(
          ".shape",
          {
            scale: 0,
            rotation: -90,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.5",
        )
        .from(
          ".hero-note, .hero-topline, .hero-bottom",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.4",
        );
    },
    { scope: playgroundRef },
  );

  function animateShape(selector) {
    const shape = playgroundRef.current?.querySelector(selector);

    if (!shape) return;

    gsap.to(shape, {
      rotation: "+=25",
      scale: 1.15,
      duration: 0.35,
      ease: "back.out(2)",
      overwrite: "auto",
    });
  }

  function resetShape(selector) {
    const shape = playgroundRef.current?.querySelector(selector);

    if (!shape) return;

    gsap.to(shape, {
      rotation: 0,
      scale: 1,
      duration: 0.45,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  }

  return (
    <main className="playground" ref={playgroundRef}>
      <nav className="navbar">
        <a className="logo" href="#home">
          PLAY<span>GROUND</span>®
        </a>

        <p className="nav-note">A LAB FOR THE UNEXPECTED</p>

        <a className="menu-link" href="#explore">
          EXPLORE <span>↗</span>
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-topline">
          <span>INDEPENDENT CREATIVE LAB</span>
          <span>EST. 2026 — EVERYWHERE</span>
        </div>

        <div className="hero-title">
          <h1>
            LET'S
            <br />
            MAKE
            <br />
            <span className="title-last">
              <span className="title-it">SOME</span>
              <span className="title-fun">FUN.</span>
            </span>
          </h1>

          <div
            className="shape shape-star"
            aria-hidden="true"
            onMouseEnter={() => animateShape(".shape-star")}
            onMouseLeave={() => resetShape(".shape-star")}
          >
            ✳
          </div>

          <div
            className="shape shape-orb"
            aria-hidden="true"
            onMouseEnter={() => animateShape(".shape-orb")}
            onMouseLeave={() => resetShape(".shape-orb")}
          >
            <span />
          </div>

          <div
            className="shape shape-flower"
            aria-hidden="true"
            onMouseEnter={() => animateShape(".shape-flower")}
            onMouseLeave={() => resetShape(".shape-flower")}
          >
            ✿
          </div>

          <div
            className="shape shape-spark"
            aria-hidden="true"
            onMouseEnter={() => animateShape(".shape-spark")}
            onMouseLeave={() => resetShape(".shape-spark")}
          >
            +
          </div>

          <p className="hero-note">
            LESS SCROLLING.
            <br />
            MORE PLAYING.
          </p>
        </div>

        <div className="hero-bottom">
          <p>
            WE MAKE DIGITAL THINGS
            <br />
            THAT REFUSE TO BE BORING.
          </p>

          <a className="explore-button" href="#explore">
            TAKE A LOOK <span>↓</span>
          </a>

          <p className="scroll-note">
            SCROLL TO WANDER
            <br />
            THERE ARE NO RULES.
          </p>
        </div>
      </section>

      <section className="manifesto" id="explore">
        <div className="manifesto-label">
          <span>01 / OUR PHILOSOPHY</span>
          <span>GOOD IDEAS MISBEHAVE.</span>
        </div>

        <h2>
          BORING IS
          <br />
          <span>NOT</span> AN OPTION<span className="period">.</span>
        </h2>

        <p>
          A little curiosity. A little chaos.
          <br />
          A whole lot of imagination.
        </p>
      </section>

      <footer className="footer">
        <span>PLAYGROUND® — CREATIVE EXPERIMENTS</span>
        <span>MADE FOR THE FUN OF IT ✳</span>
      </footer>
    </main>
  );
}

export default App;
