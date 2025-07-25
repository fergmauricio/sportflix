"use client";

import { useEffect, useRef, useState } from "react";

interface FadeOnScrollProps {
  children: React.ReactNode;
  delay?: number; // em ms
  duration?: number; // em ms
}

export default function AnimateOnScroll({
  children,
  delay = 300,
  duration = 500,
}: FadeOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
