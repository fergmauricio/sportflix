import { SportReviewModel } from "@/models/sport-review-model";
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
        profileId: string;
        sportId: string;
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
