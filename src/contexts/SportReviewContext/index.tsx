"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SportReviewActionModel,
  SportReviewActionsTypes,
} from "./SportReviewActions";

import { sportReviewReducer } from "./SportReviewReducer";
import { SportReviewStateModel } from "@/models/sport-review-state-model";
import { SportReviewModel } from "@/models/sport-review-model";

const initialState: SportReviewStateModel = {};

type SportReviewContextProps = {
  state: SportReviewStateModel;
  dispatch: React.Dispatch<SportReviewActionModel>;
  fetchSportReviewByProfile: (profileId: string) => void;
  addSportReview: (review: {
    profileId: string;
    sportId: string;
    type: SportReviewModel["type"];
  }) => void;
};

export const SportReviewContext = createContext<SportReviewContextProps>(
  {} as SportReviewContextProps
);

type SportReviewContextProviderProps = {
  children: React.ReactNode;
};

export function SportReviewContextProvider({
  children,
}: SportReviewContextProviderProps) {
  const [state, dispatch] = useReducer(sportReviewReducer, initialState);

  useEffect(() => {
    const storageState = localStorage.getItem("activeProfile");

    if (storageState) {
      const parsedProfile = JSON.parse(storageState);

      const storageSportReview = localStorage.getItem("mySportReview");

      if (storageSportReview === null || storageSportReview === "") return;

      const parsedSportReview = JSON.parse(storageSportReview);

      dispatch({
        type: SportReviewActionsTypes.INITIAL_SPORTREVIEW,
        payload: {
          profileId: parsedProfile.id,
          sports: parsedSportReview[parsedProfile.id] || [],
        },
      });
    }
  }, []);

  const fetchSportReviewByProfile = (profileId: string) => {
    return state[profileId] || [];
  };

  const setItemStorage = (json: object) => {
    localStorage.setItem("mySportReview", JSON.stringify(json));
  };

  const addSportReview = ({
    profileId,
    sportId,
    type,
  }: {
    profileId: string;
    sportId: string;
    type: "like" | "dislike" | "fan" | null;
  }): void => {
    const storageState = localStorage.getItem("mySportReview");
    let parsedStorageState = null;

    if (storageState !== null) {
      parsedStorageState = JSON.parse(storageState) as SportReviewStateModel;

      const currentSportsByProfile = !parsedStorageState[profileId]
        ? []
        : parsedStorageState[profileId];

      if (currentSportsByProfile) {
        const sportAndTypeExists = currentSportsByProfile.some(
          (item) => item.sportId === sportId && item.type === type
        );

        const filteredSports = currentSportsByProfile.filter(
          (item) => item.sportId !== sportId
        );

        if (sportAndTypeExists) {
          // Return sem o novo esporte
          setItemStorage({
            [profileId]: [...filteredSports],
          });
        } else {
          setItemStorage({
            [profileId]: [...filteredSports, { sportId, type }],
          });
        }
      } else {
        setItemStorage({
          ...parsedStorageState,
          [profileId]: [{ sportId, type }],
        });
      }
    } else {
      setItemStorage({ [profileId]: [{ sportId, type }] });
    }

    dispatch({
      type: SportReviewActionsTypes.ADD_SPORTREVIEW,
      payload: {
        profileId,
        sportId,
        type,
      },
    });
  };

  return (
    <SportReviewContext.Provider
      value={{
        state,
        dispatch,
        fetchSportReviewByProfile,
        addSportReview,
      }}
    >
      {children}
    </SportReviewContext.Provider>
  );
}

export function useSportReviewContext() {
  return useContext(SportReviewContext);
}
