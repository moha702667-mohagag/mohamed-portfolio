import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

import {
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

import "./Contact.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";




const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwlkqgyk";


// ============================================================
// CONTACT LINKS
// ============================================================

const contactLinks = [


  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/mohamed-h-data-analysis",
    icon: FaLinkedinIn,
    external: true,
  },

  {
    key: "whatsapp",
    href: "https://wa.me/201094112070",
    icon: FaWhatsapp,
    external: true,
  },

  {
    key: "instagram",
    href: "https://www.instagram.com/m_o_hagag/",
    icon: FaInstagram,
    external: true,
  },
];


// ============================================================
// CONTACT COMPONENT
// ============================================================

function Contact() {
  const { language } = useLanguage();

  const t = translations[language].contact;

  return (
    <section
      className="contact section"
      id="contact"
    >
      <div className="contact-container section-inner">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="contact-header">

          <motion.div
            className="contact-label"
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
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span className="contact-label-line" />

            <span>
              {t.eyebrow}
            </span>
          </motion.div>


          <motion.span
            className="contact-header-code"
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
              duration: 0.7,
              delay: 0.1,
            }}
          >
            {t.signature}
          </motion.span>

        </div>


        {/* =====================================================
            HERO
        ====================================================== */}

        <div className="contact-hero">

          <motion.div
            className="contact-title-wrap"
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
            }}
            transition={{
              duration: 0.9,
            }}
          >

            <span className="contact-small-title">
              {t.question}
            </span>

            <h2 className="contact-title">
              {t.heading}
            </h2>

          </motion.div>


          <motion.div
            className="contact-hero-copy"
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
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >

            <p>
              {t.description}
            </p>


            <a
              href="https://wa.me/201094112070"
              className="contact-main-link"
              target="_blank"
              rel="noopener noreferrer"
            >

              <span>
                {t.startConversation}
              </span>

              <span className="contact-main-link-icon">

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

              </span>

            </a>

          </motion.div>

        </div>


        {/* =====================================================
            CONTACT CONTENT
        ====================================================== */}

        <div className="contact-content">


          {/* ===================================================
              SOCIAL / CONTACT LINKS
          ==================================================== */}

          <div className="contact-links">

            <div className="contact-links-heading">

              <span>
                {t.findMe}
              </span>

              <span>
                {t.contactCount}
              </span>

            </div>


            <div className="contact-links-list">

              {contactLinks.map(
                (
                  {
                    key,
                    href,
                    icon: Icon,
                    external,
                  },
                  index
                ) => {

                  const link = t.methods[key];

                  return (

                    <motion.a
                      href={href}
                      className="contact-link"
                      key={key}

                      target={
                        external
                          ? "_blank"
                          : undefined
                      }

                      rel={
                        external
                          ? "noopener noreferrer"
                          : undefined
                      }

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
                      }}

                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                      }}
                    >

                      <div className="contact-link-icon">

                        <Icon
                          size={18}
                          strokeWidth={
                            key === "email"
                              ? 1.4
                              : undefined
                          }
                          aria-hidden="true"
                        />

                      </div>


                      <div className="contact-link-copy">

                        <span>
                          {link.title}
                        </span>

                        <strong>
                          {link.action}
                        </strong>

                      </div>


                      <ArrowUpRight
                        className="contact-link-arrow"
                        size={18}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />

                    </motion.a>

                  );
                }
              )}

            </div>

          </div>


          {/* ===================================================
              CONTACT FORM
          ==================================================== */}

          <motion.div
            className="contact-form-wrap"

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
            }}

            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >

            <div className="contact-form-heading">

              <span>
                {t.form.heading}
              </span>

              <span>
                {t.form.label}
              </span>

            </div>


            {/* =================================================
                FORM

                👇 Formspree مربوط هنا عن طريق action
            ================================================== */}

            <form
              className="contact-form"
              action={FORMSPREE_ENDPOINT}
              method="POST"
            >


              {/* ===============================================
                  NAME + EMAIL
              ================================================ */}

              <div className="contact-form-row">

                <label>

                  <span>
                    01 / {t.form.fields.name}
                  </span>

                  <input
                    type="text"
                    name="name"
                    placeholder={
                      t.form.fields.name
                    }
                    autoComplete="name"
                    required
                  />

                </label>


                <label>

                  <span>
                    02 / {t.form.fields.email}
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder={
                      t.form.fields.email
                    }
                    autoComplete="email"
                    required
                  />

                </label>

              </div>


              {/* ===============================================
                  SUBJECT
              ================================================ */}

              <label>

                <span>
                  03 / {t.form.fields.subject}
                </span>

                <input
                  type="text"
                  name="subject"
                  placeholder={
                    t.form.fields.subject
                  }
                  required
                />

              </label>


              {/* ===============================================
                  MESSAGE
              ================================================ */}

              <label>

                <span>
                  04 / {t.form.fields.message}
                </span>

                <textarea
                  name="message"
                  rows="6"
                  placeholder={
                    t.form.fields.message
                  }
                  required
                />

              </label>


              {/* ===============================================
                  FORMSPREE SUBJECT
              ================================================ */}

              <input
                type="hidden"
                name="_subject"
                value="New message from Mohamed Hagag Portfolio"
              />


              {/* ===============================================
                  SUBMIT BUTTON
              ================================================ */}

              <button
                type="submit"
                className="contact-submit"
              >

                <span>
                  {t.form.submit}
                </span>

                <span className="contact-submit-icon">

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />

                </span>

              </button>

            </form>

          </motion.div>

        </div>


        {/* =====================================================
            FINAL
        ====================================================== */}

        <motion.div
          className="contact-final"

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
          }}
        >

          <div
            className="contact-final-line"
            aria-hidden="true"
          />


          <div className="contact-final-content">

            <span>
              {t.final.index}
            </span>

            <p>

              {t.final.question}

              <strong>
                {t.final.questionHighlight}
              </strong>

            </p>

            <span>
              {t.final.copyright}
            </span>

          </div>


          <div
            className="contact-final-line"
            aria-hidden="true"
          />

        </motion.div>

      </div>
    </section>
  );
}


export default Contact;