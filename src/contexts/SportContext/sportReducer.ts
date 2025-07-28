import { SportActionModel, SportActionsTypes } from "./sportActions";
import { SportStateModel } from "@/models/sport-state-model";

export function sportReducer(
  state: SportStateModel,
  action: SportActionModel
): SportStateModel {
  switch (action.type) {
    case SportActionsTypes.ACTIVE_SPORT: {
      const activeSport = action?.payload || null;
      return {
        ...state,
        activeSport,
      };
    }
    case SportActionsTypes.CLEAR_SPORT: {
      return {
        ...state,
        activeSport: null,
      };
    }
    case SportActionsTypes.INITIAL_SPORTS: {
      const sports = action.payload;
      return {
        ...state,
        sports,
      };
    }
    case SportActionsTypes.INITIAL_SPORTS_RATING: {
      const sports = action.payload;
      return {
        ...state,
        sportsByRating: sports,
      };
    }
    case SportActionsTypes.INITIAL_SPORTS_SEARCH: {
      const sports = action.payload;

      return {
        ...state,
        sportsBySearch: sports,
      };
    }
  }

  return state;
}
