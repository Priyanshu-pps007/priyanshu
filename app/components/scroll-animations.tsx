"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;

    async function setupAnimations() {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const { animate, stagger } = await import("animejs");

      const animatedSections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-animate-section]")
      );
      const animatedChildren = Array.from(
        document.querySelectorAll<HTMLElement>("[data-animate-child]")
      );
      const heroStage = document.querySelector<HTMLElement>("[data-hero-stage]");
      const heroMedia = document.querySelector<HTMLElement>("[data-hero-media]");
      let rafId = 0;

      const resetAnimatedChildren = () => {
        animatedChildren.forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
        });
      };

      if (prefersReducedMotion) {
        resetAnimatedChildren();
        return;
      }

      animatedChildren.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translate3d(0, 32px, 0) scale(0.985)";
      });

      const heroChildren = heroStage?.querySelectorAll<HTMLElement>("[data-animate-child]");

      if (heroChildren?.length) {
        animate(heroChildren, {
          opacity: [0, 1],
          translateY: [32, 0],
          scale: [0.985, 1],
          duration: 880,
          delay: stagger(85),
          ease: "out(4)",
          complete: () => {
            heroChildren.forEach((child) => {
              child.style.opacity = "1";
              child.style.transform = "none";
            });
          },
        });
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const children = entry.target.querySelectorAll<HTMLElement>("[data-animate-child]");

            animate(children, {
              opacity: [0, 1],
              translateY: [32, 0],
              scale: [0.985, 1],
              duration: 860,
              delay: stagger(90),
              ease: "out(4)",
              complete: () => {
                children.forEach((child) => {
                  child.style.opacity = "1";
                  child.style.transform = "none";
                });
              },
            });

            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -10% 0px",
        }
      );

      animatedSections.forEach((section) => {
        if (section === heroStage) {
          return;
        }

        observer.observe(section);
      });

      const updateHero = () => {
        if (!heroStage || !heroMedia) {
          return;
        }

        const rect = heroStage.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = Math.max(
          -1,
          Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height))
        );

        const mediaShift = (progress - 0.5) * 24;
        const mediaScale = 0.985 + progress * 0.04;
        heroMedia.style.transform = `translate3d(0, ${mediaShift}px, 0) scale(${mediaScale.toFixed(3)})`;
        heroStage.style.setProperty("--hero-progress", progress.toFixed(3));
      };

      const scheduleHeroUpdate = () => {
        if (rafId) {
          return;
        }

        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          updateHero();
        });
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!heroStage) {
          return;
        }

        const rect = heroStage.getBoundingClientRect();
        const pointerX = ((event.clientX - rect.left) / rect.width) * 100;
        const pointerY = ((event.clientY - rect.top) / rect.height) * 100;

        heroStage.style.setProperty("--pointer-x", `${pointerX.toFixed(2)}%`);
        heroStage.style.setProperty("--pointer-y", `${pointerY.toFixed(2)}%`);
      };

      const resetPointer = () => {
        if (!heroStage) {
          return;
        }

        heroStage.style.setProperty("--pointer-x", "78%");
        heroStage.style.setProperty("--pointer-y", "20%");
      };

      resetPointer();
      scheduleHeroUpdate();
      window.addEventListener("scroll", scheduleHeroUpdate, { passive: true });
      window.addEventListener("resize", scheduleHeroUpdate);
      heroStage?.addEventListener("pointermove", onPointerMove);
      heroStage?.addEventListener("pointerleave", resetPointer);

      cleanupAnimation = () => {
        observer.disconnect();
        window.removeEventListener("scroll", scheduleHeroUpdate);
        window.removeEventListener("resize", scheduleHeroUpdate);
        heroStage?.removeEventListener("pointermove", onPointerMove);
        heroStage?.removeEventListener("pointerleave", resetPointer);
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
      };
    }

    void setupAnimations();

    return () => {
      cleanupAnimation?.();
    };
  }, []);

  return null;
}
