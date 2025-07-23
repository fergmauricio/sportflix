"use client";

import { useProfileContext } from "@/contexts/ProfileContext";
import clsx from "clsx";
import { CircleChevronDown, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Menu() {
  const { state, clearActiveProfile } = useProfileContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  const menuToggle = clsx(
    "sm:opacity-0 sm:pointer-events-none visible",
    "flex",
    "ml-auto mr-4",
    "b-none",
    "text-white",
    "text-[1.5rem]",
    "relative",
    "r-auto",
    "!order-2",
    "mx-auto"
  );

  const profileToggle = clsx(
    "flex justify-center items-center gap-2 cursor-pointer p-2 transition",
    "hover:bg-slate-950 hover:rounded-lg",
    "ml-auto mr-4",
    "b-none",
    "text-white",
    "text-[1.5rem]",
    "relative",
    "r-auto",
    "!order-2",
    "mx-auto"
  );

  const liClassName = (): string => {
    return clsx("no-underline text-white mx-4", isMobile && "py-3 px-4 ");
  };

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleProfiles() {
    clearActiveProfile();

    router.push("/");
  }

  const links = [
    { href: "#", label: "Início" },
    { href: "#", label: "Esportes" },
    { href: "#", label: "Minha Lista" },
  ];

  return (
    <header className="fixed top-0 w-full flex bg-transparent z-10 h-22 justify-between items-center">
      <div
        className="absolute inset-0 
          before:content-[''] before:absolute before:inset-0
          before:bg-gradient-to-b before:from-black/90 before:to-transparent
          before:-z-10"
      />
      <div className="w-full flex items-center px-6">
        <div className="text-2xl text-red-500">SPORTSFLIX</div>
        <button className={menuToggle} onClick={handleToggleMenu}>
          <MenuIcon />
        </button>
        <div className={profileToggle}>
          {state.activeProfile && (
            <>
              <Image
                id={state.activeProfile.id}
                src={`/uploads/${state.activeProfile.image}`}
                alt={state.activeProfile.name || ""}
                width={40}
                height={40}
                priority={true}
                onClick={handleProfiles}
              />
              <CircleChevronDown />
            </>
          )}
        </div>
        <nav
          className={clsx(
            "sm:flex sm:flex-grow-10 z-20 px-4",

            isMobile && [
              "fixed bg-slate-800/90 right-0 top-[100px] h-65 w-50",
              "transition-all duration-300 ease-in-out",
              "transform",
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full pointer-events-none",
            ],

            !isMobile && "block"
          )}
        >
          <ul
            className={clsx(
              "flex",
              isMobile && "flex-col gap-2 text-center box-content px-2 py-8",
              "list-image-none"
            )}
          >
            {links.map((link) => {
              return (
                <li key={link.label} className={liClassName()}>
                  <a href="#">{link.label}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
