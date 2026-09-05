import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
} from "lucide-react";

import {
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

import "./Footer.css";

import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

const footerLinkKeys = [
  {
    key: "about",
    href: "#about",
  },
  {
    key: "work",
    href: "#work",
  },
  {
    key: "expertise",
    href: "#expertise",
  },
  {
    key: "approach",
    href: "#approach",
  },
  {
    key: "stack",
    href: "#stack",
  },
  {
    key: "contact",
    href: "#contact",
  },
];

const connectLinks = [
  
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

function Footer() {
  const { language } = useLanguage();

  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container section-inner">

        {/* =====================================================
            TOP
        ===================================================== */}

        <motion.div
          className="footer-top"
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
          <div className="footer-brand">

            <a
              href="#home"
              className="footer-logo"
              aria-label={t.backToTop}
            >
              <span>M</span>
              <span>H</span>
            </a>

            <div className="footer-brand-copy">
              <strong>{t.brand}</strong>

              <span>{t.role}</span>
            </div>
          </div>

          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
          >
            <span>{t.backToTop}</span>

            <span className="footer-back-top-icon">
              <ArrowUp
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
          </button>
        </motion.div>

        {/* =====================================================
            MAIN STATEMENT
        ===================================================== */}

        <div className="footer-main">

          <motion.div
            className="footer-statement"
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
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span>{t.letsBuild}</span>

            <h2>
              {t.meaningful}
              <strong>
                {t.meaningfulHighlight}
              </strong>
            </h2>
          </motion.div>

          <motion.a
            href="#contact"
            className="footer-cta"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >
            <span>{t.startProject}</span>

            <span className="footer-cta-arrow">
              <ArrowUpRight
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
          </motion.a>
        </div>

        {/* =====================================================
            GRID
        ===================================================== */}

        <div className="footer-grid">

          {/* ===================================================
              NAVIGATION
          =================================================== */}

          <div className="footer-grid-item">

            <span className="footer-grid-label">
              {t.navigation}
            </span>

            <nav
              className="footer-nav"
              aria-label={t.navigation}
            >
              {footerLinkKeys.map((link, index) => (
                <a
                  href={link.href}
                  key={link.href}
                >
                  <span>
                    0{index + 1}
                  </span>

                  {t.links[link.key]}

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* ===================================================
              CONNECT
          =================================================== */}

          <div className="footer-grid-item">

            <span className="footer-grid-label">
              {t.connect}
            </span>

            <div className="footer-connect">
              {connectLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    href={link.href}
                    key={link.key}
                    target={
                      link.external
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      link.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <span className="footer-connect-icon">
                      <Icon
                        size={15}
                        strokeWidth={
                          link.key === "email"
                            ? 1.5
                            : undefined
                        }
                        aria-hidden="true"
                      />
                    </span>

                    <span>
                      {link.key === "email"
                        ? "EMAIL"
                        : link.key === "linkedin"
                        ? "LINKEDIN"
                        : link.key === "whatsapp"
                        ? "WHATSAPP"
                        : "INSTAGRAM"}
                    </span>

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ===================================================
              LOCATION
          =================================================== */}

          <div className="footer-grid-item footer-location">

            <span className="footer-grid-label">
              {t.basedIn}
            </span>

            <p>
              {t.country}
              <br />
              {t.buildingFor}
            </p>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="footer-bottom">

          <span>
            {t.copyright}
          </span>

          <span className="footer-bottom-center">
            {t.signature}
          </span>

          <span>
            {t.footerMark}
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
