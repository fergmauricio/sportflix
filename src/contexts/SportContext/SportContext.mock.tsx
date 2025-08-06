import { ProfileModel } from "@/models/profile-model";
import { SportModel } from "@/models/sport-model";
import { ReactNode } from "react";
import { SportContextProvider } from ".";

const mockProfile: ProfileModel = {
  id: "10",
  name: "Perfil Salvo",
  image: "avatar_10.png",
};

const mockSports: SportModel[] = [
  {
    id: "sport_basquete01",
    title: "Basquete",
    slug: "basquete-o-jogo-dos-gigantes",
    content:
      "Criado em 1891, transformou-se num esporte global de alta intensidade.",
    fullContent:
      "O basquete foi inventado por James Naismith em Springfield, Massachusetts.",
    image: "full-shot-man-playing-basketball.jpg",
    video: "5346410_Coll_wavebreak_Basketball_1920x1080.mp4",
    published: true,
    createdAt: "2025-04-08T00:24:38.616Z",
    updatedAt: "2025-04-08T00:33:56.907Z",
    origem: "Estados Unidos",
    elenco: [
      "Michael Jordan",
      "LeBron James",
      "Kobe Bryant",
      "Stephen Curry",
      "Magic Johnson",
    ],
    datacriacao: "21/12/1891",
    rating: 4.7,
  },
  {
    id: "sport_futebol01",
    title: "Futebol",
    slug: "futebol-o-esporte-mais-amado",
    content:
      "O esporte mais popular do mundo, o futebol cativa bilhões com sua simplicidade e emoção. ",
    fullContent:
      "O futebol surgiu como esporte organizado na Inglaterra em 1863, com a fundação da Football Association.",
    image:
      "professional-football-soccer-player-kick-ball-penalty-freekick-final-match-league.jpg",
    video: "0_Soccer_Goal_Sunset_1920x1080.mp4",
    published: true,
    createdAt: "2025-04-08T00:24:38.616Z",
    updatedAt: "2025-04-08T00:33:56.907Z",
    origem: "Inglaterra",
    elenco: [
      "Pelé",
      "Lionel Messi",
      "Cristiano Ronaldo",
      "Diego Maradona",
      "Johan Cruyff",
    ],
    datacriacao: "26/10/1863",
    rating: 4.9,
  },
  {
    id: "sport_natacao01",
    title: "Natação",
    slug: "natacao-o-esporte-completo",
    content:
      "Esporte completo que trabalha todos os grupos musculares com baixo impacto articular.",
    fullContent:
      "A natação competitiva moderna surgiu no século XIX, com a primeira piscina olímpica construída",
    image: "fit-swimmer-training-by-himself.jpg",
    video: "1108186_1080p_4k_1920x1080.mp4",
    published: true,
    createdAt: "2025-04-08T00:24:38.616Z",
    updatedAt: "2025-04-08T00:33:56.907Z",
    origem: "Grécia Antiga",
    elenco: [
      "Michael Phelps",
      "Katie Ledecky",
      "Mark Spitz",
      "Ian Thorpe",
      "Caeleb Dressel",
    ],
    datacriacao: "01/01/1837",
    rating: 4.3,
  },
];

function createLocalStorageMock() {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
}

export function setupSportContextMocks() {
  const localStorageMock = createLocalStorageMock();

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <SportContextProvider>{children}</SportContextProvider>
  );

  function cleanupMocks() {
    if (window.localStorage.clear) {
      window.localStorage.clear();
    }
    vi.restoreAllMocks();
  }

  return {
    wrapper,
    mockSports,
    mockProfile,
    localStorageMock,
    cleanupMocks,
  };
}
