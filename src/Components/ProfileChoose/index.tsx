"use client";

import { useProfileContext } from "@/contexts/ProfileContext";
import { ProfileModel } from "@/models/profile-model";

import clsx from "clsx";
import { ArrowLeftIcon, EditIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileAdd } from "../ProfileAdd";
import Image from "next/image";

export function ProfileChoose() {
  const { state, fetchProfiles, activeProfile } = useProfileContext();
  const [editingProfile, setEditingProfile] = useState({} as ProfileModel);
  const [isFormMode, setIsFormMode] = useState(false);
  const [isAddingProfile, setIsAddingProfile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAddingProfile) {
      fetchProfiles();
    }
  }, [isAddingProfile]);

  function handleClickProfile(profile: ProfileModel) {
    if (!isFormMode) {
      activeProfile(profile);
      router.push("/portal");
    } else {
      setIsAddingProfile(true);
      setEditingProfile(profile);
    }
  }

  function handleEditMode(profile: ProfileModel) {
    setIsAddingProfile(true);
    setEditingProfile(profile);
  }

  return (
    <>
      <div
        class="animate-fade-in opacity-0"
        className={clsx(
          "text-2xl font-medium text-green-400",
          "fixed top-1/2 left-1/2 top-10 transform ",
          "-translate-x-1/2 ",
          "-translate-y-1/2"
        )}
      >
        SPORTSFLIX
      </div>
      <div
        className={clsx(
          "w-[70vw] h-[30vw] sm:w-[60vw] fixed top-1/2",
          "left-1/2",
          "flex flex-col justify-center items-center gap-6",
          "transform ",
          "-translate-x-1/2 ",
          "-translate-y-1/2"
        )}
      >
        <div className="text-white font-bold flex justify-center items-center gap-4">
          {isAddingProfile && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsAddingProfile(false);
              }}
            >
              <ArrowLeftIcon size={42} className="mt-3 cursor-pointer" />
            </button>
          )}
          <h1 className="text-white font-bold text-4xl md:text-5xl">
            {state.savedProfiles.length > 0 &&
              !isFormMode &&
              "Escolha seu perfil"}
            {state.savedProfiles.length > 0 && isFormMode && "Gerenciar Perfil"}
            {state.savedProfiles.length === 0 && "Crie um novo perfil"}
          </h1>
        </div>
        {isAddingProfile && (
          <ProfileAdd
            callback={setIsAddingProfile}
            callback2={setIsFormMode}
            editingProfile={editingProfile}
          />
        )}
        {!isAddingProfile && state.savedProfiles.length > 0 && (
          <div className="relative w-full flex justify-center items-center pt-4">
            {state.savedProfiles.map((profile, index) => {
              return (
                <div
                  key={profile.id}
                  onClick={() => handleClickProfile(profile)}
                  className={clsx(
                    "flex flex-col justify-start items-center transition-all duration-300",
                    !isFormMode && "hover:rounded-2xl p-4",
                    !isFormMode && "hover:transform hover:scale-120 hover:z-20",
                    !isFormMode && "cursor-pointer ",
                    "w-full max-w-[150px] min-h-[250px]"
                  )}
                >
                  <div className="relative aspect-square w-[80%] flex flex-col justify-start items-center">
                    {!isFormMode && (
                      <h2 className="font-medium text-xl text-center mt-12">
                        {profile.name}
                      </h2>
                    )}

                    {isFormMode && (
                      <div className=" flex flex-col gap-2">
                        <div className="flex flex-col justify-center items-center gap-2 mt-6">
                          <button
                            onClick={() => handleEditMode(profile)}
                            className={clsx(
                              "cursor-pointer transition",
                              "flex justify-center items-center gap-2 rounded-xl",
                              "bg-slate-800/50 hover:bg-slate-900 p-2"
                            )}
                          >
                            <EditIcon />
                            Editar
                          </button>
                        </div>
                      </div>
                    )}

                    <Image
                      src={`/uploads/${profile.image}`}
                      alt={`${profile.name}`}
                      fill
                      className="object-cover self-start mt-24 "
                      sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
                      priority={index < 6}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="relative w-full flex flex-col md:flex-row gap-4 items-center justify-center">
          {!isAddingProfile && !isFormMode && (
            <div className="relative">
              <button
                onClick={() => {
                  setEditingProfile({});
                  setIsAddingProfile(true);
                }}
                className={clsx(
                  "flex",
                  state.savedProfiles.length === 0 && "w-[450px] inset-0",
                  "justify-center items-center gap-2 cursor-pointer transition",
                  "bg-blue-900/70 hover:bg-blue-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                  "text-white text-xl font-medium py-4 px-4 rounded-lg"
                )}
              >
                <PlusIcon /> Adicionar Novo
              </button>
            </div>
          )}

          {!isAddingProfile && state.savedProfiles.length > 0 && (
            <div className="relative">
              {!isFormMode && (
                <button
                  onClick={() => setIsFormMode(true)}
                  className={clsx(
                    "flex",
                    "justify-center items-center gap-2 cursor-pointer transition",
                    "bg-blue-900/70 hover:bg-blue-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                    "text-white text-xl font-medium py-4 px-4 rounded-lg"
                  )}
                >
                  <EditIcon /> Gerenciar Perfis
                </button>
              )}

              {isFormMode && (
                <button
                  onClick={() => setIsFormMode(false)}
                  className={clsx(
                    "flex",
                    "justify-center items-center gap-2 cursor-pointer transition",
                    "bg-blue-900/70 hover:bg-blue-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                    "text-white text-xl font-medium py-4 px-8 rounded-lg"
                  )}
                >
                  <ArrowLeftIcon /> Voltar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
