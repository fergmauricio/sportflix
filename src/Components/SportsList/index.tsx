"use client";

import { useProfileSportContext } from "@/contexts/ListProfileSportContext";
import { useProfileContext } from "@/contexts/ProfileContext";

import { SportModel } from "@/models/sport-model";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "../Container";
import { Menu } from "../Menu";
import { PlayIcon } from "lucide-react";
import { Footer } from "../Footer";
import { useSportContext } from "@/contexts/SportContext";
import SportsSearch from "../SportsSearch";
import { Anchor } from "../Anchor";
import { MainContainer } from "../MainContainer";

type SportsListsProps = {
  type: "mylist" | "sportslist";
};

export default function SportsList({ type = "mylist" }: SportsListsProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [stringSearch, setStringSearch] = useState("");

  const { state: sportState, fetchSports } = useSportContext();
  const { state: profileState } = useProfileContext();
  const { state: myListState } = useProfileSportContext();
  const [sourceData, setSourceData] = useState(Array<SportModel>);

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
    console.log(sourceData);
  }, [sourceData]);

  useEffect(() => {
    if (!profileState?.activeProfile) return;

    if (!!myListState[profileState.activeProfile?.id]) {
      if (type === "mylist") {
        setSourceData(myListState[profileState.activeProfile?.id]);
      } else {
        setSourceData(sportState.sports);
      }
    }
  }, [myListState, profileState, sportState]);

  function handleGoTo(sport: SportModel) {
    router.push(`/item/${sport.slug}`);
  }

  return (
    <MainContainer className="pt-40">
      <div
        className={`transition-opacity duration-500 ${
          !isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <Container>
          <Menu
            cbSearchState={setIsSearching}
            cbSearchString={setStringSearch}
          />
        </Container>
        <Container
          className={clsx(
            "transition-opacity ease-in-out",
            isSearching ? "opacity-100 visible" : "opacity-0 hidden"
          )}
        >
          <SportsSearch stringSearch={stringSearch} />
        </Container>
        <Container
          className={clsx(
            "flex justify-center items-center transition-opacity ease-in-out",
            !isSearching ? "opacity-100" : "opacity-0"
          )}
        >
          <h1 className="font-bold text-4xl text-slate-200">
            {type === "mylist" && "Minha Lista Customizada"}
            {type === "sportslist" && "Catálogo de Esportes"}
          </h1>
        </Container>
        <Container
          className={clsx(
            "transition-opacity ease-in-out",
            !isSearching ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex flex-col gap-4 justify-center items-center pt-10 z-0">
            {sourceData.length > 0 &&
              sourceData.map((item) => (
                <div
                  key={`${item.id}`}
                  className="relative flex flex-col sm:flex-row w-full gap-4 justify-center items-center m-auto inset-0 p-4 z-0"
                >
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleGoTo(item);
                    }}
                    className={clsx(
                      "relative flex justify-center items-center rounded transition group ",
                      "w-[400px] h-[240px] cursor-pointer z-10",
                      "hover:transform hover:scale-[1.2] hover:z-30 hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)] hover:delay-300 cursor-pointer"
                    )}
                  >
                    <div
                      className={clsx(
                        "absolute inset-0 w-full h-full",
                        "bg-black/50 ",
                        "flex justify-center items-center",
                        "opacity-0 group-hover:opacity-100 group-hover:delay-300 transition-opacity pointer-events-none"
                      )}
                    >
                      <PlayIcon size={36} />
                    </div>
                    <Image
                      src={`/uploads/${item.image}`}
                      alt={item.title}
                      width={400}
                      height={250}
                      className="object-cover rounded w-full h-full"
                    />
                  </div>
                  <div className="relative flex flex-col left-0 p-2 w-[90vw] h-[250px] sm:w-[50%] text-left ">
                    <h3 className="text-slate-100 font-bold text-2xl sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="font-medium sm:text-xl lg:text-2xl mt-4 text-slate-300 line-clamp-7 sm:line-clamp-5  ">
                      {item.fullContent}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Container>
        <Container>
          <Footer />
        </Container>
        <Anchor />
      </div>
    </MainContainer>
  );
}
