import { useProfileContext } from "@/contexts/ProfileContext";
import { ProfileModel } from "@/models/profile-model";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DefaultInput } from "../DefaultInput";
import { CheckIcon, TrashIcon } from "lucide-react";

type ProfileAddProps = {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
  callback2: React.Dispatch<React.SetStateAction<boolean>>;
  editingProfile?: ProfileModel | null;
};

export function ProfileAdd({
  callback,
  callback2,
  editingProfile,
}: ProfileAddProps) {
  const { state, fetchProfiles, addProfile, editProfile, deleteProfile } =
    useProfileContext();

  const [formData, setFormData] = useState({
    id: editingProfile?.id || "",
    name: editingProfile?.name || "",
    image: editingProfile?.image || "",
  });
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchProfiles();

    if (editingProfile) {
      setFormData({
        id: editingProfile.id,
        name: editingProfile.name,
        image: editingProfile.image,
      });
    }
  }, [editingProfile]);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.name || !formData.image) return;

    if (editingProfile?.id) {
      editProfile(formData);
    } else {
      addProfile({
        id: `profile_${Date.now()}`,
        name: formData.name,
        image: formData.image,
      });
    }

    callback(false);
    callback2(false);
  }

  function handleClickProfile(id: string, image: string): void {
    setSelectedProfileId(id === selectedProfileId ? null : id);

    setFormData((prev) => ({ ...prev, image }));
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  }

  function handleDeleteMode() {
    if (editingProfile?.id) {
      deleteProfile(formData);
    }
  }

  if (!state.initialProfiles) return <></>;

  return (
    <div
      className={clsx("w-[300px] sm:w-[400px] md:w-[500px] min-h-[600px] p-4")}
    >
      <form onSubmit={handleSaveSettings} action="" className="form">
        {state.initialProfiles.length > 0 && (
          <>
            <div className="flex w-full justify-center items-center mt-2">
              <input type="hidden" value={formData.id} />
              <input type="hidden" value={formData.image} />
              <DefaultInput
                type="text"
                id="Name"
                label="Digite um nome"
                className="w-[200px]"
                value={formData.name}
                onChange={handleNameChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 w-full justify-items-center mt-6">
              {state.initialProfiles.map((profile, index) => {
                return (
                  <div
                    key={profile.id}
                    onClick={() =>
                      handleClickProfile(profile.id, profile.image)
                    }
                    className={clsx(
                      "flex justify-center items-center transition-all duration-300",
                      "hover:bg-blue-900/70 hover:rounded-2xl p-2",
                      "hover:transform hover:scale-110 hover:z-20",
                      "hover:shadow-[0_20px_30px_rgba(0,0,0,0.5)] cursor-pointer",
                      "w-full max-w-[150px]",
                      {
                        "bg-blue-800 rounded-2xl transform scale-110 z-20 shadow-[0_20px_30px_rgba(0,0,0,0.5)]":
                          selectedProfileId === profile.id ||
                          editingProfile?.image === profile.image,
                      }
                    )}
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={`/uploads/${profile.image}`}
                        alt={`${profile.name}`}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
                        priority={index < 6}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col justify-center items-center mt-12 p-4 gap-4">
              <button
                aria-label="Salvar configurações"
                title="Salvar configurações"
                className={clsx(
                  "flex",
                  "w-full",
                  "justify-center items-center gap-2 cursor-pointer transition",
                  "bg-blue-500/30 hover:bg-slate-700/70 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                  "text-white text-2xl font-medium py-4 px-8 rounded-lg"
                )}
              >
                <CheckIcon size={30} /> Salvar Perfil
              </button>
              <button
                aria-label="Excluir perfil"
                title="Excluir perfil"
                onClick={handleDeleteMode}
                className={clsx(
                  "flex",
                  "w-full",
                  "justify-center items-center gap-2 cursor-pointer transition",
                  "bg-slate-700/30 hover:bg-slate-700/70 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                  "text-white text-2xl font-medium py-4 px-8 rounded-lg"
                )}
              >
                <TrashIcon size={30} /> Excluir perfil
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
