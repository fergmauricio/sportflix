"use client";

import { Carrousel } from "../Carrousel";
import { Container } from "../Container";
import { MainBanner } from "../MainBanner";
import { Menu } from "../Menu";
import { SportInfo } from "../SportInfo";
import { useEffect, useState } from "react";

export function Portal() {
  const [isLoading, setIsLoading] = useState(true);

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
          <Menu />
        </Container>
        <Container>
          <main className="flex flex-col box-content overflow-hidden">
            <section
              className="
                  w-full h-[70vh] sm:h-[80vh] md:h-[75vh]
                  flex items-center relative
                  mask-gradient-bottom"
            >
              <MainBanner />
            </section>

            <Container>
              <Carrousel title="Populares" type="standard" />
            </Container>

            <Container className="mt-12">
              <Carrousel title="Minha Lista" type="customList" />
            </Container>
            <Container>
              <h1 className="m-20">Footer</h1>
            </Container>
          </main>
        </Container>
        <Container>
          <SportInfo />
        </Container>
      </div>
    </div>
  );
}
