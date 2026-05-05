"use client";

import { useEffect, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

type Props = {
  items: NavigationItem[];
};

export function MobileNav({ items }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-nav-trigger"
        aria-expanded={open}
        aria-controls={open ? "mobile-nav-panel" : undefined}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="mobile-nav-overlay"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          />

          <aside id="mobile-nav-panel" className="mobile-nav-panel" aria-hidden={false}>
            <div className="mobile-nav-head">
              <p>Navigation</p>
              <button
                type="button"
                className="mobile-nav-close"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <nav className="mobile-nav-links" aria-label="Mobile navigation">
              {items.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </>
      ) : null}
    </>
  );
}
