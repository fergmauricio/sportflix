import { ProfileModel } from "./profile-model";

export type ProfileStateModel = {
  initialProfiles: ProfileModel[];
  savedProfiles: ProfileModel[];
  activeProfile: ProfileModel | null;
};
