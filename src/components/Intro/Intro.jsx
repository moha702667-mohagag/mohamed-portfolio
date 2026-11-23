import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Intro.css";
import mhLogo from "../../../favicon-mh.svg";

const SESSION_KEY = "mh-intro-seen";

const PARTICLES = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 61 + 7) % 100}%`,
  delay: `${(index % 8) * 0.35}s`,
  duration: `${5 + (index % 6)}s`,
  size: `${2 + (index % 3)}px`,
}));

function Intro() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const resourcesReadyRef = useRef(false);
  const animationDoneRef = useRef(false);
  const finishingRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (finishingRef.current) return;

    finishingRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "true");

    timelineRef.current?.kill();

    if (!rootRef.current) {
      setVisible(false);
      return;
    }

    gsap.to(rootRef.current, {
      autoAlpha: 0,
      scale: 1.025,
      duration: 0.75,
      ease: "power3.inOut",
      onComplete: () => setVisible(false),
    });
  }, []);

  const checkFinish = useCallback(() => {
    if (resourcesReadyRef.current && animationDoneRef.current) {
      finishIntro();
    }
  }, [finishIntro]);

  // Check session and user's motion preference.
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(SESSION_KEY) === "true";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasSeenIntro || prefersReducedMotion) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
    }
  }, []);

  // Wait for important page resources, with a safety timeout.
  useEffect(() => {
    if (!visible) return;

    let active = true;

    const finishResourceCheck = () => {
      if (!active) return;

      resourcesReadyRef.current = true;
      checkFinish();
    };

    const imagePromises = Array.from(document.images)
      .filter((image) => image.loading !== "lazy")
      .map(
        (image) =>
          new Promise((resolve) => {
            if (image.complete) {
              resolve();
              return;
            }

            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          })
      );

    const pagePromise =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => {
            window.addEventListener("load", resolve, { once: true });
          });

    const fontsPromise = document.fonts?.ready ?? Promise.resolve();

    const timeout = window.setTimeout(finishResourceCheck, 7000);

    Promise.all([pagePromise, fontsPromise, ...imagePromises]).then(() => {
      finishResourceCheck();
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [visible, checkFinish]);

  // Lock scrolling while the intro is visible.
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  // Main cinematic timeline.
  useEffect(() => {
    if (!visible || !rootRef.current) return;

    const root = rootRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          animationDoneRef.current = true;
          checkFinish();
        },
      });

      timelineRef.current = tl;

      gsap.set(
        [
          ".intro-kicker",
          ".intro-core",
          ".intro-logo",
          ".intro-core-caption",
          ".intro-title-block",
          ".intro-role",
          ".intro-access",
          ".intro-side-info",
          ".intro-topbar",
          ".intro-footer",
        ],
        { autoAlpha: 0 }
      );

      gsap.set(".intro-core", { scale: 0.65, rotate: -18 });
      gsap.set(".intro-logo", { scale: 0.65, rotateY: 35 });
      gsap.set(".intro-title", { y: 45, filter: "blur(12px)" });
      gsap.set(".intro-role", { y: 18 });
      gsap.set(".intro-access", { scale: 0.85 });
      gsap.set(".intro-portal", { scale: 0.05, autoAlpha: 0 });

      // Scene 01 — THE AWAKENING
      tl.addLabel("awakening", 0);

      tl.to(".intro-grid", {
        autoAlpha: 0.38,
        duration: 1.6,
      }, "awakening");

      tl.to(".intro-ambient", {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
      }, "awakening");

      tl.to(".intro-particles span", {
        autoAlpha: 1,
        stagger: {
          each: 0.035,
          from: "random",
        },
        duration: 1.1,
      }, "awakening+=0.25");

      tl.fromTo(
        ".intro-kicker",
        { y: 15, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        "awakening+=0.8"
      );

      tl.to(".intro-side-info, .intro-topbar", {
        autoAlpha: 1,
        duration: 0.8,
      }, "awakening+=1.1");

      // Scene 02 — THE CORE
      tl.addLabel("core", "awakening+=2.1");

      tl.to(".intro-core", {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        duration: 1.4,
        ease: "back.out(1.3)",
      }, "core");

      tl.to(".intro-orbit-ring", {
        autoAlpha: 1,
        stagger: 0.15,
        duration: 0.9,
      }, "core+=0.2");

      tl.to(".intro-energy", {
        autoAlpha: 1,
        scaleX: 1,
        duration: 1.1,
        stagger: 0.12,
      }, "core+=0.35");

      tl.to(".intro-logo", {
        autoAlpha: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.1,
        ease: "back.out(1.5)",
      }, "core+=0.65");

      tl.to(".intro-core-caption", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
      }, "core+=1.1");

      // Scene 03 — THE IDENTITY
      tl.addLabel("identity", "core+=2.25");

      tl.to(".intro-core", {
        scale: 0.78,
        y: -105,
        duration: 1.1,
        ease: "power2.inOut",
      }, "identity");

      tl.to(".intro-core-caption", {
        autoAlpha: 0,
        y: -12,
        duration: 0.35,
      }, "identity");

      tl.to(".intro-title-block", {
        autoAlpha: 1,
        duration: 0.3,
      }, "identity+=0.2");

      tl.to(".intro-title", {
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }, "identity+=0.25");

      tl.to(".intro-role", {
        autoAlpha: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
      }, "identity+=1.05");

      // Scene 04 — THE TRANSITION
      tl.addLabel("transition", "identity+=2.1");

      tl.to(".intro-access", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.6)",
      }, "transition");

      tl.to(".intro-portal", {
        autoAlpha: 0.9,
        scale: 1,
        duration: 1.15,
        ease: "power2.in",
      }, "transition+=0.55");

      tl.to(".intro-portal", {
        scale: 18,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.in",
      }, "transition+=1.4");

      tl.to(".intro-main", {
        scale: 1.06,
        duration: 1.1,
        ease: "power2.in",
      }, "transition+=1.1");

      tl.to(".intro-footer", {
        autoAlpha: 1,
        duration: 0.5,
      }, "awakening+=0.5");

    }, root);

    return () => {
      timelineRef.current?.kill();
      ctx.revert();
    };
  }, [visible, checkFinish]);

  const handleSkip = () => {
    resourcesReadyRef.current = true;
    animationDoneRef.current = true;
    finishIntro();
  };

  if (!visible) return null;

  return (
    <div className="intro-screen" ref={rootRef}>
      <div className="intro-background" />

      <div className="intro-grid" />
      <div className="intro-noise" />
      <div className="intro-ambient" />

      <div className="intro-particles" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      <div className="intro-scan-beam" />

      <header className="intro-topbar">
        <div className="intro-topbar-brand">
          <span className="intro-status-dot" />
          <span>MH / DIGITAL IDENTITY</span>
        </div>

        <button className="intro-skip" onClick={handleSkip}>
          SKIP INTRO <span>↗</span>
        </button>
      </header>

      <aside className="intro-side-info intro-side-left">
        <span>PERSONAL PORTFOLIO</span>
        <span>EST. 2026</span>
      </aside>

      <aside className="intro-side-info intro-side-right">
        <span>INITIALIZING EXPERIENCE</span>
        <span>SECURE CONNECTION</span>
      </aside>

      <main className="intro-main">
        <div className="intro-kicker">
          <span className="intro-kicker-line" />
          <span>THE DIGITAL CINEMA EXPERIENCE</span>
          <span className="intro-kicker-line" />
        </div>

        <div className="intro-core">
          <div className="intro-core-glow" />

          <div className="intro-orbit-ring intro-orbit-ring-outer" />
          <div className="intro-orbit-ring intro-orbit-ring-middle" />
          <div className="intro-orbit-ring intro-orbit-ring-inner" />

          <div className="intro-energy intro-energy-one" />
          <div className="intro-energy intro-energy-two" />

          <div className="intro-logo-frame">
            <img
              className="intro-logo"
              src={mhLogo}
              alt="MH Logo"
              draggable="false"
            />
          </div>

          <div className="intro-core-caption">
            <span>CORE SYSTEM</span>
            <span className="intro-caption-line" />
            <span>MH-01</span>
          </div>
        </div>

        <div className="intro-title-block">
          <span className="intro-title-overline">WELCOME TO MY WORLD</span>

          <h1 className="intro-title">
            MOHAMED <span>HAGAG</span>
          </h1>

          <div className="intro-role">
            <span>DATA ANALYST</span>
            <i />
            <span>DEVELOPER</span>
            <i />
            <span>BUILDER</span>
          </div>
        </div>

        <div className="intro-access">
          <span className="intro-access-icon">✓</span>
          <span>ACCESS GRANTED</span>
        </div>
      </main>

      <div className="intro-portal" />

      <footer className="intro-footer">
        <div className="intro-footer-label">
          <span>EXPERIENCE LOADING</span>
          <span>{String(progress).padStart(2, "0")}%</span>
        </div>

        <div className="intro-progress-track">
          <div
            className="intro-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="intro-footer-bottom">
          <span>DESIGNED TO BUILD WHAT'S NEXT</span>
          <span>MH © 2026</span>
        </div>
      </footer>

      <div className="intro-corner intro-corner-tl" />
      <div className="intro-corner intro-corner-tr" />
      <div className="intro-corner intro-corner-bl" />
      <div className="intro-corner intro-corner-br" />
    </div>
  );
}

export default Intro;