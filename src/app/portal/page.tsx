import { Portal } from "@/Components/Portal";

import { ListProfileSportContextProvider } from "@/contexts/ListProfileSportContext";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { SportContextProvider } from "@/contexts/SportContext";
import { SportReviewContextProvider } from "@/contexts/SportReviewContext";

export default function PortalPage() {
  return (
    <>
      <ProfileContextProvider>
        <ListProfileSportContextProvider>
          <SportContextProvider>
            <SportReviewContextProvider>
              <Portal />
            </SportReviewContextProvider>
          </SportContextProvider>
        </ListProfileSportContextProvider>
      </ProfileContextProvider>
    </>
  );
}
