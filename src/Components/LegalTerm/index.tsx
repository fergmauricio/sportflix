import { Container } from "@/Components/Container";
import { Menu } from "@/Components/Menu";

export default function LegalTerm() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 text-white">
      <div className={`transition-opacity duration-500 opacity-100`}>
        <Container>
          <Menu />
        </Container>
        <Container className="w-[90vw] sm:w-[70vw] m-auto pt-40">
          <Container>
            <div className="space-y-10 mt-8">
              {/* Legal Terms Section */}
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

              {/* Footer */}
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
