import { Github, Instagram, Linkedin } from "lucide-react";

function handleSocial(type: string) {}

export function Footer() {
  return (
    <footer>
      <div
        className="absolute inset-0 
          before:content-[''] before:absolute before:inset-0
          before:bg-gradient-to-t before:from-black/90 before:to-transparent
          before:-z-10"
      />
      <div className="relative w-full h-20 flex flex-col pt-60 justify-center items-center gap-12 text-slate-400">
        <div className="flex gap-6 text-green-400">
          <button
            className="cursor-pointer hover:scale-130 transition"
            onClick={() => handleSocial("github")}
          >
            <Github />
          </button>
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
        <div className="flex gap-6 font-medium">
          <h2>Sobre</h2>
          <h2>Termos de uso</h2>

          <h2>Privacidade</h2>
          <h2>Entre em contato</h2>
        </div>
      </div>
      <div className="w-full h-60 flex justify-center items-center gap-12 text-slate-500 font-medium">
        &copy; SPORTFLIX {new Date().getFullYear()} - Todos direitos reservados
      </div>
    </footer>
  );
}
