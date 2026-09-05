import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./Expertise.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

const expertiseKeys = [
  "fullStack",
  "dataAnalytics",
  "machineLearning",
  "digitalExperiences",
];

function Expertise() {
  const { language } = useLanguage();

  const t = translations[language].expertise;

  return (
    <section
      className="expertise section"
      id="expertise"
    >
      <div className="expertise-container section-inner">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="expertise-header">

          <motion.div
            className="expertise-label"
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
            <span className="expertise-label-line" />

            <span>
              {t.eyebrow}
            </span>
          </motion.div>


          <motion.div
            className="expertise-header-note"
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <span>
              {t.index}
            </span>

            <p>
              {t.title}
            </p>
          </motion.div>

        </div>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="expertise-intro">

          <motion.h2
            className="expertise-title"
            initial={{
              opacity: 0,
              y: 40,
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
            {t.heading.prefix}

            <span>
              {t.heading.highlight}
            </span>
          </motion.h2>


          <motion.p
            className="expertise-intro-text"
            initial={{
              opacity: 0,
              y: 25,
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
            {t.description}
          </motion.p>

        </div>


        {/* =====================================================
            EXPERTISE LIST
        ===================================================== */}

        <div className="expertise-list">

          {expertiseKeys.map((key, index) => {
            const item = t.items[key];

            return (
              <motion.article
                className="expertise-item"
                key={item.number}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >

                {/* NUMBER */}

                <div className="expertise-number">
                  {item.number}
                </div>


                {/* MAIN */}

                <div className="expertise-main">

                  <div className="expertise-title-wrap">

                    <h3>
                      {item.title}
                    </h3>

                    <div className="expertise-code">
                      {item.number} / {item.action}
                    </div>

                  </div>


                  <p className="expertise-description">
                    {item.description}
                  </p>


                  <div className="expertise-technologies">

                    {item.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      )
                    )}

                  </div>

                </div>


                {/* ACTION */}

                <a
                  href="#approach"
                  className="expertise-action"
                >
                  <span>
                    {t.seeApproach}
                  </span>

                  <span className="expertise-action-icon">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </a>


                {/* HOVER NUMBER */}

                <span
                  className="expertise-background-number"
                  aria-hidden="true"
                >
                  {item.number}
                </span>

              </motion.article>
            );
          })}

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <motion.div
          className="expertise-footer"
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
          }}
        >

          <span>
            {t.builtWith}
          </span>

          <div
            className="expertise-footer-line"
            aria-hidden="true"
          />

          <strong>
            {t.signature}
          </strong>

        </motion.div>

      </div>
    </section>
  );
}

export default Expertise;
