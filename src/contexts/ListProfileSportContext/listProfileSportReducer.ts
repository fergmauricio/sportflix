import { ProfileSportStateModel } from "@/models/profile-sport-state-model";

import {
  ProfileSportActionModel,
  ProfileSportActionsTypes,
} from "./listProfileSportActions";

const initialState: ProfileSportStateModel = {};

export function listProfileSportReducer(
  state: ProfileSportStateModel = initialState,
  action: ProfileSportActionModel
): ProfileSportStateModel {
  switch (action.type) {
    case ProfileSportActionsTypes.INITIAL_CUSTOMLIST: {
      const { profileId, sports } = action.payload;

      return {
        ...state,
        [profileId]: sports || [],
      };
    }

    case ProfileSportActionsTypes.ADD_CUSTOMLIST: {
      const { profileId, sport } = action.payload;
      const currentSports = state[profileId] || [];

      const sportAlreadyExists = currentSports.some((s) => s.id === sport.id);

      if (sportAlreadyExists) return state;

      return {
        ...state,
        [profileId]: [...currentSports, sport],
      };
    }
    case ProfileSportActionsTypes.CLEAR_CUSTOMLIST: {
      const { profileId, sportId } = action.payload;
      const currentSports = state[profileId] || [];

      return {
        ...state,
        [profileId]: [...currentSports.filter((s) => s.id !== sportId)],
      };
    }

    default:
      return state;
  }

  return state;
}
