import SportsList from "@/Components/SportsList";
import Providers from "@/Components/Providers";
import { Validations } from "@/Components/Validations";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Sportflix - Lista de esportes",
    description: "Listamos aqui todo nosso catálogo de esportes",
  };
}

export default function MyListPage() {
  return (
    <>
      <Validations />
      <Providers>
        <SportsList type={"sportslist"} />
      </Providers>
    </>
  );
}
