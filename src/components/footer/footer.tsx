"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import type { ReactNode } from "react";

import {
  ArrowUp,
  Mail,
} from "lucide-react";

import {
  gsap,
  ScrollTrigger,
} from "@/lib/gsap";

const navigation = [
  { label: "Profile", href: "#profile" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Technology", href: "#technology" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const cleanup: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const isTouchDevice =
        window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window;

      /* ==========================================================
         ELEMENTS
      ========================================================== */

      const brand = footer.querySelector<HTMLElement>(
        "[data-footer-brand]",
      );

      const brandIcon = footer.querySelector<HTMLElement>(
        "[data-footer-brand-icon]",
      );

      const brandName = footer.querySelector<HTMLElement>(
        "[data-footer-brand-name]",
      );

      const brandCopy = footer.querySelector<HTMLElement>(
        "[data-footer-brand-copy]",
      );

      const navigationEl = footer.querySelector<HTMLElement>(
        "[data-footer-navigation]",
      );

      const navigationItems = gsap.utils.toArray<HTMLElement>(
        "[data-footer-nav-item]",
        footer,
      );

      const divider = footer.querySelector<HTMLElement>(
        "[data-footer-divider]",
      );

      const bottomRow = footer.querySelector<HTMLElement>(
        "[data-footer-bottom]",
      );

      const copyright = footer.querySelector<HTMLElement>(
        "[data-footer-copyright]",
      );

      const socialButtons = gsap.utils.toArray<HTMLElement>(
        "[data-footer-social]",
        footer,
      );

      const backToTop = footer.querySelector<HTMLElement>(
        "[data-footer-top]",
      );

      const ambientGlows = gsap.utils.toArray<HTMLElement>(
        "[data-footer-ambient]",
        footer,
      );

      const ambientGrid = footer.querySelector<HTMLElement>(
        "[data-footer-grid]",
      );

      /* ==========================================================
         REDUCED MOTION
      ========================================================== */

      if (prefersReducedMotion) {
        gsap.set(
          [
            brand,
            brandIcon,
            brandName,
            brandCopy,
            navigationEl,
            divider,
            bottomRow,
            copyright,
            backToTop,
            ...navigationItems,
            ...socialButtons,
          ].filter(Boolean),
          {
            autoAlpha: 1,
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            clearProps: "transform",
          },
        );

        gsap.set(ambientGlows, {
          opacity: 1,
        });

        gsap.set(ambientGrid, {
          opacity: 1,
        });

        return;
      }

      /* ==========================================================
         INITIAL STATES
      ========================================================== */

      gsap.set(brand, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.set(brandIcon, {
        autoAlpha: 0,
        scale: 0.9,
        rotation: -4,
      });

      gsap.set(brandName, {
        autoAlpha: 0,
        x: -8,
      });

      gsap.set(brandCopy, {
        autoAlpha: 0,
        y: 10,
      });

      gsap.set(navigationEl, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.set(navigationItems, {
        autoAlpha: 0,
        y: 6,
      });

      gsap.set(divider, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(bottomRow, {
        autoAlpha: 0,
        y: 12,
      });

      gsap.set(copyright, {
        autoAlpha: 0,
        y: 5,
      });

      gsap.set(socialButtons, {
        autoAlpha: 0,
        y: 6,
        scale: 0.94,
      });

      gsap.set(backToTop, {
        autoAlpha: 0,
        y: 6,
        scale: 0.92,
      });

      /* ==========================================================
         MAIN FOOTER ENTRANCE
      ========================================================== */

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },

        scrollTrigger: {
          trigger: footer,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      timeline

        /* BRAND */
        .to(brand, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
        })

        /* BRAND ICON */
        .to(
          brandIcon,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.35)",
          },
          "-=0.32",
        )

        /* BRAND NAME */
        .to(
          brandName,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.35,
          },
          "-=0.25",
        )

        /* BRAND COPY */
        .to(
          brandCopy,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.2",
        )

        /* NAVIGATION */
        .to(
          navigationEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.25",
        )

        /* NAVIGATION ITEMS */
        .to(
          navigationItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.035,
            ease: "power2.out",
          },
          "-=0.2",
        )

        /* DIVIDER */
        .to(
          divider,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.08",
        )

        /* BOTTOM ROW */
        .to(
          bottomRow,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.2",
        )

        /* COPYRIGHT */
        .to(
          copyright,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
          },
          "-=0.22",
        )

        /* SOCIAL BUTTONS */
        .to(
          socialButtons,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.25)",
          },
          "-=0.22",
        )

        /* BACK TO TOP */
        .to(
          backToTop,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.32,
            ease: "back.out(1.25)",
          },
          "-=0.2",
        );

      /* ==========================================================
         DESKTOP HOVER INTERACTIONS
      ========================================================== */

      if (!isTouchDevice) {
        /* --------------------------------------------------------
           BRAND
        -------------------------------------------------------- */

        if (brand) {
          const brandEnter = () => {
            gsap.to(brandIcon, {
              y: -2,
              scale: 1.04,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });

            gsap.to(brandName, {
              x: 2,
              duration: 0.22,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const brandLeave = () => {
            gsap.to(brandIcon, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });

            gsap.to(brandName, {
              x: 0,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          brand.addEventListener(
            "mouseenter",
            brandEnter,
          );

          brand.addEventListener(
            "mouseleave",
            brandLeave,
          );

          cleanup.push(() => {
            brand.removeEventListener(
              "mouseenter",
              brandEnter,
            );

            brand.removeEventListener(
              "mouseleave",
              brandLeave,
            );
          });
        }

        /* --------------------------------------------------------
           NAVIGATION
        -------------------------------------------------------- */

        navigationItems.forEach((item) => {
          const underline =
            item.querySelector<HTMLElement>(
              "[data-footer-nav-line]",
            );

          const enter = () => {
            gsap.to(item, {
              y: -1,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });

            if (underline) {
              gsap.to(underline, {
                scaleX: 1,
                duration: 0.28,
                ease: "power3.out",
                overwrite: "auto",
              });
            }
          };

          const leave = () => {
            gsap.to(item, {
              y: 0,
              duration: 0.24,
              ease: "power2.out",
              overwrite: "auto",
            });

            if (underline) {
              gsap.to(underline, {
                scaleX: 0,
                duration: 0.22,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
          };

          item.addEventListener(
            "mouseenter",
            enter,
          );

          item.addEventListener(
            "mouseleave",
            leave,
          );

          cleanup.push(() => {
            item.removeEventListener(
              "mouseenter",
              enter,
            );

            item.removeEventListener(
              "mouseleave",
              leave,
            );
          });
        });

        /* --------------------------------------------------------
           SOCIAL BUTTONS
        -------------------------------------------------------- */

        socialButtons.forEach((button) => {
          const enter = () => {
            gsap.to(button, {
              y: -3,
              scale: 1.035,
              duration: 0.22,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const leave = () => {
            gsap.to(button, {
              y: 0,
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          button.addEventListener(
            "mouseenter",
            enter,
          );

          button.addEventListener(
            "mouseleave",
            leave,
          );

          cleanup.push(() => {
            button.removeEventListener(
              "mouseenter",
              enter,
            );

            button.removeEventListener(
              "mouseleave",
              leave,
            );
          });
        });

        /* --------------------------------------------------------
           BACK TO TOP
        -------------------------------------------------------- */

        if (backToTop) {
          const enter = () => {
            gsap.to(backToTop, {
              y: -3,
              scale: 1.05,
              duration: 0.23,
              ease: "power2.out",
              overwrite: "auto",
            });

            gsap.to(
              backToTop.querySelector(
                "[data-footer-top-icon]",
              ),
              {
                y: -2,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
              },
            );
          };

          const leave = () => {
            gsap.to(backToTop, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });

            gsap.to(
              backToTop.querySelector(
                "[data-footer-top-icon]",
              ),
              {
                y: 0,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              },
            );
          };

          backToTop.addEventListener(
            "mouseenter",
            enter,
          );

          backToTop.addEventListener(
            "mouseleave",
            leave,
          );

          cleanup.push(() => {
            backToTop.removeEventListener(
              "mouseenter",
              enter,
            );

            backToTop.removeEventListener(
              "mouseleave",
              leave,
            );
          });
        }
      }

      /* ==========================================================
         AMBIENT MOTION
      ========================================================== */

      if (!isTouchDevice) {
        ambientGlows.forEach(
          (glow, index) => {
            gsap.to(glow, {
              x: index % 2 === 0 ? 10 : -8,
              y: index % 2 === 0 ? -8 : 6,
              duration: 10 + index * 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        );

        if (ambientGrid) {
          gsap.to(ambientGrid, {
            opacity: 0.035,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      /* ==========================================================
         REFRESH
      ========================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, footer);

    return () => {
      cleanup.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        relative
        overflow-hidden
        border-t
        border-slate-900/[0.08]
        bg-slate-50
        transition-colors
        duration-300
        dark:border-white/[0.06]
        dark:bg-[#050811]
      "
    >
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        {/* CYAN ATMOSPHERE */}

        <div
          data-footer-ambient
          className="
            absolute
            left-[15%]
            top-0
            h-48
            w-48
            -translate-y-1/2
            rounded-full
            bg-cyan-500/[0.025]
            blur-3xl
            will-change-transform
            sm:left-[20%]
            sm:h-56
            sm:w-56
            dark:bg-cyan-500/[0.025]
          "
        />

        {/* BLUE ATMOSPHERE */}

        <div
          data-footer-ambient
          className="
            absolute
            bottom-0
            right-[5%]
            h-40
            w-40
            rounded-full
            bg-blue-500/[0.02]
            blur-3xl
            will-change-transform
            sm:h-48
            sm:w-48
            dark:bg-blue-600/[0.02]
          "
        />

        {/* TECHNICAL GRID */}

        <div
          data-footer-grid
          className="
            absolute
            inset-0
            opacity-[0.035]
            dark:opacity-[0.015]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(15, 23, 42, 0.35) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(15, 23, 42, 0.35) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        {/* DARK GRID */}

        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            hidden
            dark:block
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.45) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.45) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "64px 64px",
            opacity: 0.015,
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <div
        className="
          container-khel
          relative
          z-10
          py-10
          sm:py-12
          lg:py-14
        "
      >
        {/* ============================================================
            MAIN FOOTER
        ============================================================ */}

        <div
          className="
            flex
            flex-col
            gap-9
            md:flex-row
            md:items-end
            md:justify-between
            md:gap-12
          "
        >
          {/* ==========================================================
              BRAND
          =========================================================== */}

          <div
            data-footer-brand
            className="
              max-w-sm
            "
          >
            <a
              href="#"
              aria-label="Back to top"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-lg
                outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-500/40
                focus-visible:ring-offset-4
                focus-visible:ring-offset-slate-50
                dark:focus-visible:ring-cyan-400/40
                dark:focus-visible:ring-offset-[#050811]
              "
            >
              {/* K EMBLEM */}

              <span
                data-footer-brand-icon
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-cyan-500/20
                  bg-cyan-500/[0.08]
                  will-change-transform
                  transition-colors
                  duration-300
                  group-hover:border-cyan-500/35
                  group-hover:bg-cyan-500/[0.12]
                  dark:border-cyan-400/20
                  dark:bg-cyan-400/10
                  dark:group-hover:border-cyan-400/35
                  dark:group-hover:bg-cyan-400/[0.14]
                "
              >
                <span
                  className="
                    text-sm
                    font-bold
                    text-cyan-600
                    dark:text-cyan-300
                  "
                >
                  K
                </span>
              </span>

              {/* NAME */}

              <span
                data-footer-brand-name
                className="
                  text-sm
                  font-semibold
                  tracking-[0.2em]
                  text-slate-950
                  dark:text-white
                "
              >
                KHEL
              </span>
            </a>

            <p
              data-footer-brand-copy
              className="
                mt-4
                max-w-sm
                text-[13px]
                leading-6
                text-slate-500
                sm:text-sm
                dark:text-slate-500
              "
            >
              Software engineer building reliable, modern digital
              products with thoughtful engineering.
            </p>
          </div>

          {/* ==========================================================
              NAVIGATION
          =========================================================== */}

          <nav
            data-footer-navigation
            aria-label="Footer navigation"
            className="
              flex
              max-w-xl
              flex-wrap
              gap-x-5
              gap-y-3
              text-[13px]
              text-slate-500
              sm:gap-x-6
              sm:text-sm
              dark:text-slate-500
            "
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-footer-nav-item
                className="
                  group
                  relative
                  rounded-sm
                  outline-none
                  transition-colors
                  duration-200
                  hover:text-slate-950
                  focus-visible:text-slate-950
                  focus-visible:ring-2
                  focus-visible:ring-cyan-500/30
                  dark:hover:text-white
                  dark:focus-visible:text-white
                "
              >
                {item.label}

                {/* UNDERLINE */}

                <span
                  data-footer-nav-line
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-full
                    origin-left
                    scale-x-0
                    bg-cyan-500/70
                    dark:bg-cyan-400/60
                  "
                />
              </a>
            ))}
          </nav>
        </div>

        {/* ============================================================
            DIVIDER
        ============================================================ */}

        <div
          data-footer-divider
          aria-hidden="true"
          className="
            my-7
            h-px
            origin-left
            scale-x-0
            bg-slate-900/[0.08]
            dark:bg-white/[0.06]
            sm:my-8
          "
        />

        {/* ============================================================
            BOTTOM ROW
        ============================================================ */}

        <div
          data-footer-bottom
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-6
          "
        >
          {/* COPYRIGHT */}

          <p
            data-footer-copyright
            className="
              text-[11px]
              text-slate-500
              sm:text-xs
              dark:text-slate-600
            "
          >
            © {new Date().getFullYear()} KHEL. All rights reserved.
          </p>

          {/* ==========================================================
              ACTIONS
          =========================================================== */}

          <div
            className="
              flex
              items-center
              gap-2.5
              sm:gap-3
            "
          >
            {/* GITHUB */}

            <SocialButton
              href="https://github.com/kheel06"
              label="GitHub"
              external
            >
              <GitHubIcon size={15} />
            </SocialButton>

            {/* LINKEDIN */}

            <SocialButton
              href="https://www.linkedin.com/"
              label="LinkedIn"
              external
            >
              <LinkedInIcon size={15} />
            </SocialButton>

            {/* EMAIL */}

            <SocialButton
              href="mailto:your@email.com"
              label="Email"
            >
              <Mail size={15} />
            </SocialButton>

            {/* ========================================================
                BACK TO TOP
            ========================================================= */}

            <a
              href="#"
              data-footer-top
              aria-label="Back to top"
              className="
                ml-1
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-cyan-500/20
                bg-cyan-500/[0.06]
                text-cyan-600
                outline-none
                will-change-transform
                transition-colors
                duration-300
                hover:border-cyan-500/40
                hover:bg-cyan-500/10
                focus-visible:ring-2
                focus-visible:ring-cyan-500/40
                dark:border-cyan-400/20
                dark:bg-cyan-400/[0.06]
                dark:text-cyan-300
                dark:hover:border-cyan-400/40
                dark:hover:bg-cyan-400/10
                dark:focus-visible:ring-cyan-400/40
              "
            >
              <span
                data-footer-top-icon
                className="
                  flex
                  items-center
                  justify-center
                "
              >
                <ArrowUp size={15} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   SOCIAL BUTTON
================================================================ */

interface SocialButtonProps {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
}

function SocialButton({
  href,
  label,
  children,
  external = false,
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      aria-label={label}
      data-footer-social
      className="
        group
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        border-slate-900/[0.08]
        text-slate-500
        outline-none
        will-change-transform
        transition-[border-color,color,background-color]
        duration-300
        hover:border-slate-900/[0.16]
        hover:bg-white
        hover:text-slate-950
        focus-visible:ring-2
        focus-visible:ring-cyan-500/30
        dark:border-white/[0.07]
        dark:text-slate-500
        dark:hover:border-white/[0.15]
        dark:hover:bg-white/[0.035]
        dark:hover:text-white
        dark:focus-visible:ring-cyan-400/30
      "
    >
      {children}
    </a>
  );
}

/* ================================================================
   GITHUB ICON
================================================================ */

function GitHubIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-1.02-.014-1.85-2.782.604-3.369-1.185-3.369-1.185-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.338 4.687-4.566 4.935.359.309.678.917.678 1.849 0 1.335-.012 2.411-.012 2.738 0 .268.18.58.688.481A10.002 10.002 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}

/* ================================================================
   LINKEDIN ICON
================================================================ */

function LinkedInIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.606 0 4.271 2.373 4.271 5.467v6.274ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM3.555 20.452h3.558V9H3.555v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 .227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}