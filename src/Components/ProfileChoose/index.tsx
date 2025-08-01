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
        className={clsx(
          //"w-[70vw] h-full sm:w-[60vw] fixed top-1/2",
          //"left-1/2",
          "relative pt-6 pb-8 sm:pt-0 sm:pb-0 sm:h-screen",
          "flex flex-col justify-center items-center gap-6"
          //"transform ",
          //"-translate-x-1/2 ",
          //"-translate-y-1/2"
        )}
      >
        <div
          className={clsx(
            "text-2xl font-medium text-green-400"
            //"fixed top-1/2 left-1/2 top-10 transform ",
            //"-translate-x-1/2 ",
            //"-translate-y-1/2"
          )}
        >
          <Image
            id="logo"
            src={`/logo.png`}
            alt="Sportflix"
            width={157}
            height={40}
            className="mt-8 transition hover:transform hover:scale-[1.2]"
          />
        </div>
        <div className="text-white font-bold flex justify-center items-center gap-4 mt-12">
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
          <h1 className="text-white font-bold text-xl sm:text-2xl md:text-4xl">
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
            <div className="flex flex-wrap justify-center item-center p-4 w-full sm:w-[60%]">
              {state.savedProfiles.map((profile, index) => (
                <div
                  key={profile.id}
                  onClick={() => handleClickProfile(profile)}
                  className={clsx(
                    "flex flex-col items-center transition-all duration-300",
                    !isFormMode && "hover:rounded-2xl p-2 hover:p-1",
                    !isFormMode && "hover:transform hover:scale-105 hover:z-20",
                    !isFormMode && "cursor-pointer",
                    "w-[calc(50%-16px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)] xl:w-[calc(16.666%-16px)]"
                  )}
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
                              handleEditMode(profile);
                            }}
                            className={clsx(
                              "cursor-pointer transition",
                              "flex justify-center items-center gap-2 rounded-xl",
                              "bg-slate-800/50 hover:bg-slate-900 p-2 text-xs sm:text-sm"
                            )}
                          >
                            <EditIcon />
                            Editar
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="w-full mt-2 sm:mt-4 flex justify-center">
                      <Image
                        src={`/${profile.image}`}
                        alt={`${profile.name}`}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover aspect-square"
                        priority={index < 3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative w-full md:w-[70%] flex flex-col sm:flex-row gap-4 px-12 items-center justify-center">
          {!isAddingProfile && !isFormMode && (
            <button
              onClick={() => {
                setEditingProfile({
                  id: "",
                  name: "",
                  image: "",
                });
                setIsAddingProfile(true);
              }}
              className={clsx(
                "flex",
                state.savedProfiles.length === 0 && "w-[450px] inset-0",
                "w-full lg:max-w-[200px]  justify-center items-center gap-2 cursor-pointer transition",
                "bg-slate-700/70 hover:bg-slate-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                "text-white text-xl font-medium py-4 px-4 rounded-lg"
              )}
            >
              <PlusIcon /> Adicionar
            </button>
          )}

          {!isAddingProfile && state.savedProfiles.length > 0 && (
            <>
              {!isFormMode && (
                <button
                  onClick={() => setIsFormMode(true)}
                  className={clsx(
                    "flex",
                    "w-full lg:max-w-[200px]  justify-center items-center gap-2 cursor-pointer transition",
                    "bg-slate-700/70 hover:bg-slate-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                    "text-white text-xl font-medium py-4 px-4 rounded-lg"
                  )}
                >
                  <EditIcon /> Gerenciar
                </button>
              )}

              {isFormMode && (
                <button
                  onClick={() => setIsFormMode(false)}
                  className={clsx(
                    "flex",
                    "justify-center items-center gap-2 cursor-pointer transition",
                    "bg-slate-700/70 hover:bg-slate-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] ",
                    "text-white text-xl font-medium py-4 px-8 rounded-lg"
                  )}
                >
                  <ArrowLeftIcon /> Voltar
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
