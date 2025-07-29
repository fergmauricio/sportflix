"use client";
import { Container } from "@/Components/Container";
import { Menu } from "@/Components/Menu";
import clsx from "clsx";
import { useEffect, useState } from "react";
import SportsSearch from "../SportsSearch";

export default function LegalTerm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [stringSearch, setStringSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 pt-40 text-white">
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
            "w-[90vw] sm:w-[70vw] m-auto transition-opacity ease-in-out",
            !isSearching ? "opacity-100" : "opacity-0"
          )}
        >
          <Container>
            <div className="space-y-10 mt-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-500">
                  Informações Legais
                </h2>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <div className="space-y-4 text-sm text-gray-300">
                    <p>
                      <strong className="text-green-400">1. Finalidade:</strong>{" "}
                      Este é um projeto demonstrativo fictício criado para
                      portfólio profissional. Todos os conteúdos são
                      ilustrativos.
                    </p>
                    <p>
                      <strong className="text-green-400">2. Isenção:</strong>{" "}
                      Não associado a nenhuma liga esportiva ou serviço real.
                      Imagens/logos são para fins demonstrativos.
                    </p>
                    <p>
                      <strong className="text-green-400">
                        3. Privacidade:
                      </strong>{" "}
                      Nenhum dado real é coletado. Formulários e interações são
                      simulações frontend.
                    </p>
                    <p>
                      <strong className="text-green-400">4. Direitos:</strong>{" "}
                      Código-fonte © {new Date().getFullYear()} Maurício Ferg.
                      Projeto não-comercial.
                    </p>
                    <p>
                      <strong className="text-green-400">5. Dados:</strong>{" "}
                      Nenhum dado real é coletado (formulários são simulados).
                    </p>
                  </div>
                </div>
              </section>

              <footer className="text-center mt-12 pt-8 border-t border-slate-700">
                <div className="mb-6">
                  <p>
                    Quer ver o código-fonte ou conversar sobre desenvolvimento?
                  </p>
                  <a
                    href="mailto:mauricioferg@gmail.com"
                    className="font-semibold text-green-400 hover:text-green-300 transition-colors"
                  >
                    Vamos conectar!
                  </a>
                </div>
                <div>
                  <p className="text-xl font-bold">Ferg, Maurício.</p>
                  <p className="text-gray-400">Desenvolvedor Frontend</p>
                </div>
              </footer>
            </div>
          </Container>
        </Container>
      </div>
    </div>
  );
}
