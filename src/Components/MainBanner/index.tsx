"use client";

import { useSportContext } from "@/contexts/SportContext";
import { SportModel } from "@/models/sport-model";
import clsx from "clsx";
import { InfoIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SpinLoader } from "../SpinLoader";
import { useRouter } from "next/navigation";
import { SportActionsTypes } from "@/contexts/SportContext/sportActions";

export function MainBanner() {
  const { state, fetchSports, activeSport, dispatch } = useSportContext();
  //const [requiresUserInteraction, setRequiresUserInteraction] = useState(false);

  const [currentSportIndex, setCurrentSportIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSport, setCurrentSport] = useState<SportModel>();
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  useEffect(() => {
    const loadSports = async () => {
      try {
        setIsLoading(true);
        await fetchSports();
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSports();
  }, []);

  useEffect(() => {
    if (isLoading || state.sports.length === 0) return;
    if (currentSportIndex + 1 > state.sports.length) setCurrentSportIndex(0);

    setIsTransitioning(false);
    const timer1 = setTimeout(() => {
      setIsTransitioning(true);
      setShowVideo(false);

      setCurrentSport(() => {
        return {
          ...state.sports[currentSportIndex],
        };
      });
    }, 1000);

    const timer2 = setTimeout(() => {
      setShowVideo(true);
    }, 5000);

    const timer3 = setTimeout(() => {
      setCurrentSportIndex((prevState) => prevState + 1);
      setShowVideo(true);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentSportIndex, isLoading]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !showVideo || !currentSport?.video) return;

    const handlePlay = async () => {
      try {
        await videoElement.play();
      } catch (e) {
        console.log("Autoplay bloqueado. Aguardando interação...", e);
      }
    };

    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.preload = "auto";

    handlePlay();

    const interactionEvents = ["click", "touchstart", "keydown"];
    const handleUserInteraction = () => handlePlay();

    interactionEvents.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [showVideo, currentSport?.video]);

  if (isLoading || !currentSport) {
    return (
      <div className="w-screen h-full bg-black flex justify-center items-center">
        <SpinLoader />
      </div>
    );
  }

  function handleGoTo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!activeSport) return;

    router.push(`/item/${currentSport?.slug}`);
  }

  function handleClickCard(item: SportModel) {
    dispatch({ type: SportActionsTypes.ACTIVE_SPORT, payload: item });
  }

  return (
    <div className="relative w-full h-full">
      <div
        className={`absolute inset-0 flex justify-center items-center bg-black transition-opacity duration-500 z-50 ${
          isLoading ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}
      >
        <SpinLoader />
      </div>
      {!isLoading && currentSport && (
        <div className="relative w-full h-full opacity-0 animate-fadeIn">
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
              showVideo || isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              id={currentSport?.id}
              src={`/uploads/${currentSport?.image}`}
              alt={currentSport?.title}
              fill
              sizes="100vw"
              className="object-cover select-none"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90 pointer-events-none" />
          </div>
          {showVideo && currentSport?.video && (
            <>
              <div
                className={`absolute inset-0 transition-opacity duration-2000 ease-in-out z-0 ${
                  showVideo ? "opacity-100" : "opacity-0"
                }`}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src={`/uploads/${currentSport?.video}`}
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 pointer-events-none" />
              </div>
            </>
          )}

          <div
            className={`relative z-30 opacity-0 transition-opacity duration-2000 ease-in-out box-border m-0 
      px-[50px]  lg:pt-100  w-auto h-full  text-white flex flex-col justify-center gap-4 
      sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] ${
        isTransitioning ? "opacity-100" : "opacity-0"
      }`}
          >
            <h1 className="text-4xl font-bold sm:text-6xl [text-shadow:_2px_2px_8px_rgba(0,0,0,0.7)]">
              {currentSport?.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl pl-1 [text-shadow:_2px_2px_8px_rgba(0,0,0,0.7)]">
              {currentSport?.content}
            </p>
            <div className="flex gap-3 pt-6 z-40">
              <button
                onClick={handleGoTo}
                className={clsx(
                  "flex",
                  "justify-center items-center gap-2 transition",
                  "bg-slate-300 hover:bg-slate-400 py-2 px-4 sm:py-4 sm:px-8 rounded-lg",
                  "text-black text-xl sm:text-2xl font-medium cursor-pointer"
                )}
              >
                <PlayIcon /> Assistir
              </button>

              <button
                onClick={() => handleClickCard(currentSport)}
                className={clsx(
                  "flex",
                  "justify-center items-center gap-2 transition",
                  "bg-slate-900/70 hover:bg-slate-950 py-2 px-4 sm:py-4 sm:px-8 rounded-lg",
                  "text-white text-xl sm:text-2xl font-medium cursor-pointer"
                )}
              >
                <InfoIcon /> Mais informações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
