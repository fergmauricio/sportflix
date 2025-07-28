"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { initialSportState } from "./initialSportState";

import { sportReducer } from "./sportReducer";
import { SportActionModel, SportActionsTypes } from "./sportActions";
//import { loadBeep } from "../../utils/loadBeep";
import { SportStateModel } from "@/models/sport-state-model";
import { SportRepository } from "@/repositories/sport-repository";
import { JsonSportRepository } from "@/repositories/json-sport-repository";
import { SportModel } from "@/models/sport-model";

type SportContextProps = {
  state: SportStateModel;
  dispatch: React.Dispatch<SportActionModel>;
  fetchSports: () => Promise<void>;
  fetchSportsByRating: () => Promise<void>;
  fetchSportsBySearch: (stringSearch: string) => Promise<void>;
  activeSport: (sport: SportModel) => void;
  clearActiveSport: () => void;
};

export const SportContext = createContext<SportContextProps>(
  {} as SportContextProps
);

type SportContextProviderProps = {
  children: React.ReactNode;
};

export function SportContextProvider({ children }: SportContextProviderProps) {
  const [state, dispatch] = useReducer(sportReducer, initialSportState);

  useEffect(() => {
    //fetchSports();
    fetchSportsByRating();
  }, []);

  const fetchSports = async () => {
    try {
      const sportRepository: SportRepository = new JsonSportRepository();
      const sports = await sportRepository.findAllPublic();

      dispatch({ type: SportActionsTypes.INITIAL_SPORTS, payload: sports });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSportsByRating = async () => {
    try {
      const sportRepository: SportRepository = new JsonSportRepository();
      const sports = await sportRepository.findAllPublicByRating();

      dispatch({
        type: SportActionsTypes.INITIAL_SPORTS_RATING,
        payload: sports,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSportsBySearch = async (stringSearch: string) => {
    try {
      if (stringSearch === "" || stringSearch.trim().length < 3) return;

      const sportRepository: SportRepository = new JsonSportRepository();
      const sports = await sportRepository.findAllPublicBySearch(
        stringSearch.trim()
      );

      dispatch({
        type: SportActionsTypes.INITIAL_SPORTS_SEARCH,
        payload: sports,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const activeSport = (sport: SportModel) => {
    dispatch({ type: SportActionsTypes.ACTIVE_SPORT, payload: sport });
  };

  const clearActiveSport = () => {
    dispatch({ type: SportActionsTypes.CLEAR_SPORT });
  };

  return (
    <SportContext.Provider
      value={{
        state,
        dispatch,
        fetchSports,
        fetchSportsByRating,
        fetchSportsBySearch,
        activeSport,
        clearActiveSport,
      }}
    >
      {children}
    </SportContext.Provider>
  );
}

export function useSportContext() {
  return useContext(SportContext);
}
