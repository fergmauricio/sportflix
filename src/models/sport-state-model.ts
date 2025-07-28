import { SportModel } from "./sport-model";

export type SportStateModel = {
  sports: SportModel[];
  sportsByRating: SportModel[];
  sportsBySearch: SportModel[];
  activeSport: SportModel | null;
};
