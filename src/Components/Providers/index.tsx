import { ListProfileSportContextProvider } from "@/contexts/ListProfileSportContext";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { SportContextProvider } from "@/contexts/SportContext";
import { SportReviewContextProvider } from "@/contexts/SportReviewContext";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ProfileContextProvider>
        <ListProfileSportContextProvider>
          <SportContextProvider>
            <SportReviewContextProvider>{children}</SportReviewContextProvider>
          </SportContextProvider>
        </ListProfileSportContextProvider>
      </ProfileContextProvider>
    </>
  );
}
