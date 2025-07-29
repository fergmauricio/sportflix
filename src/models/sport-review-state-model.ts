import { SportReviewModel } from "./sport-review-model";

export type SportReviewStateModel = {
  [profileId: string]: Array<{
    sportId: string;
    type: SportReviewModel["type"];
  }>;
};
