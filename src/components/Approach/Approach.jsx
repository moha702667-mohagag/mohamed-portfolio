import { motion } from "framer-motion";
import {
  ArrowDownRight,
  Lightbulb,
  Code2,
  BarChart3,
  Rocket,
} from "lucide-react";
import "./Approach.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

const processStepKeys = [
  {
    key: "discover",
    icon: Lightbulb,
  },
  {
    key: "build",
    icon: Code2,
  },
  {
    key: "analyze",
    icon: BarChart3,
  },
  {
    key: "refine",
    icon: Rocket,
  },
];

function Approach() {
  const { language } = useLanguage();

  const t = translations[language].approach;

  return (
    <section
      className="approach section"
      id="approach"
    >
      <div className="approach-container section-inner">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="approach-header">

          <motion.div
            className="approach-label"
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
            <span className="approach-label-line" />

            <span>
              {t.eyebrow}
            </span>
          </motion.div>


          <motion.div
            className="approach-header-meta"
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
              {t.process}
            </span>

            <span>
              {t.processFlow}
            </span>
          </motion.div>

        </div>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="approach-intro">

          <motion.div
            className="approach-heading-wrap"
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

            <span className="approach-heading-small">
              {t.heading.prefix}
            </span>

            <h2 className="approach-title">
              {t.heading.highlight}
            </h2>

          </motion.div>


          <motion.div
            className="approach-intro-copy"
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

            <p>
              {t.description}
            </p>

            <span className="approach-intro-mark">
              {t.signature}
            </span>

          </motion.div>

        </div>


        {/* =====================================================
            PROCESS
        ===================================================== */}

        <div className="approach-process">

          <div className="approach-process-line" />

          {processStepKeys.map(
            ({ key, icon: Icon }, index) => {
              const step = t.steps[key];

              return (
                <motion.article
                  className="approach-step"
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >

                  <div className="approach-step-top">

                    <span className="approach-step-number">
                      {step.number}
                    </span>

                    <span className="approach-step-detail">
                      {step.flow}
                    </span>

                  </div>


                  <div className="approach-step-icon">
                    <Icon
                      size={23}
                      strokeWidth={1.4}
                    />
                  </div>


                  <h3>
                    {step.title}
                  </h3>


                  <p>
                    {step.description}
                  </p>


                  <div className="approach-step-bottom">

                    <span>
                      {step.number}
                    </span>

                    {index <
                      processStepKeys.length - 1 && (
                      <ArrowDownRight
                        size={17}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    )}

                  </div>

                </motion.article>
              );
            }
          )}

        </div>


        {/* =====================================================
            STATEMENT
        ===================================================== */}

        <motion.div
          className="approach-statement"
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
          }}
        >

          <span className="approach-statement-number">
            05
          </span>

          <p>
            <strong>
              {t.philosophy.first}
            </strong>{" "}

            {t.philosophy.second}{" "}

            <strong>
              {t.philosophy.third}
            </strong>
          </p>

        </motion.div>


        {/* =====================================================
            CTA
        ===================================================== */}

        <motion.a
          href="#stack"
          className="approach-cta"
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
            {t.exploreStack}
          </span>

          <span className="approach-cta-icon">
            <ArrowDownRight
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

export default Approach;
