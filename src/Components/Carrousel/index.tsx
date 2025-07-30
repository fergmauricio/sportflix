"use client";

import { useSportContext } from "@/contexts/SportContext";
import { SportActionsTypes } from "@/contexts/SportContext/sportActions";
import { SportModel } from "@/models/sport-model";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useProfileSportContext } from "@/contexts/ListProfileSportContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BsEmojiSunglasses, BsList } from "react-icons/bs";

type CarrouselProps = {
  title: string;
  type: "standard" | "customList" | "rating";
};

export function Carrousel({ title, type }: CarrouselProps) {
  const { state, dispatch } = useSportContext();
  const { state: profileState } = useProfileContext();
  const { state: myListState } = useProfileSportContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const [sourceData, setSourceData] = useState<SportModel[]>([]);

  useEffect(() => {
    if (type === "standard") {
      if (state.sports) {
        setSourceData(state.sports);
      }
    }

    if (type === "rating") {
      if (state.sportsByRating) {
        setSourceData(state.sportsByRating);
      }
    }

    if (!profileState.activeProfile) return;

    if (type === "customList") {
      if (!!myListState[profileState.activeProfile?.id]) {
        setSourceData(myListState[profileState.activeProfile?.id]);
      }
    }
  }, [state, myListState, profileState.activeProfile]);

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

  function renderStars(rating: number) {
    if (!rating) return;

    const ratingStr = rating.toString();
    const stars = [];
    const isFloatingNumber = ratingStr.indexOf(".") !== -1;

    if (isFloatingNumber) {
      const integerNumber = parseInt(ratingStr.split(".")[0]);
      for (let i = 1; i < integerNumber; i++) {
        stars.push(<FaStar key={i} className="text-shadow-cyan-300" />);
      }
      stars.push(<FaStarHalfAlt key={4} className="text-shadow-cyan-300" />);
      stars.push(<FaRegStar key={5} className="text-shadow-cyan-300" />);
    } else {
      for (let i = 1; i <= rating; i++) {
        stars.push(<FaStar key={i} className="text-shadow-cyan-300" />);
      }
    }

    return stars;
  }

  if (sourceData.length === 0) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        "relative w-screen h-[350px] md:h-[350px] overflow-visible mt-4",
        type === "rating" && "mb-8"
      )}
    >
      <h2 className="text-2xl sm:text-4xl font-medium text-slate-200 mb-6 pl-4 md:pl-12 flex gap-2 items-center">
        {type === "rating" && (
          <FaStar className="text-shadow-cyan-300 mt-1 mr-1" size={20} />
        )}
        {type === "customList" && (
          <BsList className="text-shadow-cyan-300 mt-1 mr-1" size={20} />
        )}
        {type === "standard" && (
          <BsEmojiSunglasses
            className="text-shadow-cyan-300 mt-1 mr-1"
            size={20}
          />
        )}

        {title}
      </h2>

      <div className="relative group px-4 md:px-12">
        <button
          onClick={prevSlide}
          className="absolute cursor-pointer top-22 left-4 z-30 w-10 h-10 md:w-18 md:h-18 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-all"
          aria-label="Anterior"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="flex">
          <div
            className={clsx("flex transition-transform duration-300 gap-2 z-9")}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {sourceData.map((item, index) => (
              <div key={`${index}_${item.id}`} className="flex flex-col">
                <div
                  onClick={() => handleClickCard(item)}
                  className={clsx(
                    "flex-shrink-0 relative rounded overflow-hidden transition-all duration-300",
                    "shadow-[0_10px_20px_rgba(0,0,0,0.2)]",
                    "w-[250px] sm:w-[400px] z-10 ",
                    "hover:transform hover:scale-[1.3] hover:z-30 hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)] hover:delay-300 cursor-pointer"
                  )}
                  style={{
                    height: "240px",
                    marginRight: "2px",
                  }}
                >
                  <div
                    className={clsx(
                      "absolute z-50 inset-0 w-full h-full",
                      "bg-black/50 ",
                      "flex justify-center items-center",
                      "opacity-0 hover:opacity-100 hover:delay-300 transition-opacity"
                    )}
                  >
                    <InfoIcon size={36} />
                    <div className="absolute bottom-3 left-4 flex gap-2 pt-2 w-[180px] sm:w-[380px]">
                      <h3 className="text-slate-100 font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.title}:{" "}
                        <span className="text-slate-200 font-normal">
                          {item.content}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <Image
                    src={`/${item.image}`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 250px, 400px"
                    className="object-cover"
                    priority={index < visibleCards}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                {type === "rating" && (
                  <div className="flex mt-4 gap-1 justify-start items-center">
                    <span>{item.rating}</span>
                    {renderStars(Number(item.rating))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute cursor-pointer top-22 right-10 z-30 w-10 h-10 md:w-18 md:h-18 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-all"
          aria-label="Próximo"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
