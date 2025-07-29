import { ProfileModel } from "@/models/profile-model";
import { SportModel } from "@/models/sport-model";

export enum ProfileSportActionsTypes {
  INITIAL_CUSTOMLIST = "INITIAL_CUSTOMLIST",
  ADD_CUSTOMLIST = "ADD_CUSTOMLIST",
  CLEAR_CUSTOMLIST = "CLEAR_CUSTOMLIST",
}

export type ProfileSportActionModel =
  | {
      type: ProfileSportActionsTypes.ADD_CUSTOMLIST;
      payload: {
        profileId: ProfileModel["id"] & string;
        sport: SportModel;
      };
    }
  | {
      type: ProfileSportActionsTypes.INITIAL_CUSTOMLIST;
      payload: { profileId: string; sports: SportModel[] };
    }
  | {
      type: ProfileSportActionsTypes.CLEAR_CUSTOMLIST;
      payload: {
        profileId: ProfileModel["id"] & string;
        sportId: SportModel["id"];
      };
    };
