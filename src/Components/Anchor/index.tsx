"use client";

import clsx from "clsx";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function Anchor() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const checkScrolling = () => {
      setIsScrolling(window.scrollY > 900);
    };

    window.addEventListener("scroll", checkScrolling);

    return () => {
      window.removeEventListener("scroll", checkScrolling);
    };
  }, []);

  function handleAnchor() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div
        className={clsx(
          "fixed",
          "right-10 bottom-10 z-50",
          "transition-opacity delay-150 ",
          isScrolling ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          title="Rolar página para cima"
          aria-label="Rolar página para cima"
          onClick={handleAnchor}
          className={clsx(
            "cursor-pointer",
            "flex justify-center items-center",
            "w-14 h-14",
            "hover:transform hover:scale-120 transition",
            "bg-green-400/70 rounded-full shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
          )}
        >
          <ArrowUp />
        </button>
      </div>
    </>
  );
}
