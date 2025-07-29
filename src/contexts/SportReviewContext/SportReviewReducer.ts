import {
  SportReviewActionsTypes,
  SportReviewActionModel,
} from "./SportReviewActions";
import { SportReviewStateModel } from "@/models/sport-review-state-model";

const initialState: SportReviewStateModel = {};

export function sportReviewReducer(
  state: SportReviewStateModel = initialState,
  action: SportReviewActionModel
): SportReviewStateModel {
  switch (action.type) {
    case SportReviewActionsTypes.INITIAL_SPORTREVIEW: {
      const { profileId, sports } = action.payload;

      return {
        ...state,
        [profileId]: sports,
      };
    }

    case SportReviewActionsTypes.ADD_SPORTREVIEW: {
      const { profileId, sportId, type } = action.payload;
      const currentSportsByProfile = state[profileId] || [];

      const filteredSports = currentSportsByProfile.filter(
        (item) => item.sportId !== sportId
      );

      const sportAndTypeExists = currentSportsByProfile.some(
        (item) => item.sportId === sportId && item.type === type
      );

      if (sportAndTypeExists) {
        return {
          ...state,
          [profileId]: [...filteredSports],
        };
      }

      return {
        ...state,
        [profileId]: [...filteredSports, { sportId, type }],
      };
    }

    default:
      return state;
  }

  return state;
}
