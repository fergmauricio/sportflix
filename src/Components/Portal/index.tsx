"use client";

import { Carrousel } from "../Carrousel";
import { Container } from "../Container";
import { Footer } from "../Footer";
import { MainBanner } from "../MainBanner";
import { Menu } from "../Menu";
import { SportInfo } from "../SportInfo";
import { useEffect, useState } from "react";
import AnimateOnScroll from "../AnimateOnScroll";
import clsx from "clsx";
import SportsSearch from "../SportsSearch";
import { Anchor } from "../Anchor";

export function Portal() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [stringSearch, setStringSearch] = useState(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 text-white">
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
            "pt-40 ",
            "transition-opacity ease-in-out",
            isSearching ? "opacity-100 visible" : "opacity-0 hidden"
          )}
        >
          <SportsSearch stringSearch={stringSearch} />
        </Container>
        <Container
          className={clsx(
            "transition-opacity ease-in-out",
            !isSearching ? "opacity-100" : "opacity-0"
          )}
        >
          <main className="flex flex-col box-content overflow-hidden">
            <section
              className="
                  w-full h-[70vh] sm:h-[80vh] md:h-[75vh]
                  flex items-center relative
                  mask-gradient-bottom"
            >
              <MainBanner />
            </section>

            <AnimateOnScroll delay={2000} duration={700}>
              <Container>
                <Carrousel
                  title="Sugestões que você vai adorar"
                  type="standard"
                />
              </Container>
            </AnimateOnScroll>

            <AnimateOnScroll delay={2400} duration={700}>
              <Container>
                <Carrousel title="Mais bem avaliados" type="rating" />
              </Container>
            </AnimateOnScroll>

            <AnimateOnScroll delay={2900} duration={700}>
              <Container>
                <Carrousel title="Minha Lista" type="customList" />
              </Container>
            </AnimateOnScroll>

            <Container>
              <Footer />
            </Container>
          </main>
        </Container>
        <Container>
          <SportInfo />
        </Container>
        <Anchor />
      </div>
    </div>
  );
}
