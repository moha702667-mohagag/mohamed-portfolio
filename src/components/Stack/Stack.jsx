import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Database,
  BarChart3,
  BrainCircuit,
  GitBranch,
  Layers3,
} from "lucide-react";
import "./Stack.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

const stackCategoryKeys = [
  {
    key: "frontend",
    icon: Code2,
  },
  {
    key: "backend",
    icon: Database,
  },
  {
    key: "data",
    icon: BarChart3,
  },
  {
    key: "machineLearning",
    icon: BrainCircuit,
  },
  {
    key: "workflow",
    icon: GitBranch,
  },
  {
    key: "deployment",
    icon: Layers3,
  },
];

const marqueeItems = [
  "REACT",
  "NODE.JS",
  "PYTHON",
  "MONGODB",
  "POWER BI",
  "SQL",
  "JAVASCRIPT",
  "GIT",
];

function Stack() {
  const { language } = useLanguage();

  const t = translations[language].stack;

  return (
    <section
      className="stack section"
      id="stack"
    >
      <div className="stack-container section-inner">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="stack-header">

          <motion.div
            className="stack-label"
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
            <span className="stack-label-line" />

            <span>
              {t.eyebrow}
            </span>
          </motion.div>


          <motion.div
            className="stack-header-meta"
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
            }}
          >
            <span>
              {t.label}
            </span>

            <span>
              {t.year}
            </span>
          </motion.div>

        </div>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="stack-intro">

          <motion.div
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

            <span className="stack-intro-small">
              {t.heading.prefix}
            </span>

            <h2 className="stack-title">
              {t.heading.highlight}
            </h2>

          </motion.div>


          <motion.p
            className="stack-intro-text"
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
            MARQUEE
        ===================================================== */}

        <div
          className="stack-marquee"
          aria-hidden="true"
        >
          <div className="stack-marquee-track">

            {[...marqueeItems, ...marqueeItems].map(
              (item, index) => (
                <span
                  className="stack-marquee-item"
                  key={`${item}-${index}`}
                >
                  {item}

                  <i />
                </span>
              )
            )}

          </div>
        </div>


        {/* =====================================================
            STACK GRID
        ===================================================== */}

        <div className="stack-grid">

          {stackCategoryKeys.map(
            ({ key, icon: Icon }, index) => {
              const group = t.categories[key];

              return (
                <motion.article
                  className="stack-card"
                  key={group.number}
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
                    delay: index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >

                  <div className="stack-card-top">

                    <span>
                      {group.number}
                    </span>

                    <div className="stack-card-icon">
                      <Icon
                        size={19}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </div>

                  </div>


                  <div className="stack-card-content">

                    <h3>
                      {group.title}
                    </h3>

                    <p>
                      {group.description}
                    </p>

                  </div>


                  <div className="stack-tools">

                    {group.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      )
                    )}

                  </div>


                  <div
                    className="stack-card-line"
                    aria-hidden="true"
                  />

                </motion.article>
              );
            }
          )}

        </div>


        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <motion.div
          className="stack-bottom"
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

          <div className="stack-bottom-left">

            <span
              className="stack-bottom-dot"
              aria-hidden="true"
            />

            <span>
              {t.alwaysLearning}
            </span>

          </div>


          <p>
            {t.mindset.prefix}

            <strong>
              {" "}
              {t.mindset.highlight}
            </strong>
          </p>


          <span className="stack-bottom-code">
            {t.signature}
          </span>

        </motion.div>


        {/* =====================================================
            CTA
        ===================================================== */}

        <motion.a
          href="#contact"
          className="stack-cta"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
        >

          <span>
            {t.letsTalk}
          </span>

          <span className="stack-cta-icon">

            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />

          </span>

        </motion.a>

      </div>
    </section>
  );
}

export default Stack;
