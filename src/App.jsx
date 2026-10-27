
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const experiments = [
  { number: "01", title: "TYPE THAT MOVES", color: "pink" },
  { number: "02", title: "SHAPES GONE WILD", color: "orange" },
  { number: "03", title: "SCROLL YOUR HEART OUT", color: "blue" },
  { number: "04", title: "BEAUTIFUL CHAOS", color: "lime" },
];

function App() {
  const playgroundRef = useRef(null);

  useGSAP(
    () => {
      // INTRO ANIMATION
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
          { y: 100, opacity: 0, duration: 1 },
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
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4",
        );

      // SCRUBBED MANIFESTO HEADLINE
      gsap.fromTo(
        ".manifesto h2",
        {
          y: 120,
          opacity: 0.2,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top 80%",
            end: "top 25%",
            scrub: true,
            markers: true,
          },
        },
      );

      // EXPERIMENT CARD REVEALS
      ScrollTrigger.batch(".experiment-card", {
        start: "top 85%",
        onEnter: (cards) => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
          });
        },
        onLeaveBack: (cards) => {
          gsap.set(cards, {
            y: 60,
            opacity: 0,
          });
        },
      });

      gsap.to(".scroll-progress-bar", {
        scaleX:1,
        ease:'none',
        scrollTrigger: {
          trigger:document.documentElement,
          start:"top top",
          end:'bottom bottom',
          scrub:true,
        },
      });

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-section",
          start:"top top",
          end: "+=700",
          pin:true,
          scrub:true,
          markers:true,
        },
      });

      pinTimeline
      .from(".pin-content h2", {
        x:-150,
        opacity:0,
        ease:'none',
      })
      .from(
        ".pin-description",
        {
          y:40,
          opacity:0,
          ease:'none',
        },
        "-=0.3",
      )
      .to(
        ".pin-symbol",
        {
          rotation:180,
          scale:1.4,
          ease:'none',
        },
        0,
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
      <div className="scroll-progress">
        <div className="scroll-progress-bar"></div>
      </div>
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

      <section className="experiments">
        <div className="experiments-heading">
          <p>02 / THE EXPERIMENTS</p>
          <h2>THINGS WE LIKE TO PLAY WITH.</h2>
        </div>

        <div className="experiment-grid">
          {experiments.map((experiment) => (
            <article
              className={`experiment-card card-${experiment.color}`}
              key={experiment.number}
            >
              <span className="card-number">{experiment.number}</span>
              <h3>{experiment.title}</h3>
              <span className="card-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="pin-section">
        <div className="pin-content">
          <p className="pin-label">03 / STAY A WHILE</p>

          <h2>
            DON'T
            <br/>
            BLINK<span>.</span>
          </h2>

          <p className="pin-description">
            Some things are better when you slow down.
          </p>

          <span className="pin-symbol" aria-hidden="true">
            *
          </span>
        </div>
      </section>

      <footer className="footer">
        <span>PLAYGROUND® — CREATIVE EXPERIMENTS</span>
        <span>MADE FOR THE FUN OF IT ✳</span>
      </footer>
    </main>
  );
}

export default App;
