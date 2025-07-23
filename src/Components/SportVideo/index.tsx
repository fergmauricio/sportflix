"use client";

import { SportModel } from "@/models/sport-model";
import { useEffect, useRef, useState } from "react";
import { SpinLoader } from "../SpinLoader";
import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type SportVideoProps = {
  sport: SportModel;
};

export function SportVideo({ sport }: SportVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  function handleGoBack(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    router.push(`/portal`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 text-white">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex justify-center items-center ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <SpinLoader />
      </div>
      <div
        className="absolute left-10 top-10 z-50 p-2 transition rounded-lg hover:bg-slate-800/50"
        aria-label="Voltar"
      >
        <button onClick={handleGoBack} className="cursor-pointer p-0">
          <CircleArrowLeft size={42} />
        </button>
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover select-none z-0 transition"
          muted
          controls
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={`/uploads/${sport.video}`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
