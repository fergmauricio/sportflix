"use client";

import { useProfileContext } from "@/contexts/ProfileContext";
import { ProfileModel } from "@/models/profile-model";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileAdd } from "../ProfileAdd";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileGrid } from "./ProfileGrid";
import { ActionButtons } from "./ActionButtons";

export function ProfileChoose() {
  const { state, fetchProfiles, activeProfile } = useProfileContext();
  const [editingProfile, setEditingProfile] = useState<ProfileModel | null>(null);
  const [isFormMode, setIsFormMode] = useState(false);
  const [isAddingProfile, setIsAddingProfile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAddingProfile) {
      fetchProfiles();
    }
  }, [isAddingProfile, fetchProfiles]);

  const handleProfileSelect = (profile: ProfileModel) => {
    if (!isFormMode) {
      activeProfile(profile);
      router.push("/portal");
    } else {
      setIsAddingProfile(true);
      setEditingProfile(profile);
    }
  };

  const handleEditProfile = (profile: ProfileModel) => {
    setIsAddingProfile(true);
    setEditingProfile(profile);
  };

  const handleAddNewProfile = () => {
    setEditingProfile({ id: "", name: "", image: "" });
    setIsAddingProfile(true);
  };

  const closeProfileForm = () => {
    setIsAddingProfile(false);
    setEditingProfile(null);
  };

  if (isAddingProfile && editingProfile) {
    return (
      <div
        className={clsx(
          "relative pt-6 pb-8 sm:pt-0 sm:pb-0 sm:h-screen",
          "flex flex-col justify-center items-center gap-6"
        )}
      >
      <ProfileAdd
        callback={closeProfileForm}
        callback2={setIsFormMode}
        editingProfile={editingProfile}
      />
      </div>
    );
  }

  return (
    <div className={clsx(
      "relative pt-6 pb-8 sm:pt-0 sm:pb-0 sm:h-screen",
      "flex flex-col justify-center items-center gap-6"
    )}>
      <ProfileHeader 
        isFormMode={isFormMode}
        hasProfiles={state.savedProfiles.length > 0}
      />
      
      {state.savedProfiles.length > 0 && (
        <ProfileGrid
          profiles={state.savedProfiles}
          isFormMode={isFormMode}
          onProfileSelect={handleProfileSelect}
          onProfileEdit={handleEditProfile}
        />
      )}

      <ActionButtons
        hasProfiles={state.savedProfiles.length > 0}
        isFormMode={isFormMode}
        onAddProfile={handleAddNewProfile}
        onToggleEditMode={() => setIsFormMode(!isFormMode)}
        onExitEditMode={() => setIsFormMode(false)}
      />
    </div>
  );
}