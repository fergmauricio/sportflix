import { ProfileModel } from "./profile-model";
import { SportReviewModel } from "./sport-review-model";

export type SportReviewStateModel = {
  [profileId: ProfileModel["id"]]: [
    { sportId: string; type: SportReviewModel["type"] }
  ];
};
