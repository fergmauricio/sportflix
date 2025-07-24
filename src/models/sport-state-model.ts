import { SportModel } from "./sport-model";

export type SportStateModel = {
  sports: SportModel[];
  sportsByRating: SportModel[];
  activeSport: SportModel | null;
};
