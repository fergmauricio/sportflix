import { ProfileModel } from "@/models/profile-model";
import { ProfileImage } from "./ProfileImage";
import { EditIcon } from "lucide-react";

interface ProfileCardProps {
  profile: ProfileModel;
  isFormMode: boolean;
  priority: boolean;
  onSelect: (profile: ProfileModel) => void;
  onEdit: (profile: ProfileModel) => void;
}

export function ProfileCard({
  profile,
  isFormMode,
  priority,
  onSelect,
  onEdit,
}: ProfileCardProps) {
  return (
    <div
      onClick={() => onSelect(profile)}
      className={`flex flex-col items-center transition-all duration-300 ${
        !isFormMode
          ? "hover:rounded-2xl p-2 hover:p-1 hover:transform hover:scale-105 hover:z-20 cursor-pointer"
          : ""
      } w-[calc(50%-16px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)] xl:w-[calc(16.666%-16px)]`}
    >
      <div className="relative aspect-square w-full flex flex-col items-center">
        {!isFormMode && (
          <h2 className="font-medium text-sm sm:text-base w-full text-center mt-2 sm:mt-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {profile.name}
          </h2>
        )}

        {isFormMode && (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-center gap-2 mt-2 sm:mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(profile);
                }}
                className="cursor-pointer transition flex justify-center items-center gap-2 rounded-xl bg-slate-800/50 hover:bg-slate-900 p-2 text-xs sm:text-sm"
              >
                <EditIcon /> Editar
              </button>
            </div>
          </div>
        )}

        <div className="w-full mt-2 sm:mt-4 flex justify-center">
          <ProfileImage
            src={`/${profile.image}`}
            alt={profile.name}
            size={120}
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}
