import About from "@/Components/About";
import LegalTerm from "@/Components/LegalTerm";
import { ListProfileSportContextProvider } from "@/contexts/ListProfileSportContext";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { SportContextProvider } from "@/contexts/SportContext";

import { Metadata } from "next";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return {
    title: "SPORTFLIX | Termos Legais",
    description: "",
  };
}

export default function LegalTermPage() {
  return (
    <>
      <ProfileContextProvider>
        <ListProfileSportContextProvider>
          <SportContextProvider>
            <LegalTerm />
          </SportContextProvider>
        </ListProfileSportContextProvider>
      </ProfileContextProvider>
    </>
  );
}
