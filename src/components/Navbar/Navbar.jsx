import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import "./Navbar.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../data/translations";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { language, toggleLanguage } = useLanguage();

  const t = translations[language];

  const navLinks = [
    {
      label: t.nav.home,
      href: "#home",
    },
    {
      label: t.nav.about,
      href: "#about",
    },
    {
      label: t.nav.work,
      href: "#work",
    },
    {
      label: t.nav.expertise,
      href: "#expertise",
    },
    {
      label: t.nav.approach,
      href: "#approach",
    },
    {
      label: t.nav.stack,
      href: "#stack",
    },
  ];

  /* ========================================================
     SCROLL STATE
  ======================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ========================================================
     ACTIVE SECTION
  ======================================================== */

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(
            visibleSections[0].target.id
          );
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  /* ========================================================
     MOBILE MENU
  ======================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  /* ========================================================
     ESCAPE KEY
  ======================================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* ========================================================
     LOCK BODY SCROLL
  ======================================================== */

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ========================================================
     LANGUAGE LABEL
  ======================================================== */

  const languageLabel =
    language === "en"
      ? "Switch to Arabic"
      : "Switch to English";

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <header
      className={`navbar ${
        scrolled ? "scrolled" : ""
      }`}
      aria-label="Main navigation"
    >
      <div className="navbar-container">

        {/* ==================================================
            LOGO
        ================================================== */}

        <a
          href="#home"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="Mohamed Hagag — Home"
        >
          <span>M</span>
          <span>H</span>
        </a>

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav
          className="navbar-links"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const sectionId =
              link.href.replace("#", "");

            const isActive =
              activeSection === sectionId;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={
                  isActive ? "active" : ""
                }
                aria-current={
                  isActive ? "page" : undefined
                }
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ==================================================
            DESKTOP ACTIONS
        ================================================== */}

        <div className="navbar-actions">

          {/* LANGUAGE */}

          <button
            type="button"
            className="navbar-language navbar-language-desktop"
            onClick={toggleLanguage}
            aria-label={languageLabel}
          >
            <span
              className={
                language === "en"
                  ? "active"
                  : ""
              }
            >
              EN
            </span>

            <span className="navbar-language-divider">
              /
            </span>

            <span
              className={
                language === "ar"
                  ? "active"
                  : ""
              }
            >
              AR
            </span>
          </button>

          {/* CONTACT */}

          <a
            href="#contact"
            className="navbar-contact"
            onClick={closeMenu}
          >
            <span>{t.nav.contact}</span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
        </div>

        {/* ==================================================
            MOBILE BUTTON
        ================================================== */}

        <button
          type="button"
          className="navbar-menu-button"
          onClick={toggleMenu}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <X
              size={22}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          ) : (
            <Menu
              size={22}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* ====================================================
          MOBILE MENU
      ==================================================== */}

      <div
        id="mobile-navigation"
        className={`mobile-menu ${
          menuOpen ? "is-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="mobile-menu-links"
          aria-label="Mobile navigation"
        >

          {/* NAVIGATION LINKS */}

          {navLinks.map((link, index) => {
            const sectionId =
              link.href.replace("#", "");

            const isActive =
              activeSection === sectionId;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className={
                  isActive ? "active" : ""
                }
                aria-current={
                  isActive ? "page" : undefined
                }
                style={{
                  "--item-index": index,
                }}
              >
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                {link.label}
              </a>
            );
          })}

          {/* CONTACT */}

          <a
            href="#contact"
            className={`mobile-contact-link ${
              activeSection === "contact"
                ? "active"
                : ""
            }`}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            aria-current={
              activeSection === "contact"
                ? "page"
                : undefined
            }
            style={{
              "--item-index": navLinks.length,
            }}
          >
            <span>
              {String(
                navLinks.length + 1
              ).padStart(2, "0")}
            </span>

            {t.nav.contact}

            <ArrowUpRight
              size={22}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </a>

          {/* MOBILE LANGUAGE */}

          <button
            type="button"
            className="navbar-language navbar-language-mobile"
            onClick={toggleLanguage}
            aria-label={languageLabel}
            style={{
              "--item-index":
                navLinks.length + 1,
            }}
          >
            <span
              className={
                language === "en"
                  ? "active"
                  : ""
              }
            >
              EN
            </span>

            <span className="navbar-language-divider">
              /
            </span>

            <span
              className={
                language === "ar"
                  ? "active"
                  : ""
              }
            >
              AR
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
