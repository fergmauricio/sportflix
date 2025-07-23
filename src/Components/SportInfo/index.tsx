"use client";

import { useProfileSportContext } from "@/contexts/ListProfileSportContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { useSportContext } from "@/contexts/SportContext";
import { useSportReviewContext } from "@/contexts/SportReviewContext";

import clsx from "clsx";
import {
  HeartIcon,
  HeartPlusIcon,
  PlayIcon,
  PlusIcon,
  ThumbsDown,
  TrashIcon,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedReviewButton } from "../AnimatedReviewButton";

export function SportInfo() {
  const router = useRouter();
  const { state: sportState, clearActiveSport } = useSportContext();
  const { state: profileState } = useProfileContext();
  const { state: SportReviewState, addSportReview } = useSportReviewContext();
  const {
    state: customLists,
    addProfileSport,
    removeProfileSport,
  } = useProfileSportContext();

  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    if (profileState?.activeProfile?.id && sportState.activeSport) {
      const sportsForProfile = customLists[profileState.activeProfile.id] || [];
      setIsInList(
        sportsForProfile.some((s) => s.id === sportState.activeSport.id)
      );
    } else {
      setIsInList(false);
    }
  }, [profileState.activeProfile, sportState.activeSport, customLists]);

  const getCurrentReviewType = () => {
    if (!profileState.activeProfile?.id || !sportState.activeSport?.id)
      return null;

    const review = SportReviewState[profileState.activeProfile?.id].find(
      (item) => item.sportId === sportState.activeSport.id
    );

    return review?.type || null;
  };

  const handleToggleList = () => {
    if (!profileState.activeProfile?.id || !sportState.activeSport) return;

    if (isInList) {
      removeProfileSport(
        profileState.activeProfile.id,
        sportState.activeSport.id
      );
    } else {
      addProfileSport(profileState.activeProfile.id, sportState.activeSport);
    }
  };

  function handleGoTo(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    router.push(`/item/${sportState.activeSport?.slug}`);
  }

  function handleCloseDialog() {
    clearActiveSport();
  }

  function makeReview(type: string): void {
    if (!profileState.activeProfile?.id || !sportState.activeSport?.id) return;

    const currentType = getCurrentReviewType();
    const newType = currentType === type ? null : type;

    addSportReview({
      profileId: profileState.activeProfile.id,
      sportId: sportState.activeSport.id,
      type: newType,
    });
  }

  const reviewClass =
    "flex justify-center items-center w-10 h-10 rounded-xl cursor-pointer transition";

  if (!sportState.activeSport) return null;

  return (
    <>
      <div
        className={clsx(
          "fixed z-40 inset-0 bg-black/50 backdrop-blur-xs transition",
          "flex items-center justify-center"
        )}
        onClick={handleCloseDialog}
      ></div>
      <div
        className="w-[90vw] sm:w-[80vw] md:w-[70vw] h-[80vh] overflow-y-auto scrollbar-thin z-50 bg-slate-950/98 fixed top-1/2 
  left-1/2 rounded-2xl
  shadow-[0_20px_30px_rgba(0,0,0,0.5)]
  pb-12
  border-0 border-slate-900
  transform 
  -translate-x-1/2 
  -translate-y-1/2"
      >
        <div className="w-full h-140 relative mask-gradient-bottom">
          <div className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 transition absolute top-10 right-10 z-10 cursor-pointer flex justify-center items-center">
            <X className=" text-white " onClick={handleCloseDialog} />
          </div>

          <video
            className="absolute inset-0 w-full h-140 object-cover select-none z-0 transition rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source
              src={`/uploads/${sportState.activeSport.video}`}
              type="video/mp4"
            />
          </video>
        </div>
        <div className="relative p-12 flex flex-col gap-4 whitespace-pre-line">
          <h1 className="text-4xl font-bold sm:text-6xl text-white [text-shadow:_2px_2px_8px_rgba(0,0,0,0.7)]">
            {sportState.activeSport.title}
          </h1>
          <div className="flex flex-col gap-3 lg:flex-row justify-between pt-6">
            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={handleGoTo}
                className={clsx(
                  "flex",
                  "justify-center items-center gap-2  cursor-pointer  transition",
                  "bg-slate-300 hover:bg-slate-400 py-4 px-8 rounded-lg",
                  "text-black text-2xl font-medium"
                )}
              >
                <PlayIcon /> Assistir
              </button>
              {profileState.activeProfile && (
                <button
                  onClick={handleToggleList}
                  className={clsx(
                    "flex justify-center items-center gap-2 cursor-pointer transition",
                    "py-4 px-8 rounded-lg",
                    "text-white text-2xl font-medium",
                    isInList
                      ? "bg-red-900/50 hover:bg-red-900/80 "
                      : "bg-green-900/50 hover:bg-green-900/80"
                  )}
                >
                  {isInList ? (
                    <>
                      <TrashIcon /> Remover da Lista
                    </>
                  ) : (
                    <>
                      <PlusIcon /> Adicionar a Lista
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex gap-4 justify-center items-center">
              <AnimatedReviewButton
                isActive={getCurrentReviewType() === "dislike"}
                onClick={() => makeReview("dislike")}
                title="Não Gostei"
                type="dislike"
              >
                <ThumbsDown />
              </AnimatedReviewButton>
              <AnimatedReviewButton
                isActive={getCurrentReviewType() === "like"}
                onClick={() => makeReview("like")}
                title="Gostei"
                type="like"
              >
                <HeartIcon />
              </AnimatedReviewButton>

              <AnimatedReviewButton
                isActive={getCurrentReviewType() === "fan"}
                onClick={() => makeReview("fan")}
                title="Sou Fã"
                type="fan"
              >
                <HeartPlusIcon />
              </AnimatedReviewButton>
            </div>
          </div>
          <div className="whitespace-pre-line pt-4 flex flex-col gap-2">
            <span className="text-white">
              <span className="text-slate-400 font-bold mr-4">Elenco:</span>{" "}
              {sportState.activeSport.elenco.join(", ")}
            </span>
            <span className="text-white">
              <span className="text-slate-400 font-bold mr-4">Origem:</span>{" "}
              {sportState.activeSport.origem}
            </span>
            <span className="text-white">
              <span className="text-slate-400 font-bold mr-4">Criado em:</span>{" "}
              {sportState.activeSport.datacriacao}
            </span>
          </div>
          <div className="pt-4">
            {sportState.activeSport.fullContent
              .split("\n\n")
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xl md:text-2xl text-white px-2 mb-4 last:mb-0 leading-[1.6] text-justify"
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
