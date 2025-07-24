import { Instagram, Linkedin } from "lucide-react";

function handleSocial(type: string) {}

export function Footer() {
  return (
    <footer>
      <div className="w-full h-20 flex pt-60 justify-center items-center gap-12 text-slate-400">
        <div className="flex gap-6 text-slate-200">
          <button
            className="cursor-pointer hover:scale-130 transition"
            onClick={() => handleSocial("instagram")}
          >
            <Instagram />
          </button>
          <button
            className="cursor-pointer hover:scale-130 transition"
            onClick={() => handleSocial("linkedin")}
          >
            <Linkedin />
          </button>
        </div>
        <div className="flex gap-1 font-medium ml-16">
          <div className="flex flex-col">
            <h2>Sobre</h2>
            <h2>Termos de uso</h2>
          </div>
          <div className="flex flex-col ml-16">
            <h2>Privacidade</h2>
            <h2>Entre em contato</h2>
          </div>
        </div>
      </div>
      <div className="w-full h-60 flex justify-center items-center gap-12 text-slate-500 font-medium">
        &copy; SPORTFLIX {new Date().getFullYear()} - Todos direitos reservados
      </div>
    </footer>
  );
}
