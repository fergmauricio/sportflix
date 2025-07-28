"use client";

import { useProfileContext } from "@/contexts/ProfileContext";
import clsx from "clsx";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSportContext } from "@/contexts/SportContext";

type MenuProps = {
  cbSearchState: React.Dispatch<React.SetStateAction<boolean>>;
  cbSearchString: React.Dispatch<React.SetStateAction<boolean>> | null;
};

export function Menu({ cbSearchState, cbSearchString }: MenuProps) {
  const { state, clearActiveProfile } = useProfileContext();
  const { fetchSportsBySearch } = useSportContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  function handleSearchInput() {
    const search = searchInputRef.current?.value;

    if (search?.length > 2) {
      cbSearchState(true);
      cbSearchString(searchInputRef.current?.value);
    } else {
      cbSearchState(false);
      cbSearchString(null);
    }
  }

  function handleCloseSearch(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    setIsSearching(false);
    searchInputRef.current.value = "";
    handleSearchInput();
    fetchSportsBySearch("");
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
          "shadow-[0_10px_20px_rgba(0,0,0,0.5)]",

          isScrolling ? "opacity-100" : "opacity-0",
          "before:-z-10"
        )}
      />
      <div className="w-full flex items-center">
        <div className="text-2xl font-medium text-green-400 pl-8 sm:ml-4 z-50">
          <Link
            className="cursor-pointer hover:transform hover:scale-120"
            href="/portal"
          >
            SPORTSFLIX
          </Link>
        </div>

        <div className={profileToggle}>
          <div
            className={clsx(
              "relative mr-4 ",
              "transition-opacity delay-150 ease-in-out",
              "flex justify-center items-center",
              isSearching ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            <input
              type="text"
              placeholder="Buscar..."
              ref={searchInputRef}
              onChange={handleSearchInput}
              className="w-[300px] h-[34px] border-1 border-green-400 rounded pl-8 text-[.9rem]"
            />
            <div className="absolute left-2 ">
              <SearchIcon size={18} />
            </div>
            <div className="absolute right-2">
              <button
                onClick={handleCloseSearch}
                className="cursor-pointer transition hover:transform hover:scale-120"
              >
                <XIcon size={18} />
              </button>
            </div>
          </div>
          <div
            className={clsx(
              "relative mr-4 point",
              "transition-opacity delay-150 ease-in-out",
              "flex justify-center items-center",
              !isSearching ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsSearching(true);
              }}
              className="cursor-pointer transition hover:transform hover:scale-120"
            >
              <SearchIcon size={32} />
            </button>
          </div>
          {state.activeProfile && (
            <>
              <Image
                id={state.activeProfile.id}
                src={`/uploads/${state.activeProfile.image}`}
                alt={state.activeProfile.name || ""}
                width={30}
                height={30}
                className="mr-2 sm:mr-0 transition hover:transform hover:scale-[1.2]"
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
