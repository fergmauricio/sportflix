import LegalTerm from "@/Components/LegalTerm";
import Providers from "@/Components/Providers";
import { Validations } from "@/Components/Validations";

import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Sportflix - Termos Legais",
    description: "Entenda melhor os termos legais do Sportflix",
  };
}

export default function LegalTermPage() {
  return (
    <>
      <Validations />
      <Providers>
        <LegalTerm />
      </Providers>
    </>
  );
}
