import { ProfileModel } from "@/models/profile-model";

export enum ProfileActionsTypes {
  INITIAL_PROFILES = "INITIAL_PROFILES",
  SAVED_PROFILES = "SAVED_PROFILES",
  ACTIVE_PROFILE = "ACTIVE_PROFILE",
  CLEAR_PROFILE = "CLEAR_PROFILE",
  ADD_PROFILE = "ADD_PROFILE",
  EDIT_PROFILE = "EDIT_PROFILE",
  DELETE_PROFILE = "DELETE_PROFILE",
}

export type ProfileActionModel =
  | {
      type: ProfileActionsTypes.ACTIVE_PROFILE;
      payload?: ProfileModel;
    }
  | {
      type: ProfileActionsTypes.INITIAL_PROFILES;
      payload: ProfileModel[];
    }
  | {
      type: ProfileActionsTypes.SAVED_PROFILES;
      payload: ProfileModel[];
    }
  | {
      type: ProfileActionsTypes.CLEAR_PROFILE;
      payload: ProfileModel;
    }
  | {
      type: ProfileActionsTypes.ADD_PROFILE;
      payload: ProfileModel;
    }
  | {
      type: ProfileActionsTypes.EDIT_PROFILE;
      payload: ProfileModel;
    }
  | {
      type: ProfileActionsTypes.DELETE_PROFILE;
      payload: ProfileModel;
    };
