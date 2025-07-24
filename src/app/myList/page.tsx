import MyList from "@/Components/MyList";
import { ListProfileSportContextProvider } from "@/contexts/ListProfileSportContext";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { SportContextProvider } from "@/contexts/SportContext";

import { Metadata } from "next";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return {
    title: "Minha Lista Customizada",
    description: "",
  };
}

export default function MyListPage() {
  return (
    <ProfileContextProvider>
      <ListProfileSportContextProvider>
        <SportContextProvider>
          <MyList />
        </SportContextProvider>
      </ListProfileSportContextProvider>
    </ProfileContextProvider>
  );
}
