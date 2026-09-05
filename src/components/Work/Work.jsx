import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import "./Work.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

const projectKeys = [
  "scienceAcademy",
  "dataStories",
  "healthPrediction",
];

const projectImages = {
  scienceAcademy: "/images/science-academy.jpeg",
  dataStories: "/images/data-stories.jpg",
  healthPrediction: "/images/health-prediction.jpg",
};

const projectLinks = {
  scienceAcademy: "https://science-academy-one.vercel.app/",
  dataStories: "#",
  healthPrediction: "#",
};

function Work() {
  const { language } = useLanguage();

  const t = translations[language].work;

  return (
    <section className="work section" id="work">
      <div className="work-container section-inner">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="work-header">
          <motion.div
            className="work-label"
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
            <span className="work-label-line" />
            <span>{t.eyebrow}</span>
          </motion.div>

          <motion.div
            className="work-header-right"
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
            <span>{t.index}</span>

            <p>{t.title}</p>
          </motion.div>
        </div>

        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="work-intro">
          <motion.h2
            className="work-title"
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
            {t.heading.prefix}

            <span>{t.heading.highlight}</span>
          </motion.h2>

          <motion.p
            className="work-intro-text"
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
            PROJECTS
        ===================================================== */}

        <div className="work-list">
          {projectKeys.map((projectKey, index) => {
            const project = t.projects[projectKey];
            const projectImage = projectImages[projectKey];
            const projectLink = projectLinks[projectKey];

            const isAvailable =
              projectLink && projectLink !== "#";

            return (
              <motion.article
                className={`work-project ${
                  projectKey === "scienceAcademy"
                    ? "work-project-featured"
                    : ""
                }`}
                key={projectKey}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >

                {/* =================================================
                    PROJECT INFO
                ================================================= */}

                <div className="work-project-info">
                  <div className="work-project-top">
                    <span className="work-project-number">
                      {project.number}
                    </span>

                    <span className="work-project-category">
                      {project.category}
                    </span>
                  </div>

                  <div className="work-project-copy">
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="work-technologies">
                      {project.technologies.map((technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="work-project-bottom">
                    <span>{project.type}</span>

                    <span>{project.year}</span>
                  </div>
                </div>

                {/* =================================================
                    PROJECT VISUAL
                ================================================= */}

                {isAvailable ? (
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-project-visual work-project-link"
                    aria-label={`View ${project.title}`}
                  >
                    <div className="work-visual-image-wrap">
                      <img
                        src={projectImage}
                        alt={`${project.title} project preview`}
                        className="work-project-image"
                        loading="lazy"
                      />
                    </div>

                    <div className="work-visual-overlay" />

                    <div className="work-visual-grid" />

                    <div className="work-visual-content">
                      <div className="work-visual-center">
                        <span>{project.number}</span>

                        <strong>
                          {language === "ar"
                            ? "عرض المشروع"
                            : "VIEW PROJECT"}
                        </strong>

                        <div className="work-visual-open">
                          <ExternalLink
                            size={18}
                            strokeWidth={1.6}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="work-visual-meta work-visual-meta-top">
                      <span>
                        MH /{" "}
                        {language === "ar"
                          ? "مشروع"
                          : "PROJECT"}
                      </span>

                      <span>{project.year}</span>
                    </div>

                    <div className="work-visual-meta work-visual-meta-bottom">
                      <span>{project.type}</span>

                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="work-visual-corner work-visual-corner-tl" />
                    <div className="work-visual-corner work-visual-corner-tr" />
                    <div className="work-visual-corner work-visual-corner-bl" />
                    <div className="work-visual-corner work-visual-corner-br" />
                  </a>
                ) : (
                  <div className="work-project-visual">
                    <div className="work-visual-image-wrap">
                      <img
                        src={projectImage}
                        alt={`${project.title} project preview`}
                        className="work-project-image"
                        loading="lazy"
                      />
                    </div>

                    <div className="work-visual-overlay" />

                    <div className="work-visual-grid" />

                    <div className="work-visual-content">
                      <div className="work-visual-center">
                        <span>{project.number}</span>

                        <strong>
                          {language === "ar"
                            ? "قريبًا"
                            : "COMING SOON"}
                        </strong>
                      </div>
                    </div>

                    <div className="work-visual-meta work-visual-meta-top">
                      <span>
                        MH /{" "}
                        {language === "ar"
                          ? "مشروع"
                          : "PROJECT"}
                      </span>

                      <span>{project.year}</span>
                    </div>

                    <div className="work-visual-meta work-visual-meta-bottom">
                      <span>{project.type}</span>

                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="work-visual-corner work-visual-corner-tl" />
                    <div className="work-visual-corner work-visual-corner-tr" />
                    <div className="work-visual-corner work-visual-corner-bl" />
                    <div className="work-visual-corner work-visual-corner-br" />
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <motion.div
          className="work-footer"
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
          <div className="work-footer-line" />

          <a
            href="#contact"
            className="work-footer-link"
          >
            <span>{t.projectCta}</span>

            <strong>{t.letsTalk}</strong>

            <span className="work-footer-icon">
              <ArrowUpRight
                size={17}
                strokeWidth={1.6}
              />
            </span>
          </a>

          <div className="work-footer-line" />
        </motion.div>

      </div>
    </section>
  );
}

export default Work;