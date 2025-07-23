import { ProfileChoose } from "@/Components/ProfileChoose";
import { ListProfileSportContextProvider } from "@/contexts/ListProfileSportContext";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { SportContextProvider } from "@/contexts/SportContext";

export default function Home() {
  return (
    <>
      <ProfileContextProvider>
        <ListProfileSportContextProvider>
          <SportContextProvider>
            <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 text-white">
              <ProfileChoose />
            </div>
          </SportContextProvider>
        </ListProfileSportContextProvider>
      </ProfileContextProvider>
    </>
  );
}
