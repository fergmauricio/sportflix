import { ProfileModel } from "@/models/profile-model";
import { SportReviewModel } from "@/models/sport-review-model";
import { SportModel } from "@/models/sport-model";
import { SportReviewStateModel } from "@/models/sport-review-state-model";

export enum SportReviewActionsTypes {
  INITIAL_SPORTREVIEW = "INITIAL_SPORTREVIEW",
  ADD_SPORTREVIEW = "ADD_SPORTREVIEW",
  EDIT_SPORTREVIEW = "EDIT_SPORTREVIEW",
  CLEAR_SPORTREVIEW = "CLEAR_SPORTREVIEW",
}

export type SportReviewActionModel =
  | {
      type: SportReviewActionsTypes.ADD_SPORTREVIEW;
      payload: {
        profileId: SportReviewStateModel["profileId"] & string;
        sportId: SportReviewStateModel["sportId"] & string;
        type: SportReviewModel["type"];
      };
    }
  | {
      type: SportReviewActionsTypes.INITIAL_SPORTREVIEW;
      payload: {
        profileId: SportReviewStateModel["profileId"] & string;
        sports: SportReviewStateModel["sportId"] & string;
      };
    };
