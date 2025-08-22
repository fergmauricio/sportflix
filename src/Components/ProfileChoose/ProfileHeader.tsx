interface ProfileHeaderProps {
  isFormMode: boolean;
  hasProfiles: boolean;
}

export function ProfileHeader({ isFormMode, hasProfiles }: ProfileHeaderProps) {
  const getTitle = () => {
    if (hasProfiles && !isFormMode) return "Escolha seu perfil";
    if (hasProfiles && isFormMode) return "Gerenciar Perfil";
    return "Crie um novo perfil";
  };

  return (
    <>
      <img
        src="/logo.png"
        alt="Sportflix"
        width={157}
        height={40}
        className="mt-8 transition hover:transform hover:scale-[1.2]"
      />
      <h1 className="text-white font-bold text-xl sm:text-2xl md:text-4xl">
        {getTitle()}
      </h1>
    </>
  );
}