"use client";
import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 600);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!open || !isMobile || !bubbleRef.current) return;
    const rect = bubbleRef.current.getBoundingClientRect();
    const margin = 8;
    let shift = 0;
    if (rect.left < margin) {
      shift = margin - rect.left;
    } else if (rect.right > window.innerWidth - margin) {
      shift = -(rect.right - (window.innerWidth - margin));
    }
    setOffset(shift);
  }, [open, isMobile]);

  return (
    <span className="tooltip-wrapper" ref={ref}>
      <span
        className="tooltip-icon"
        role="button"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(o => !o);
          }
        }}
        aria-label={text}
      >
        ?
      </span>
      {open && (
        <span
          ref={bubbleRef}
          className="tooltip-bubble"
          style={
            isMobile ? { transform: `translateX(calc(-50% + ${offset}px))` } : undefined
          }
        >
          {text}
        </span>
      )}
    </span>
  );
}
