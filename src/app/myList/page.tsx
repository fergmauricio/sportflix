import SportsList from "@/Components/SportsList";

import Providers from "@/Components/Providers";
import { Validations } from "@/Components/Validations";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Sportflix - Minha lista",
    description: "Listamos os esportes que você marcou como favoritos",
  };
}

export default function MyListPage() {
  return (
    <>
      <Validations />
      <Providers>
        <SportsList type="mylist" />
      </Providers>
    </>
  );
}
