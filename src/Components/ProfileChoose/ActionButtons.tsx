import clsx from "clsx";
import { ArrowLeft, ListIcon, PlusIcon } from "lucide-react";

interface ActionButtonsProps {
  hasProfiles: boolean;
  isFormMode: boolean;
  onAddProfile: () => void;
  onToggleEditMode: () => void;
  onExitEditMode: () => void;
}

export function ActionButtons({
  hasProfiles,
  isFormMode,
  onAddProfile,
  onToggleEditMode,
  onExitEditMode,
}: ActionButtonsProps) {
  if (!hasProfiles) {
    return (
      <button
        onClick={onAddProfile}
        className="w-full lg:max-w-[200px] justify-center items-center gap-2 cursor-pointer transition bg-slate-700/70 hover:bg-slate-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)] text-white text-xl font-medium py-4 px-4 rounded-lg"
      >
        <PlusIcon /> Adicionar
      </button>
    );
  }

  return (
    <div className="relative w-full md:w-[70%] flex flex-col sm:flex-row gap-4 px-12 items-center justify-center">
      {!isFormMode ? (
        <>
          <button
            onClick={onAddProfile}
            className={clsx(
              "w-full lg:max-w-[200px]",
              "flex justify-center items-center",
              "justify-center items-center gap-2",
              "cursor-pointer transition",
              "bg-slate-700/70 hover:bg-slate-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)]",
              "text-white text-xl font-medium py-4 px-4 rounded-lg"
            )}
          >
            <PlusIcon /> Adicionar
          </button>
          <button
            onClick={onToggleEditMode}
            className={clsx(
              "w-full lg:max-w-[200px]",
              "flex justify-center items-center",
              "justify-center items-center gap-2",
              "cursor-pointer transition",
              "bg-slate-700/70 hover:bg-slate-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)]",
              "text-white text-xl font-medium py-4 px-4 rounded-lg"
            )}
          >
            <ListIcon /> Gerenciar
          </button>
        </>
      ) : (
        <button
          onClick={onExitEditMode}
          className={clsx(
            "flex justify-center items-center gap-2",
            "cursor-pointer transition",
            "bg-slate-700/70 hover:bg-slate-700/50 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)]",
            "text-white text-xl font-medium py-4 px-8 rounded-lg"
          )}
        >
          <ArrowLeft /> Voltar
        </button>
      )}
    </div>
  );
}
