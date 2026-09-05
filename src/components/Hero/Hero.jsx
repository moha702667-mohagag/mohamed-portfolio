import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import "./Hero.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

const heroStats = [
  {
    value: "01",
    key: "fullStack",
  },
  {
    value: "02",
    key: "dataAnalysis",
  },
  {
    value: "03",
    key: "digitalExperiences",
  },
];

const particleNodes = [
  { x: "8%", y: "18%", size: 3, delay: "0s" },
  { x: "28%", y: "8%", size: 2, delay: "1.2s" },
  { x: "52%", y: "16%", size: 3, delay: "2.4s" },
  { x: "78%", y: "10%", size: 2, delay: "0.8s" },
  { x: "92%", y: "28%", size: 3, delay: "1.8s" },
  { x: "18%", y: "42%", size: 2, delay: "2.8s" },
  { x: "42%", y: "36%", size: 3, delay: "0.5s" },
  { x: "68%", y: "44%", size: 2, delay: "1.6s" },
  { x: "88%", y: "55%", size: 3, delay: "3s" },
  { x: "10%", y: "68%", size: 2, delay: "1s" },
  { x: "34%", y: "74%", size: 3, delay: "2.2s" },
  { x: "58%", y: "66%", size: 2, delay: "0.3s" },
  { x: "82%", y: "78%", size: 3, delay: "1.4s" },
  { x: "24%", y: "91%", size: 2, delay: "2.6s" },
  { x: "70%", y: "92%", size: 3, delay: "0.7s" },
];

function Hero() {
  const { language } = useLanguage();

  const t = translations[language].hero;

  return (
    <section className="hero" id="home">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="hero-background" aria-hidden="true">
        <div className="hero-grid" />

        <div className="hero-glow hero-glow-primary" />
        <div className="hero-glow hero-glow-secondary" />

        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />

        <span className="hero-code hero-code-one">
          {"<code />"}
        </span>

        <span className="hero-code hero-code-two">
          {"{ data }"}
        </span>

        <span className="hero-code hero-code-three">
          {"01"}
        </span>
      </div>

      <div className="hero-container">
        {/* =====================================================
            TOP LINE
        ====================================================== */}
        <div className="hero-topline">
          <motion.div
            className="hero-status"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="hero-status-dot" />

            {t.availability}
          </motion.div>

          <motion.span
            className="hero-index"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            {t.index}
          </motion.span>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="hero-content">
          {/* ===================================================
              COPY
          ==================================================== */}
          <div className="hero-copy">
            <motion.p
              className="hero-eyebrow"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              {t.role}
            </motion.p>

            <motion.h1
              className="hero-title"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="hero-title-line">
                MOHAMED
              </span>

              <span className="hero-title-line hero-title-accent">
                HAGAG
              </span>
            </motion.h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}
            <motion.div
              className="hero-description-row"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
            >
              <span className="hero-description-number">
                01
              </span>

              <p className="hero-description">
                {t.intro}

                <strong>
                  {" "}
                  {t.introStrong}
                </strong>
              </p>
            </motion.div>

            {/* =================================================
                ACTIONS
            ================================================== */}
            <motion.div
              className="hero-actions"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
            >
              {/* Explore Work */}
              <a
                href="#work"
                className="hero-primary-button"
              >
                <span>
                  {t.exploreWork}
                </span>

                <span className="hero-button-icon">
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.7}
                  />
                </span>
              </a>

              {/* Let's Talk */}
              <a
                href="#contact"
                className="hero-secondary-button"
              >
                {t.letsTalk}
              </a>

              <a
                href="https://drive.google.com/file/d/12QVlSJtSo3_dRYO1uz5h1LgOC-NxuBZ4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cv-button"
              >
                <span>DOWNLOAD CV</span>

                <span className="hero-button-icon">
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.7}
                  />
                </span>
              </a>
            </motion.div>
          </div>

          {/* ===================================================
              VISUAL
          ==================================================== */}
          <motion.div
            className="hero-visual"
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="hero-visual-frame">
              {/* =================================================
                  CORNER MARKERS
              ================================================== */}
              <div className="hero-visual-corner hero-visual-corner-tl" />
              <div className="hero-visual-corner hero-visual-corner-tr" />
              <div className="hero-visual-corner hero-visual-corner-bl" />
              <div className="hero-visual-corner hero-visual-corner-br" />

              {/* =================================================
                  PROFILE IMAGE
              ================================================== */}
              <div className="hero-visual-placeholder">
                <img
                  src="/images/profile.jpg"
                  alt="Mohamed Hagag"
                  className="hero-profile-image"
                />

                <div className="hero-placeholder-label">
                  <span>
                    {t.visualIdentity}
                  </span>

                  <span>
                    MOHAMED HAGAG
                  </span>
                </div>
              </div>

              {/* =================================================
                  PARTICLE FIELD
              ================================================== */}
              <div
                className="hero-particle-field"
                aria-hidden="true"
              >
                {/* Connection lines */}
                <div className="particle-lines">
                  <span className="particle-line particle-line-1" />
                  <span className="particle-line particle-line-2" />
                  <span className="particle-line particle-line-3" />
                  <span className="particle-line particle-line-4" />
                </div>

                {/* Particles */}
                <div className="particle-nodes">
                  {particleNodes.map((particle, index) => (
                    <span
                      key={index}
                      className="particle-node"
                      style={{
                        left: particle.x,
                        top: particle.y,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: particle.delay,
                      }}
                    />
                  ))}
                </div>

                {/* Data */}
                <div className="data-stream data-stream-1">
                  01
                </div>

                <div className="data-stream data-stream-2">
                  101
                </div>

                <div className="data-stream data-stream-3">
                  0101
                </div>

                <div className="data-stream data-stream-4">
                  110
                </div>

                <div className="data-stream data-stream-5">
                  01
                </div>

                {/* Moving particle */}
                <div className="particle-travel" />

                {/* Scanner */}
                <div className="particle-scan" />

                {/* Label */}
                <div className="particle-label">
                  <span>
                    DATA FIELD
                  </span>

                  <span>
                    MH—01
                  </span>
                </div>
              </div>

              {/* =================================================
                  META
              ================================================== */}
              <div className="hero-visual-meta hero-visual-meta-top">
                <span>
                  {t.portfolio}
                </span>

                <span>
                  2026
                </span>
              </div>

              <div className="hero-visual-meta hero-visual-meta-bottom">
                <span>
                  {t.location}
                </span>

                <span>
                  MH—01
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}
        <motion.div
          className="hero-bottom"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.7,
          }}
        >
          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div
                className="hero-stat"
                key={stat.value}
              >
                <span>
                  {stat.value}
                </span>

                <p>
                  {t[stat.key]}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#about"
            className="hero-scroll"
          >
            <span>
              {t.scrollToExplore}
            </span>

            <span className="hero-scroll-icon">
              <ArrowDown
                size={15}
                strokeWidth={1.6}
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;