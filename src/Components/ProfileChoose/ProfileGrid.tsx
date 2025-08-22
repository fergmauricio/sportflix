import { ProfileModel } from "@/models/profile-model";
import { ProfileCard } from "./ProfileCard";

interface ProfileGridProps {
  profiles: ProfileModel[];
  isFormMode: boolean;
  onProfileSelect: (profile: ProfileModel) => void;
  onProfileEdit: (profile: ProfileModel) => void;
}

export function ProfileGrid({ 
  profiles, 
  isFormMode, 
  onProfileSelect, 
  onProfileEdit 
}: ProfileGridProps) {
  return (
    <div className="relative w-full flex justify-center items-center pt-4">
      <div className="flex flex-wrap justify-center item-center p-4 w-full sm:w-[60%]">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            isFormMode={isFormMode}
            priority={index < 3}
            onSelect={onProfileSelect}
            onEdit={onProfileEdit}
          />
        ))}
      </div>
    </div>
  );
}