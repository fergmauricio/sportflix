import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="relative w-full h-20 flex flex-col pt-60 justify-center items-center gap-12 text-slate-400">
        <div className="flex gap-6 text-teal-300">
          <a
            className="cursor-pointer hover:scale-130 transition"
            target="_blank"
            href={"https://github.com/fergMauricio"}
          >
            <Github />
          </a>
          <a
            className="cursor-pointer hover:scale-130 transition"
            target="_blank"
            href={"https://instagram.com/mauricioferg81"}
          >
            <Instagram />
          </a>

          <a
            className="cursor-pointer hover:scale-130 transition"
            target="_blank"
            href={"https://www.linkedin.com/in/maur%C3%ADcio-ferg-117aa090"}
          >
            <Linkedin />
          </a>
        </div>
        <div className="flex gap-6 font-medium cursor-pointer">
          <Link href={"/legalterm"}>Termos de uso e Privacidade</Link>
          <a href="mailto:mauricioferg@gmail.com">Entre em contato</a>
        </div>
      </div>
      <div className="w-full h-60 flex justify-center items-center gap-12 text-slate-500 font-medium">
        &copy; SPORTFLIX {new Date().getFullYear()} - Todos direitos reservados
      </div>
    </footer>
  );
}
