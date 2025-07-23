import { SportModel } from "./sport-model";

export type SportStateModel = {
  sports: SportModel[];
  activeSport: SportModel | null;
};
