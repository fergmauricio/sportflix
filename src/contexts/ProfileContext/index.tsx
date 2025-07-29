"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { ProfileModel } from "@/models/profile-model";
import { ProfileActionModel, ProfileActionsTypes } from "./profileActions";
import { ProfileStateModel } from "@/models/profile-state-model";
import { profileReducer } from "../ProfileContext/profileReducer";
import { initialProfileState } from "./initialProfileState";
import { SavedProfileModel } from "@/models/savedProfile-model";

type ProfileContextProps = {
  state: ProfileStateModel;
  dispatch: React.Dispatch<ProfileActionModel>;
  fetchProfiles: () => void;
  activeProfile: (profile: ProfileModel) => void;
  addProfile: (profile: ProfileModel) => void;
  editProfile: (profile: ProfileModel) => void;
  deleteProfile: (profile: ProfileModel) => void;
  clearActiveProfile: () => void;
};

export const ProfileContext = createContext<ProfileContextProps>(
  {} as ProfileContextProps
);

type ProfileContextProviderProps = {
  children: React.ReactNode;
};

export function ProfileContextProvider({
  children,
}: ProfileContextProviderProps) {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);

  useEffect(() => {
    const loadInitialData = () => {
      try {
        const profileData = localStorage.getItem("activeProfile");

        if (profileData) {
          const profile = JSON.parse(profileData);

          if (profile.id) {
            dispatch({
              type: ProfileActionsTypes.ACTIVE_PROFILE,
              payload: profile,
            });
          }
        }

        const savedProfiles = localStorage.getItem("savedProfile");

        if (savedProfiles) {
          const profiles = JSON.parse(savedProfiles);

          if (profiles) {
            dispatch({
              type: ProfileActionsTypes.SAVED_PROFILES,
              payload: profiles,
            });
          }
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, []);

  const fetchProfiles = () => {
    try {
      const profiles = [
        { id: "1", name: "Futebol Americano", image: "avatar_01.png" },
        { id: "2", name: "Golfe", image: "avatar_02.png" },
        { id: "3", name: "Boliche", image: "avatar_03.png" },
        { id: "4", name: "Sinuca", image: "avatar_04.png" },
        { id: "5", name: "Basquete", image: "avatar_05.png" },
        { id: "6", name: "Baseball", image: "avatar_06.png" },
        { id: "7", name: "Tênis", image: "avatar_07.png" },
        { id: "8", name: "Futebol", image: "avatar_08.png" },
        { id: "9", name: "Vôley", image: "avatar_09.png" },
      ];

      dispatch({
        type: ProfileActionsTypes.INITIAL_PROFILES,
        payload: profiles,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const activeProfile = (profile: ProfileModel) => {
    localStorage.removeItem("activeProfile");
    localStorage.setItem("activeProfile", JSON.stringify(profile));

    dispatch({ type: ProfileActionsTypes.ACTIVE_PROFILE, payload: profile });
  };

  const editProfile = (profile: ProfileModel) => {
    const profileData = localStorage.getItem("savedProfile");

    if (profileData) {
      const profileParsed = Object.values(
        JSON.parse(profileData)
      ) as SavedProfileModel[];

      const editedProfile = profileParsed.map((p) => {
        if (p.id === profile.id) {
          return profile;
        }

        return p;
      });

      const newProfiles = editedProfile;

      localStorage.setItem("savedProfile", "");
      localStorage.setItem("savedProfile", JSON.stringify(newProfiles));
    } else {
      localStorage.setItem("savedProfile", JSON.stringify([profile]));
    }

    dispatch({ type: ProfileActionsTypes.EDIT_PROFILE, payload: profile });
  };

  const deleteProfile = (profile: ProfileModel) => {
    const profileData = localStorage.getItem("savedProfile");

    if (profileData) {
      const profileParsed = Object.values(
        JSON.parse(profileData)
      ) as SavedProfileModel[];

      console.log("parsed ", profileParsed);
      const editedProfile = profileParsed.filter((p) => p.id !== profile.id);
      console.log("edited ", editedProfile);

      localStorage.setItem("savedProfile", "");
      localStorage.setItem("savedProfile", JSON.stringify(editedProfile));
    }

    dispatch({ type: ProfileActionsTypes.DELETE_PROFILE, payload: profile });
  };

  const addProfile = (profile: ProfileModel) => {
    const profileData = localStorage.getItem("savedProfile");

    if (profileData) {
      const profileParsed = Object.values(JSON.parse(profileData));

      const newProfiles = [...profileParsed, profile];

      localStorage.setItem("savedProfile", "");
      localStorage.setItem("savedProfile", JSON.stringify(newProfiles));
    } else {
      localStorage.setItem("savedProfile", JSON.stringify([profile]));
    }

    dispatch({ type: ProfileActionsTypes.ADD_PROFILE, payload: profile });
  };

  const clearActiveProfile = () => {
    localStorage.setItem("activeProfile", "");
    dispatch({ type: ProfileActionsTypes.CLEAR_PROFILE });
  };

  return (
    <ProfileContext.Provider
      value={{
        state,
        dispatch,
        fetchProfiles,
        activeProfile,
        addProfile,
        editProfile,
        deleteProfile,
        clearActiveProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}
