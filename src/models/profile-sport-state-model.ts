import { ProfileModel } from "./profile-model";
import { SportModel } from "./sport-model";

export type ProfileSportStateModel = {
  [profileId: ProfileModel["id"]]: SportModel[];
};
