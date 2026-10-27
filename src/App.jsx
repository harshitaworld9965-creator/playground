
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
      // 1. HERO INTRO
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".navbar", {
          y: -25,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-title h1",
          {
            y: 90,
            opacity: 0,
            duration: 1,
          },
          "-=0.3",
        )
        .from(
          ".shape",
          {
            scale: 0,
            rotation: -30,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.6",
        )
        .from(
          ".hero-note, .hero-topline, .hero-bottom",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4",
        );

      // 2. MANIFESTO REVEAL
      gsap.fromTo(
        ".manifesto h2",
        {
          y: 100,
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
            scrub: 1,
          },
        },
      );

      // 3. PINNED HORIZONTAL EXPERIMENT GALLERY
      const experimentsSection =
        playgroundRef.current.querySelector(".experiments");
      const track =
        playgroundRef.current.querySelector(".experiment-track");

      if (experimentsSection && track) {
        const getScrollDistance = () =>
          Math.max(
            0,
            track.scrollWidth - experimentsSection.clientWidth,
          );

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: experimentsSection,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // 4. PINNED PLAYGROUND SCENE
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-section",
          start: "top top",
          end: "+=700",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline
        .from(".pin-content h2", {
          x: -100,
          opacity: 0,
          ease: "none",
        })
        .from(
          ".pin-description",
          {
            y: 35,
            opacity: 0,
            ease: "none",
          },
          "<",
        )
        .to(
          ".pin-symbol",
          {
            rotation: 360,
            scale: 1.2,
            ease: "none",
          },
          0,
        );

      // 5. PAGE SCROLL PROGRESS
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // Recalculate trigger positions after images and layout settle.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    {
      scope: playgroundRef,
    },
  );

  // Decorative shapes respond to hover.
  const animateShape = (selector) => {
    const shape = playgroundRef.current?.querySelector(selector);
    if (!shape) return;

    gsap.to(shape, {
      rotation: "+=25",
      scale: 1.12,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const resetShape = (selector) => {
    const shape = playgroundRef.current?.querySelector(selector);
    if (!shape) return;

    gsap.to(shape, {
      rotation: 0,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <main className="playground" ref={playgroundRef}>
      <div className="scroll-progress">
        <div className="scroll-progress-bar" />
      </div>

      <nav className="navbar">
        <a className="nav-logo" href="#home">
          PLAYGROUND<span>®</span>
        </a>

        <span className="nav-note">A CREATIVE LAB FOR CURIOUS MINDS</span>

        <a className="nav-link" href="#experiments">
          LET'S PLAY ↗
        </a>
      </nav>

      <section className="hero" id="home">
        <p className="hero-topline">INDEPENDENT CREATIVE EXPERIMENTS / 2026</p>

        <div className="hero-title">
          <h1>
            LET'S MAKE
            <br />
            SOME FUN<span>.</span>
          </h1>
        </div>

        <p className="hero-note">
          LESS PERFECT.
          <br />
          MORE PLAYFUL.
        </p>

        <div
          className="shape shape-star"
          onMouseEnter={() => animateShape(".shape-star")}
          onMouseLeave={() => resetShape(".shape-star")}
        >
          ✳
        </div>

        <div
          className="shape shape-orb"
          onMouseEnter={() => animateShape(".shape-orb")}
          onMouseLeave={() => resetShape(".shape-orb")}
        />

        <div
          className="shape shape-flower"
          onMouseEnter={() => animateShape(".shape-flower")}
          onMouseLeave={() => resetShape(".shape-flower")}
        >
          ✿
        </div>

        <div
          className="shape shape-spark"
          onMouseEnter={() => animateShape(".shape-spark")}
          onMouseLeave={() => resetShape(".shape-spark")}
        >
          +
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
          <span>MADE FOR THE JOY OF MAKING</span>
        </div>
      </section>

      <section className="manifesto">
        <p>01 / THE MANIFESTO</p>
        <h2>
          GOOD IDEAS
          <br />
          NEED ROOM
          <br />
          TO <span>PLAY.</span>
        </h2>
      </section>

      <section className="experiments" id="experiments">
        <div className="experiments-heading">
          <p>02 / THE EXPERIMENTS</p>
          <h2>THINGS WE LIKE TO PLAY WITH.</h2>
        </div>

        <div className="experiment-window">
          <div className="experiment-track">
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
        </div>
      </section>

      <section className="pin-section">
        <div className="pin-content">
          <p>03 / A LITTLE CHAOS</p>
          <h2>
            STAY
            <br />
            CURIOUS<span>.</span>
          </h2>
          <p className="pin-description">
            Follow the weird idea. Try the unexpected thing. See what happens.
          </p>
        </div>

        <div className="pin-symbol" aria-hidden="true">
          ✳
        </div>
      </section>

      <footer className="footer">
        <p>PLAY MORE. WORRY LESS.</p>
        <a href="#home">BACK TO TOP ↑</a>
        <span>© PLAYGROUND 2026</span>
      </footer>
    </main>
  );
}

export default App;
