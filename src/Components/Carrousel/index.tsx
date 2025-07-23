"use client";

import { useSportContext } from "@/contexts/SportContext";
import { SportActionsTypes } from "@/contexts/SportContext/sportActions";
import { SportModel } from "@/models/sport-model";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SpinLoader } from "../SpinLoader";
import { useProfileSportContext } from "@/contexts/ListProfileSportContext";
import { useProfileContext } from "@/contexts/ProfileContext";

type CarrouselProps = {
  title: string;
  type: "standard" | "customList";
};

export function Carrousel({ title, type }: CarrouselProps) {
  const { state, dispatch } = useSportContext();
  const { state: profileState } = useProfileContext();
  const { state: myListState } = useProfileSportContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    if (type === "standard") {
      if (state.sports) {
        setSourceData(state.sports);
      }
    }

    if (!profileState.activeProfile) return;

    if (type === "customList") {
      if (!!myListState[profileState.activeProfile?.id]) {
        setSourceData(myListState[profileState.activeProfile?.id]);
      }
    }
  }, [state.sports, myListState, profileState.activeProfile]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 768 ? 3 : visibleCards);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= sourceData.length - visibleCards ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? sourceData.length - visibleCards : prev - 1
    );
  };

  function handleClickCard(item: SportModel) {
    dispatch({ type: SportActionsTypes.ACTIVE_SPORT, payload: item });
  }

  if (!sourceData) {
    return <SpinLoader />;
  }

  return (
    <div className="relative w-screen h-[450px] md:h-[350px] mb-12">
      <h2 className="text-3xl font-bold text-white mb-6 pl-4 md:pl-12">
        {title}
      </h2>

      <div className="relative group px-4 md:px-12">
        <button
          onClick={prevSlide}
          className="absolute cursor-pointer top-26 left-4 z-30 w-10 h-10 md:w-18 md:h-18 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-all"
          aria-label="Anterior"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="flex">
          <div
            className={clsx("flex transition-transform duration-300 gap-4 ")}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {sourceData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClickCard(item)}
                className={clsx(
                  "flex-shrink-0 relative rounded-xl overflow-hidden transition",
                  "w-[250px] sm:w-[400px]",
                  "hover:transform hover:scale-[1.2] hover:z-20 shadow-[0_20px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                )}
                style={{
                  height: "280px",
                  marginRight: "4px",
                }}
              >
                <Image
                  src={`/uploads/${item.image}`}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                  priority={index < visibleCards}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute cursor-pointer top-26 right-10 z-30 w-10 h-10 md:w-18 md:h-18 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-all"
          aria-label="Próximo"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
