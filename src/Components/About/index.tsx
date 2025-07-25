import { Container } from "@/Components/Container";
import { Menu } from "@/Components/Menu";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 text-white">
      <div className={`transition-opacity duration-500 opacity-100`}>
        <Container>
          <Menu />
        </Container>
        <Container className="w-[90vw] sm:w-[70vw] m-auto pt-40">
          <Container>
            <h1>Sobre o SPORTFLIX</h1>
          </Container>
          <Container>
            <div className="space-y-10 mt-8">
              {/* Concept Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-500">
                  O Conceito
                </h2>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <p className="mb-4">
                    Este portal de esportes no estilo{" "}
                    <span className="font-semibold text-green-400">
                      Netflix
                    </span>{" "}
                    é uma simulação de uma plataforma de streaming voltada para
                    conteúdos esportivos. A ideia foi explorar:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-semibold">UI/UX moderno</span> com
                      navegação fluída e componentes interativos
                    </li>
                    <li>
                      <span className="font-semibold">
                        Técnicas avançadas de frontend
                      </span>{" "}
                      usando Next.js
                    </li>
                    <li>
                      <span className="font-semibold">Responsividade</span> e
                      performance otimizada
                    </li>
                  </ul>
                  <p className="mt-4">
                    Todo o conteúdo exibido é ilustrativo, mas o código por trás
                    é real — feito para mostrar como eu estruturaria uma
                    aplicação escalável e focada na experiência do usuário.
                  </p>
                </div>
              </section>

              {/* Technologies Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-500">
                  Tecnologias Utilizadas
                </h2>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-3 py-1 bg-red-900 text-green-100 rounded-full text-sm font-medium">
                      Next.js
                    </span>
                    <span className="px-3 py-1 bg-blue-900 text-blue-100 rounded-full text-sm font-medium">
                      Tailwind CSS
                    </span>
                    <span className="px-3 py-1 bg-yellow-900 text-yellow-100 rounded-full text-sm font-medium">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-purple-900 text-purple-100 rounded-full text-sm font-medium">
                      React
                    </span>
                  </div>
                  <p>
                    O projeto utiliza as melhores práticas do ecossistema
                    React/Next, com arquitetura componentizada,
                    context/reducers, lazy loading e otimizações de performance.
                  </p>
                </div>
              </section>

              {/* Goals Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-500">
                  Objetivo
                </h2>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <p className="mb-4">
                    Este projeto faz parte do meu portfólio pessoal e reflete a
                    capacidade de:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✔</span>
                      <span>
                        Criar interfaces complexas com componentes reutilizáveis
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✔</span>
                      <span>
                        Trabalhar com ferramentas modernas do ecossistema
                        React/Next
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✔</span>
                      <span>
                        Garantir boas práticas de código e performance
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Footer */}
              <footer className="text-center mt-12 pt-8 border-t border-slate-700">
                <p className="mb-6">
                  Quer ver outros projetos ou conversar sobre desenvolvimento?{" "}
                  <span className="font-semibold text-green-400">
                    <a href="mailto:mauricioferg@gmail.com">Vamos conectar!</a>
                  </span>
                </p>
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
