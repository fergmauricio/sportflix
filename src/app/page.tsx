import { MainContainer } from "@/Components/MainContainer";
import { ProfileChoose } from "@/Components/ProfileChoose";
import Providers from "@/Components/Providers";

import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Bem vindo ao Sportflix",
    description:
      "Acompanhe seus esportes favoritos, crie listas personalizadas e descubra análises exclusivas. Tudo em um único lugar!",
  };
}

export default function Home() {
  return (
    <>
      <Providers>
        <MainContainer>
          <ProfileChoose />
        </MainContainer>
      </Providers>
    </>
  );
}
