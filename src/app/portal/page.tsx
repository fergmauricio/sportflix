import { Portal } from "@/Components/Portal";
import Providers from "@/Components/Providers";
import { Validations } from "@/Components/Validations";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Sportflix - Seu portal de esportes",
    description:
      "Acompanhe seus esportes favoritos, crie listas personalizadas e descubra análises exclusivas. Tudo em um único lugar!",
  };
}

export default function PortalPage() {
  return (
    <>
      <Validations />
      <Providers>
        <Portal />
      </Providers>
    </>
  );
}
