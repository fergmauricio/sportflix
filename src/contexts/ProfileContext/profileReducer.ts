import { ProfileActionModel, ProfileActionsTypes } from "./profileActions";
import { ProfileStateModel } from "@/models/profile-state-model";

export function profileReducer(
  state: ProfileStateModel,
  action: ProfileActionModel
): ProfileStateModel {
  switch (action.type) {
    case ProfileActionsTypes.ACTIVE_PROFILE: {
      const activeProfile = action?.payload || null;
      return {
        ...state,
        activeProfile,
      };
    }
    case ProfileActionsTypes.ADD_PROFILE: {
      const savedProfiles = action?.payload || null;

      return {
        ...state,
        savedProfiles: [...state.savedProfiles, savedProfiles],
      };
    }
    case ProfileActionsTypes.EDIT_PROFILE: {
      const profile = action?.payload || null;

      const editedProfiles = state.savedProfiles.map((p) => {
        console.log("p ", p.id, profile.id);
        if (p.id === profile.id) {
          console.log("entrou ", profile);
          return profile;
        }
        console.log("passou ", p);
        return p;
      });

      return {
        ...state,
        savedProfiles: editedProfiles,
      };
    }
    case ProfileActionsTypes.DELETE_PROFILE: {
      const profile = action?.payload || null;

      const editedProfiles = state.savedProfiles.filter(
        (p) => p.id !== profile.id
      );

      return {
        ...state,
        savedProfiles: editedProfiles,
      };
    }
    case ProfileActionsTypes.CLEAR_PROFILE: {
      return {
        ...state,
        activeProfile: null,
      };
    }
    case ProfileActionsTypes.INITIAL_PROFILES: {
      const profiles = action.payload;
      return {
        ...state,
        initialProfiles: profiles,
      };
    }
    case ProfileActionsTypes.SAVED_PROFILES: {
      const profiles = action.payload;
      return {
        ...state,
        savedProfiles: profiles,
      };
    }
  }

  return state;
}
