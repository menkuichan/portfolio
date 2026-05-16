"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * CalendlyInline — embed Calendly's scheduling widget directly on the page.
 *
 * Loads `https://assets.calendly.com/assets/external/widget.js` once on
 * mount and inserts a placeholder div that Calendly's script picks up.
 *
 * Shows a soft loading message until the widget script finishes loading.
 * The setState is deferred via requestAnimationFrame to satisfy React 19's
 * `react-hooks/set-state-in-effect` rule (avoids synchronous cascades).
 */

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const LOADED_FLAG = "data-loaded";

export interface CalendlyInlineProps {
  url: string;
  /** Min height in px — Calendly recommends ~700px for one-on-one events */
  minHeight?: number;
  className?: string;
  loadingLabel: string;
}

export function CalendlyInline({
  url,
  minHeight = 700,
  className,
  loadingLabel,
}: CalendlyInlineProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;
    let cleanupListener: (() => void) | null = null;

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);

    function markReady() {
      // Defer setState to the next frame so the effect itself completes first
      // (avoids React 19's "synchronous setState in effect" cascade).
      frameId = requestAnimationFrame(() => setIsReady(true));
    }

    if (existing && existing.getAttribute(LOADED_FLAG) === "true") {
      markReady();
    } else {
      const script = existing ?? document.createElement("script");
      const onLoad = () => {
        script.setAttribute(LOADED_FLAG, "true");
        markReady();
      };
      script.addEventListener("load", onLoad);
      cleanupListener = () => script.removeEventListener("load", onLoad);

      if (!existing) {
        script.src = SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      cleanupListener?.();
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden rounded-(--radius-card)", className)}>
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: 320, height: minHeight }}
      />

      {/* Loading state — fades when the iframe paints */}
      {!isReady ? (
        <div
          className="border-cream-200 bg-cream-50 absolute inset-0 flex items-center justify-center border"
          style={{ height: minHeight }}
        >
          <div className="font-hand text-ink-muted text-xl">{loadingLabel}</div>
        </div>
      ) : null}
    </div>
  );
}
