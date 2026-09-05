import { useEffect, useState } from "react";
import "./ScrollProgress.css";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const documentHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const currentProgress =
          documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

        setProgress(
          Math.min(100, Math.max(0, currentProgress))
        );

        ticking = false;
      });
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateProgress,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      aria-hidden="true"
    >
      <div
        className="scroll-progress-bar"
        style={{
          transform: `scaleX(${progress / 100})`,
        }}
      />
    </div>
  );
}

export default ScrollProgress;