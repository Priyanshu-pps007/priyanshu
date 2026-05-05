"use client";

import { useEffect, useState } from "react";

const roles = [
  "AI engineer",
  "backend engineer",
  "FastAPI developer",
  "software engineer",
  "Python developer",
] as const;

const typingDelay = 75;
const deletingDelay = 42;
const holdDelay = 1450;

export function HeroRoleTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const fullStaticText =
    "AI engineer, backend engineer, FastAPI developer, software engineer, and Python developer in India";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const currentRole = roles[roleIndex];
    const isComplete = displayText === currentRole;
    const isEmpty = displayText.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (isComplete) {
            setIsDeleting(true);
            return;
          }

          setDisplayText(currentRole.slice(0, displayText.length + 1));
          return;
        }

        if (!isEmpty) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          return;
        }

        setIsDeleting(false);
        setRoleIndex((current) => (current + 1) % roles.length);
      },
      isDeleting ? (isEmpty ? typingDelay : deletingDelay) : isComplete ? holdDelay : typingDelay
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, prefersReducedMotion, roleIndex]);

  if (prefersReducedMotion) {
    return <span className="hero-typewriter-static">{fullStaticText}</span>;
  }

  return (
    <span className="hero-typewriter" aria-label="AI engineer, backend engineer, FastAPI developer, software engineer, and Python developer in India">
      <span className="hero-typewriter-prefix">India-based </span>
      <span className="hero-typewriter-word">{displayText}</span>
      <span className="hero-typewriter-suffix">.</span>
      <span className="hero-typewriter-caret" aria-hidden="true" />
    </span>
  );
}
