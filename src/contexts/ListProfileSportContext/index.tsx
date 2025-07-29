"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

import {
  ProfileSportActionModel,
  ProfileSportActionsTypes,
} from "./listProfileSportActions";
import { ProfileSportStateModel } from "@/models/profile-sport-state-model";

import { listProfileSportReducer } from "./listProfileSportReducer";
import { SportModel } from "@/models/sport-model";

const initialState: ProfileSportStateModel = {};

type ProfileSportContextProps = {
  state: ProfileSportStateModel;
  dispatch: React.Dispatch<ProfileSportActionModel>;
  fetchSportsByProfile: (id: string) => void;
  addProfileSport: (id: string, sport: SportModel) => void;
  removeProfileSport: (id: string, sport: string) => void;
};

export const ListProfileSportContext = createContext<ProfileSportContextProps>(
  {} as ProfileSportContextProps
);

type ListProfileSportContextProviderProps = {
  children: React.ReactNode;
};

export function ListProfileSportContextProvider({
  children,
}: ListProfileSportContextProviderProps) {
  const [state, dispatch] = useReducer(listProfileSportReducer, initialState);

  useEffect(() => {
    const storageState = localStorage.getItem("activeProfile");

    if (storageState) {
      const parsedProfile = JSON.parse(storageState);

      const storageListProfile = localStorage.getItem("myCustomListProfile");

      if (storageListProfile === null || storageListProfile === "") return;

      const parsedListProfile = JSON.parse(storageListProfile);

      dispatch({
        type: ProfileSportActionsTypes.INITIAL_CUSTOMLIST,
        payload: {
          profileId: parsedProfile.id,
          sports: parsedListProfile[parsedProfile.id],
        },
      });
    }
  }, []);

  const removeProfileSport = (id: string, sportId: string) => {
    const storageState = localStorage.getItem("myCustomListProfile");

    if (storageState !== null) {
      const parsedStorageState = JSON.parse(
        storageState
      ) as ProfileSportStateModel;

      const currentSports = parsedStorageState[id].filter(
        (s) => s.id !== sportId
      );

      setItemStorage({
        ...parsedStorageState,
        [id]: [...currentSports],
      });
    }

    dispatch({
      type: ProfileSportActionsTypes.CLEAR_CUSTOMLIST,
      payload: { profileId: id, sportId },
    });
  };

  const fetchSportsByProfile = (id: string) => {
    return state[id] || [];
  };

  const setItemStorage = (json: object) => {
    localStorage.setItem("myCustomListProfile", JSON.stringify(json));
  };

  const addProfileSport = (id: string, sport: SportModel): void => {
    const storageState = localStorage.getItem("myCustomListProfile");
    let parsedStorageState = null;

    if (storageState !== null) {
      parsedStorageState = JSON.parse(storageState) as ProfileSportStateModel;

      const currentSports = !parsedStorageState[id]
        ? []
        : parsedStorageState[id];

      if (currentSports) {
        const sportAlreadyExists = currentSports.some((s) => s.id === sport.id);

        if (sportAlreadyExists) return;

        setItemStorage({
          ...parsedStorageState,
          [id]: [...currentSports, sport],
        });
      } else {
        setItemStorage({
          ...parsedStorageState,
          [id]: [sport],
        });
      }
    } else {
      setItemStorage({ [id]: [sport] });

      return;
    }

    dispatch({
      type: ProfileSportActionsTypes.ADD_CUSTOMLIST,
      payload: {
        profileId: id,
        sport,
      },
    });
  };

  return (
    <ListProfileSportContext.Provider
      value={{
        state,
        dispatch,
        fetchSportsByProfile,
        addProfileSport,
        removeProfileSport,
      }}
    >
      {children}
    </ListProfileSportContext.Provider>
  );
}

export function useProfileSportContext() {
  return useContext(ListProfileSportContext);
}
