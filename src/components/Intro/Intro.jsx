
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Intro.css";

import mhLogo from "../../../favicon-mh.svg";

const SESSION_KEY = "mh-intro-seen";

function wasIntroSeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // Continue without session storage.
  }
}

function createParticles() {
  return Array.from({ length: 36 }, (_, index) => ({
    id: index,
    x: `${(index * 37.7 + 7) % 96 + 2}%`,
    y: `${(index * 53.3 + 11) % 94 + 3}%`,
    delay: `${(index % 9) * 0.35}s`,
    duration: `${4 + (index % 6)}s`,
    size: `${index % 5 === 0 ? 3 : 1 + (index % 2)}px`,
    drift: `${8 + (index % 5) * 5}px`,
  }));
}

const PARTICLES = createParticles();

function Intro() {
  const [visible, setVisible] = useState(() => !wasIntroSeen());
  const [progress, setProgress] = useState(0);
  const [resourcesReady, setResourcesReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const finishedRef = useRef(false);

  // Essential resource readiness.
  useEffect(() => {
    if (!visible) return;

    let active = true;
    let timeoutId;

    const images = Array.from(
      document.querySelectorAll('img:not([loading="lazy"])')
    );

    const tasks = [
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => {
            window.addEventListener("load", resolve, { once: true });
          }),

      document.fonts?.ready || Promise.resolve(),

      ...images.map(async (img) => {
        if (img.complete) {
          try {
            await img.decode?.();
          } catch {
            // Broken image should not block the intro.
          }
          return;
        }

        await new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }),
    ];

    let completed = 0;

    const loading = Promise.all(
      tasks.map((task) =>
        Promise.resolve(task)
          .catch(() => {})
          .then(() => {
            completed += 1;

            if (active) {
              setProgress(
                Math.round((completed / tasks.length) * 100)
              );
            }
          })
      )
    );

    // Never leave the visitor waiting indefinitely.
    const fallback = new Promise((resolve) => {
      timeoutId = window.setTimeout(resolve, 7000);
    });

    Promise.race([loading, fallback]).then(() => {
      if (!active) return;

      setProgress(100);
      setResourcesReady(true);
    });

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [visible]);

  // Lock scrolling while the opening is active.
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  // Exit transition and skip handling.
  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    markIntroSeen();

    timelineRef.current?.kill();
    timelineRef.current = null;

    const root = rootRef.current;

    if (!root) {
      setVisible(false);
      return;
    }

    gsap.killTweensOf(root);

    gsap.to(root, {
      autoAlpha: 0,
      scale: 1.035,
      filter: "blur(8px)",
      duration: 0.75,
      ease: "power3.inOut",
      onComplete: () => setVisible(false),
    });
  }, []);

  // Cinematic four-act sequence.
  useEffect(() => {
    if (!visible) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      markIntroSeen();
      setVisible(false);
      return;
    }

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationDone(true),
      });

      timelineRef.current = tl;

      // ACT 01 — THE AWAKENING
      tl.fromTo(
        ".intro-atmosphere",
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.out" }
      )
        .fromTo(
          ".intro-grid",
          { opacity: 0 },
          { opacity: 0.45, duration: 1.4 },
          0.2
        )
        .fromTo(
          ".intro-particle",
          { opacity: 0, scale: 0, y: 18 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.035,
            ease: "power2.out",
          },
          0.45
        )
        .fromTo(
          ".intro-topbar",
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.1
        )

        // ACT 02 — THE CORE
        .fromTo(
          ".intro-core",
          { opacity: 0, scale: 0.55, filter: "blur(15px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.35,
            ease: "power3.out",
          },
          2.15
        )
        .fromTo(
          ".intro-energy",
          { scale: 0.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          2.35
        )
        .fromTo(
          ".intro-orbit",
          { rotation: -70, scale: 0.6, opacity: 0 },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          2.5
        )
        .fromTo(
          ".intro-logo",
          { opacity: 0, scale: 0.45, filter: "blur(15px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "back.out(1.4)",
          },
          3.55
        )
        .fromTo(
          ".intro-core-caption",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          4.25
        )

        // ACT 03 — THE IDENTITY
        .fromTo(
          ".intro-overline",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          5.05
        )
        .fromTo(
          ".intro-name",
          {
            opacity: 0,
            y: 35,
            filter: "blur(14px)",
            letterSpacing: "0.22em",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            letterSpacing: "-0.055em",
            duration: 1.15,
            ease: "power3.out",
          },
          5.35
        )
        .fromTo(
          ".intro-role",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          6.15
        )
        .fromTo(
          ".intro-access",
          { opacity: 0, scale: 0.85, y: 12 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.75,
            ease: "back.out(1.5)",
          },
          6.9
        )

        // ACT 04 — THE TRANSITION
        .fromTo(
          ".intro-footer",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          7.15
        )
        .fromTo(
          ".intro-portal",
          { opacity: 0, scale: 0.2 },
          {
            opacity: 0.85,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          7.75
        )
        .to(
          ".intro-portal",
          {
            scale: 8,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
          },
          8.75
        )
        .to({}, { duration: 0.45 });
    }, rootRef);

    return () => {
      context.revert();
      timelineRef.current = null;
    };
  }, [visible]);

  // Both the cinematic sequence and resources must be ready.
  useEffect(() => {
    if (animationDone && resourcesReady) {
      finishIntro();
    }
  }, [animationDone, resourcesReady, finishIntro]);

  if (!visible) return null;

  return (
    <div className="intro-screen" ref={rootRef}>
      {/* Background atmosphere */}
      <div className="intro-atmosphere" aria-hidden="true">
        <div className="intro-nebula intro-nebula-one" />
        <div className="intro-nebula intro-nebula-two" />
        <div className="intro-nebula intro-nebula-three" />
      </div>

      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />

      {/* Digital dust */}
      <div className="intro-particles" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            className="intro-particle"
            key={particle.id}
            style={{
              "--x": particle.x,
              "--y": particle.y,
              "--delay": particle.delay,
              "--duration": particle.duration,
              "--size": particle.size,
              "--drift": particle.drift,
            }}
          />
        ))}
      </div>

      {/* Cinematic light streaks */}
      <div className="intro-light-streak intro-streak-one" aria-hidden="true" />
      <div className="intro-light-streak intro-streak-two" aria-hidden="true" />

      {/* Header */}
      <header className="intro-topbar">
        <div className="intro-brand">
          <img src={mhLogo} alt="" />
          <span>MOHAMED HAGAG</span>
        </div>

        <div className="intro-system-status">
          <span className="intro-status-dot" />
          DIGITAL IDENTITY SYSTEM
        </div>

        <button
          className="intro-skip"
          type="button"
          onClick={finishIntro}
        >
          SKIP INTRO <span>↗</span>
        </button>
      </header>

      {/* Side technical HUD */}
      <div className="intro-side intro-side-left" aria-hidden="true">
        <span>IDENTITY NODE</span>
        <strong>MH / 001</strong>
        <i />
        <span>SECURE CHANNEL</span>
        <strong>ESTABLISHED</strong>
      </div>

      <div className="intro-side intro-side-right" aria-hidden="true">
        <span>PROTOCOL</span>
        <strong>INITIALIZE</strong>
        <i />
        <span>ENVIRONMENT</span>
        <strong>DIGITAL SPACE</strong>
      </div>

      {/* Main cinematic composition */}
      <main className="intro-main">
        <div className="intro-core">
          <div className="intro-energy" aria-hidden="true" />

          <div className="intro-orbit intro-orbit-one" aria-hidden="true" />
          <div className="intro-orbit intro-orbit-two" aria-hidden="true" />
          <div className="intro-orbit intro-orbit-three" aria-hidden="true" />
          <div className="intro-orbit intro-orbit-four" aria-hidden="true" />

          <div className="intro-core-glow" aria-hidden="true" />

          <div className="intro-logo">
            <img src={mhLogo} alt="Mohamed Hagag" />
          </div>
        </div>

        <div className="intro-core-caption">
          <span />
          DIGITAL IDENTITY / VERIFIED
          <span />
        </div>

        <div className="intro-title-block">
          <p className="intro-overline">
            WELCOME TO MY DIGITAL UNIVERSE
          </p>

          <h1 className="intro-name">
            MOHAMED <span>HAGAG</span>
          </h1>

          <p className="intro-role">
            DATA ANALYST <span>·</span> DEVELOPER <span>·</span> BUILDER
          </p>
        </div>

        <div className="intro-access">
          <span className="intro-access-check">✓</span>
          <span>IDENTITY VERIFIED</span>
          <i />
          <strong>ACCESS GRANTED</strong>
        </div>
      </main>

      {/* Portal transition */}
      <div className="intro-portal" aria-hidden="true" />

      {/* Loading console */}
      <footer className="intro-footer">
        <div className="intro-loading-header">
          <span>PREPARING YOUR EXPERIENCE</span>
          <strong>{String(progress).padStart(3, "0")}%</strong>
        </div>

        <div
          className="intro-progress-track"
          role="progressbar"
          aria-label="Loading website resources"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="intro-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="intro-footer-meta">
          <span>
            <i />
            {resourcesReady ? "SYSTEM READY" : "INITIALIZING"}
          </span>
          <span>MH / DIGITAL IDENTITY</span>
          <span>2026</span>
        </div>
      </footer>

      {/* Corner details */}
      <span className="intro-corner intro-corner-tl" />
      <span className="intro-corner intro-corner-tr" />
      <span className="intro-corner intro-corner-bl" />
      <span className="intro-corner intro-corner-br" />
    </div>
  );
}

export default Intro;
