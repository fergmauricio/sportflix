import About from "@/Components/About";
import Providers from "@/Components/Providers";
import { Validations } from "@/Components/Validations";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Sportflix - Sobre o portal",
    description: "Saiba tudo sobre o portal Sportflix",
  };
}

export default function AboutPage() {
  return (
    <>
      <Validations />
      <Providers>
        <About />
      </Providers>
    </>
  );
}
