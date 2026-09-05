import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./About.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

const aboutHighlights = [
  "build",
  "analyze",
  "connect",
];

function About() {
  const { language } = useLanguage();

  const t = translations[language].about;

  return (
    <section className="about section" id="about">
      <div className="about-container section-inner">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="about-header">
          <motion.div
            className="about-label"
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span className="about-label-line" />

            <span>
              {t.eyebrow}
            </span>
          </motion.div>

          <motion.p
            className="about-header-note"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >
            {t.title}
          </motion.p>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="about-main">

          {/* HEADING */}

          <motion.div
            className="about-heading-wrap"
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="about-heading-index">
              01
            </span>

            <h2 className="about-heading">
              {t.heading.prefix}

              <span>
                {t.heading.highlight}
              </span>
            </h2>
          </motion.div>

          {/* COPY */}

          <motion.div
            className="about-copy"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >
            <p className="about-lead">
              {t.introduction.before}

              <strong>
                {t.introduction.highlight}
              </strong>

              {t.introduction.after}
            </p>

            <p className="about-text">
              {t.description}
            </p>

            <a
              href="#work"
              className="about-link"
            >
              <span>
                {t.exploreWork}
              </span>

              <span className="about-link-icon">
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </span>
            </a>
          </motion.div>
        </div>

        {/* =====================================================
            HIGHLIGHTS
        ===================================================== */}

        <div className="about-highlights">
          {aboutHighlights.map((key, index) => {
            const item = t.highlights[key];

            return (
              <motion.article
                className="about-highlight"
                key={key}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
              >
                <div className="about-highlight-top">
                  <span>
                    {item.number}
                  </span>

                  <span
                    className="about-highlight-dot"
                    aria-hidden="true"
                  />
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

                <div
                  className="about-highlight-line"
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="about-footer">
          <span className="about-footer-mark">
            MH
          </span>

          <span
            className="about-footer-line"
            aria-hidden="true"
          />

          <span className="about-footer-text">
            {t.signature}
          </span>
        </div>

      </div>
    </section>
  );
}

export default About;
