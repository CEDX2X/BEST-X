import React, { useState } from "react";
import LogoIcon from "@/assets/logo-icon";
import { ArrowDown, ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

const navLinksDefault = [
  { label: "Procédures", href: "/procedures" },
  { label: "Auto-École", href: "/auto-ecole" },
  { label: "Cours de Langue", href: "/langues" },
  { label: "Contact", href: "/contact" },
];

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.14,
    },
  },
};

const navVariants = {
  hidden: { opacity: 0, y: -12, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.62, bounce: 0 },
  },
};

const copyVariants = {
  hidden: { opacity: 0, x: -22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.78, bounce: 0 },
  },
};

const buildingVariants = {
  hidden: { opacity: 0, x: 30, y: 18, scale: 1.04, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 1.08, bounce: 0 },
  },
};

const buttonRowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.58, bounce: 0 },
  },
};

export default function Hero19({
  brandName = "BEST TRAVEL",
  logo,
  navLinks = navLinksDefault,
  eyebrow = "Basé au Cameroun à DOUALA • Plus de 10 ans d'expertise",
  headingLine1 = "Votre Rêve Canadien",
  headingLine2 = "Commence au Cameroun.",
  description = "Un accompagnement certifié et de proximité pour votre projet d'immigration, d'études ou de travail au Canada.",
  primaryCtaLabel = "Évaluation gratuite",
  primaryCtaHref = "/contact",
  primaryCtaClassName,
  onPrimaryCtaClick,
  secondaryCtaLabel = "Nos Procédures & Visas",
  secondaryCtaHref = "/procedures",
  onSecondaryCtaClick,
  bookingLabel = "Protocole d'accord",
  bookingHref = "/contact",
  onBookingClick,
  scrollLabel = "Découvrir nos services",
  scrollTargetId = "services",
  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FPage%20d'accueil_Plan%20de%20travail%201.jpg.jpeg?alt=media&token=6488aeee-b014-4164-8a0d-ff857b1dc5fc",
  overlayGradient,
  extraActions,
  featureBadges,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let navigate = null;
  try {
    navigate = useNavigate();
  } catch {
    // router might not be mounted in test or isolated environment
  }

  const handleLinkClick = (e, href, customHandler) => {
    if (customHandler) {
      e.preventDefault();
      customHandler();
      setMobileMenuOpen(false);
      return;
    }
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
      return;
    }
    if (href && href.startsWith("/") && navigate) {
      e.preventDefault();
      navigate(href);
      setMobileMenuOpen(false);
    }
  };

  const handleScrollClick = (e) => {
    e.preventDefault();
    if (scrollTargetId) {
      const target = document.getElementById(scrollTargetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden font-sans text-white antialiased">
      <motion.div
        className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 py-4 sm:px-9 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.36 }}
        variants={sectionVariants}
      >
        {/* Background image with smooth subtle animation */}
        <motion.img
          variants={buildingVariants}
          src={backgroundImage}
          alt="Best Travel Canada"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Optional custom overlay (none by default so background image is fully clear and bright) */}
        {overlayGradient || null}

        {/* Navigation Bar */}
        <motion.nav
          variants={navVariants}
          className="relative z-20 flex min-h-12 w-full items-center justify-between pt-2 sm:pt-3 drop-shadow-sm"
        >
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="inline-flex min-h-10 items-center gap-3 transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.98]"
          >
            {logo ? (
              logo
            ) : (
              <>
                <LogoIcon className="size-8 text-white" />
                <span className="text-lg font-bold tracking-tight text-white">{brandName}</span>
              </>
            )}
          </a>

          <div className="hidden items-center gap-[2rem] lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.onClick)}
                className="group inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-white/85 transition-[opacity,transform,color] duration-200 ease-out hover:text-white hover:opacity-100 active:scale-[0.96]"
              >
                {link.label}
                {link.hasMenu ? (
                  <ChevronDown className="size-3 transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
                ) : null}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {extraActions}

            <a
              href={bookingHref}
              onClick={(e) => handleLinkClick(e, bookingHref, onBookingClick)}
              className="group inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-accent hover:bg-red-700 text-white px-5 sm:px-6 text-sm font-semibold shadow-[0_4px_14px_rgba(236,19,19,0.39)] transition-[background-color,transform,box-shadow] duration-200 ease-out hover:scale-105 active:scale-[0.96]"
            >
              {bookingLabel}
              <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </a>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden relative z-30 mt-3 p-4 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-2xl flex flex-col space-y-2.5 shadow-2xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.onClick)}
                  className="px-3.5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-xl text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href={primaryCtaHref}
                  onClick={(e) => handleLinkClick(e, primaryCtaHref, onPrimaryCtaClick)}
                  className="w-full text-center py-2.5 rounded-xl bg-accent text-white font-semibold text-sm shadow-md"
                >
                  {primaryCtaLabel}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-1 items-center pt-8 pb-12 sm:pt-14 lg:pt-4">
          <div className="max-w-2xl 2xl:max-w-7xl">
            {/* Eyebrow badge */}
            <motion.div
              variants={copyVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 text-xs sm:text-sm font-medium text-white backdrop-blur-md shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              variants={copyVariants}
              className="mt-6 max-w-3xl text-[clamp(2.75rem,5.5vw,5.75rem)] leading-[1.06] font-extrabold tracking-[-0.04em] text-balance text-white 2xl:max-w-7xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              <span className="block">{headingLine1}</span>
              <span className="block mt-1">{headingLine2}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={copyVariants}
              className="mt-5 max-w-[34rem] text-[0.95rem] sm:text-[1.125rem] leading-[1.6] font-medium text-pretty text-white 2xl:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            >
              {description}
            </motion.p>

            {/* Optional feature badges */}
            {featureBadges && (
              <motion.div variants={copyVariants} className="mt-4">
                {featureBadges}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              variants={buttonRowVariants}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <motion.a
                variants={buttonVariants}
                href={primaryCtaHref}
                onClick={(e) => handleLinkClick(e, primaryCtaHref, onPrimaryCtaClick)}
                className={
                  primaryCtaClassName ||
                  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent hover:bg-red-700 px-7 text-base font-bold text-white shadow-[0_6px_20px_rgba(236,19,19,0.35)] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
                }
              >
                {primaryCtaLabel}
              </motion.a>

              <motion.a
                variants={buttonVariants}
                href={secondaryCtaHref}
                onClick={(e) => handleLinkClick(e, secondaryCtaHref, onSecondaryCtaClick)}
                className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 px-6 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {secondaryCtaLabel}
                <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.a
          variants={copyVariants}
          href={`#${scrollTargetId}`}
          onClick={handleScrollClick}
          className="absolute right-7 bottom-6 z-20 hidden min-h-10 items-center gap-3 text-[0.78rem] font-medium text-white/80 transition-[opacity,transform] duration-200 ease-out hover:text-white hover:opacity-100 active:scale-[0.96] md:inline-flex lg:right-12 lg:bottom-8 cursor-pointer"
        >
          {scrollLabel}
          <ArrowDown className="size-4 animate-bounce text-accent" />
        </motion.a>
      </motion.div>
    </section>
  );
}
