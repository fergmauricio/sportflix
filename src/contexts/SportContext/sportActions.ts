import { SportModel } from "@/models/sport-model";

export enum SportActionsTypes {
  INITIAL_SPORTS = "INITIAL_SPORTS",
  ACTIVE_SPORT = "ACTIVE_SPORT",
  CLEAR_SPORT = "CLEAR_SPORT",
}

export type SportActionModel =
  | {
      type: SportActionsTypes.ACTIVE_SPORT;
      payload?: SportModel;
    }
  | {
      type: SportActionsTypes.INITIAL_SPORTS;
      payload: SportModel[];
    }
  | {
      type: SportActionsTypes.CLEAR_SPORT;
    };
