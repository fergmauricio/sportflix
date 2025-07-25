"use client";

import { useProfileContext } from "@/contexts/ProfileContext";
import clsx from "clsx";
import { CircleChevronDown, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Menu() {
  const { state, clearActiveProfile } = useProfileContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    const checkScrolling = () => {
      setIsScrolling(window.scrollY > 0);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("scroll", checkScrolling);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", checkScrolling);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  const menuToggle = clsx(
    "sm:opacity-0 sm:pointer-events-none visible",
    "flex",
    "ml-auto",
    "b-none",
    "text-white",
    "text-[1.5rem]",
    "relative",
    "r-auto",
    "!order-2",
    "mx-auto"
  );

  const profileToggle = clsx(
    "flex justify-center items-center cursor-pointer p-2 transition",
    "hover:transform hover:scale-[1.2]",
    "ml-auto mr-2 sm:mr-0",
    "b-none",
    "text-white",
    "text-[1.5rem]",
    "relative",
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
    { href: "/portal", label: "Início" },
    { href: "/about", label: "Sobre" },
    { href: "/sports", label: "Esportes" },
    { href: "/myList", label: "Minha Lista" },
  ];

  return (
    <header className="fixed top-0 w-full flex bg-transparent z-10 h-22 items-center">
      <div
        className={clsx(
          "absolute inset-0 transition-opacity delay-150 duration-150 ease-in-out ",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-to-b before:from-black/95 before:to-transparent",
          !isScrolling ? "opacity-100" : "opacity-0",
          "before:-z-10"
        )}
      />

      <div
        className={clsx(
          "absolute inset-0 transition-opacity delay-150 duration-150 ease-in-out ",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-to-b before:bg-black",
          isScrolling ? "opacity-100" : "opacity-0",
          "before:-z-10"
        )}
      />
      <div className="w-full flex items-center">
        <div className="text-2xl font-medium text-green-400 pl-8 sm:ml-4">
          SPORTSFLIX
        </div>

        <div className={profileToggle}>
          {state.activeProfile && (
            <>
              <Image
                id={state.activeProfile.id}
                src={`/uploads/${state.activeProfile.image}`}
                alt={state.activeProfile.name || ""}
                width={30}
                height={30}
                priority={true}
                className="mr-2 sm:mr-0 sm:w-[40px] sm:h-[40px]"
                onClick={handleProfiles}
              />
            </>
          )}
          <button className={menuToggle} onClick={handleToggleMenu}>
            <MenuIcon size={30} />
          </button>
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
                  <Link href={link.href}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
