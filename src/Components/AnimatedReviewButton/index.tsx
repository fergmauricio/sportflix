"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedReviewButtonProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  title: string;
  type: "like" | "dislike" | "fan";
};

export function AnimatedReviewButton({
  children,
  isActive,
  onClick,
  title,
  type,
}: AnimatedReviewButtonProps) {
  const colors = {
    like: "#4ade80",
    dislike: "#f87171",
    fan: "#eab308",
  };

  return (
    <div className="relative">
      <motion.button
        className={`flex justify-center items-center w-10 h-10 rounded-xl transition cursor-pointer ${
          isActive
            ? type === "dislike"
              ? "text-red-900/80"
              : "text-amber-500"
            : "text-white"
        }`}
        title={title}
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {children}
        {isActive && (
          <motion.span
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: `0 0 0 0 ${colors[type]}`,
            }}
            animate={{
              boxShadow: [
                `0 0 0 0 ${colors[type]}`,
                `0 0 0 10px rgba(0,0,0,0)`,
              ],
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
