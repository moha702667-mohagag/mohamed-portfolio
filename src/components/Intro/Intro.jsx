
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Intro.css";

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

function Intro() {
  const [visible, setVisible] = useState(() => !wasIntroSeen());
  const [progress, setProgress] = useState(0);
  const [resourcesReady, setResourcesReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const finishedRef = useRef(false);

  // Measure actual readiness of the page's essential resources.
  useEffect(() => {
    if (!visible) return;

    let active = true;

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

      ...images.map((img) => {
        if (img.complete) {
          return img.decode?.().catch(() => {}) || Promise.resolve();
        }

        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }),
    ];

    let completed = 0;

    Promise.all(
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
    ).then(() => {
      if (active) {
        setProgress(100);
        setResourcesReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, [visible]);

  // Lock page scrolling while the intro is visible.
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const finishIntro = () => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    markIntroSeen();

    timelineRef.current?.kill();

    if (rootRef.current) {
      gsap.to(rootRef.current, {
        autoAlpha: 0,
        scale: 1.025,
        duration: 0.65,
        ease: "power3.inOut",
        onComplete: () => setVisible(false),
      });
    } else {
      setVisible(false);
    }
  };

  // Cinematic intro timeline.
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

      tl.fromTo(
        ".intro-grid",
        { opacity: 0 },
        { opacity: 0.8, duration: 0.8 }
      )
        .fromTo(
          ".intro-particle",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.025,
            ease: "power2.out",
          },
          0.15
        )
        .fromTo(
          ".intro-hud",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.35
        )
        .fromTo(
          ".intro-orbit",
          { opacity: 0, scale: 0.65, rotation: -35 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          0.45
        )
        .fromTo(
          ".intro-monogram",
          { opacity: 0, scale: 0.55, filter: "blur(12px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "back.out(1.5)",
          },
          0.95
        )
        .fromTo(
          ".intro-core-caption",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.45
        )
        .to(
          ".intro-scan-beam",
          { y: "110vh", duration: 1.15, ease: "power1.inOut" },
          1.55
        )
        .fromTo(
          ".intro-name",
          { opacity: 0, y: 30, filter: "blur(12px)", letterSpacing: "0.25em" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            letterSpacing: "-0.055em",
            duration: 0.95,
            ease: "power3.out",
          },
          2.05
        )
        .fromTo(
          ".intro-role",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55 },
          2.65
        )
        .fromTo(
          ".intro-access",
          { opacity: 0, scale: 0.85, y: 8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: "back.out(1.6)",
          },
          3.25
        )
        .to(
          ".intro-footer",
          { opacity: 1, y: 0, duration: 0.55 },
          3.45
        )
        .to({}, { duration: 0.6 });
    }, rootRef);

    return () => {
      context.revert();
      timelineRef.current = null;
    };
  }, [visible]);

  // Wait for both the visual sequence and essential resources.
  useEffect(() => {
    if (animationDone && resourcesReady) {
      finishIntro();
    }
  }, [animationDone, resourcesReady]);

  if (!visible) return null;

  return (
    <div className="intro-screen" ref={rootRef}>
      {/* Background atmosphere */}
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-ambient intro-ambient-one" aria-hidden="true" />
      <div className="intro-ambient intro-ambient-two" aria-hidden="true" />

      {/* Decorative particles */}
      <div className="intro-particles" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <span className="intro-particle" key={index} />
        ))}
      </div>

      {/* Scan beam */}
      <div className="intro-scan-beam" aria-hidden="true" />

      {/* Top HUD */}
      <div className="intro-topbar">
        <div className="intro-brand intro-hud">
          <span className="intro-brand-mark">MH</span>
          <span>IDENTITY SYSTEM</span>
        </div>

        <div className="intro-top-status intro-hud">
          <span className="intro-status-light" />
          SYSTEM ONLINE
        </div>

        <button
          className="intro-skip intro-hud"
          type="button"
          onClick={finishIntro}
        >
          SKIP INTRO <span>↗</span>
        </button>
      </div>

      {/* Side technical information */}
      <div className="intro-side-info intro-side-left intro-hud" aria-hidden="true">
        <span>SECURE CONNECTION</span>
        <strong>ENCRYPTED / 256</strong>
        <span className="intro-side-divider" />
        <span>IDENTITY NODE</span>
        <strong>MH-2026-01</strong>
      </div>

      <div className="intro-side-info intro-side-right intro-hud" aria-hidden="true">
        <span>PROTOCOL</span>
        <strong>INITIALIZE</strong>
        <span className="intro-side-divider" />
        <span>ACCESS LEVEL</span>
        <strong>AUTHORIZED</strong>
      </div>

      {/* Main identity core */}
      <main className="intro-main">
        <div className="intro-core">
          <div className="intro-orbit" aria-hidden="true">
            <span className="intro-orbit-ring intro-orbit-outer" />
            <span className="intro-orbit-ring intro-orbit-middle" />
            <span className="intro-orbit-ring intro-orbit-inner" />
            <span className="intro-orbit-ring intro-orbit-dashed" />
            <span className="intro-orbit-cross intro-cross-top" />
            <span className="intro-orbit-cross intro-cross-bottom" />
            <span className="intro-orbit-cross intro-cross-left" />
            <span className="intro-orbit-cross intro-cross-right" />
            <span className="intro-orbit-point intro-point-one" />
            <span className="intro-orbit-point intro-point-two" />
          </div>

          <div className="intro-core-light" aria-hidden="true" />

          <div className="intro-monogram">
            <span>M</span>
            <span>H</span>
          </div>
        </div>

        <div className="intro-core-caption">
          <span className="intro-caption-line" />
          <span>BIOMETRIC IDENTITY SCAN</span>
          <span className="intro-caption-line" />
        </div>

        <div className="intro-title-block">
          <p className="intro-overline">WELCOME TO MY DIGITAL SPACE</p>

          <h1 className="intro-name">
            MOHAMED <span>HAGAG</span>
          </h1>

          <p className="intro-role">
            DATA ANALYST <span>·</span> DEVELOPER <span>·</span> BUILDER
          </p>
        </div>

        <div className="intro-access">
          <span className="intro-access-icon">✓</span>
          <span>IDENTITY VERIFIED</span>
          <span className="intro-access-divider" />
          <strong>ACCESS GRANTED</strong>
        </div>
      </main>

      {/* Bottom system console */}
      <footer className="intro-footer">
        <div className="intro-loading-header">
          <span>INITIALIZING DIGITAL EXPERIENCE</span>
          <strong>{String(progress).padStart(3, "0")}%</strong>
        </div>

        <div
          className="intro-progress-track"
          role="progressbar"
          aria-label="Loading essential website resources"
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
            <i className="intro-meta-dot" />
            {resourcesReady ? "ALL RESOURCES READY" : "LOADING CORE RESOURCES"}
          </span>
          <span>MH / DIGITAL IDENTITY © 2026</span>
          <span>BUILD 01.026</span>
        </div>
      </footer>

      {/* Corner decorations */}
      <span className="intro-corner intro-corner-tl" aria-hidden="true" />
      <span className="intro-corner intro-corner-tr" aria-hidden="true" />
      <span className="intro-corner intro-corner-bl" aria-hidden="true" />
      <span className="intro-corner intro-corner-br" aria-hidden="true" />
    </div>
  );
}

export default Intro;
