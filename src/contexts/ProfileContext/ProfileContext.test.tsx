import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ProfileContextProvider, useProfileContext } from "./";
import { ProfileModel } from "@/models/profile-model";
import { ReactNode } from "react";

// Mock do localStorage
const localStorageMock = (() => {
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
})();

// Mock dos dados de perfil
const mockProfiles: ProfileModel[] = [
  { id: "1", name: "Futebol Americano", image: "avatar_01.png" },
  { id: "2", name: "Golfe", image: "avatar_02.png" },
];

const mockSavedProfile: ProfileModel = {
  id: "10",
  name: "Perfil Salvo",
  image: "avatar_10.png",
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <ProfileContextProvider>{children}</ProfileContextProvider>
);

beforeEach(() => {
  // Substitui o localStorage global pelo mock
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  // Limpa o localStorage antes de cada teste
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ProfileContext functions", () => {
  it("should fetch initial profiles", () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    act(() => {
      result.current.fetchProfiles();
    });

    expect(result.current.state.initialProfiles).toHaveLength(9);
    expect(result.current.state.initialProfiles[0].name).toBe(
      "Futebol Americano"
    );
  });

  it("should active a profile", () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    act(() => {
      result.current.activeProfile(mockProfiles[0]);
    });

    expect(result.current.state.activeProfile).toEqual(mockProfiles[0]);
    expect(localStorage.getItem("activeProfile")).toBe(
      JSON.stringify(mockProfiles[0])
    );
  });

  it("should add a profile", () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    act(() => {
      result.current.addProfile(mockSavedProfile);
    });

    expect(result.current.state.savedProfiles).toContainEqual(mockSavedProfile);
    expect(localStorage.getItem("savedProfile")).toContain(mockSavedProfile.id);
  });

  it("should edit a profile", () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });
    const editedProfile = { ...mockSavedProfile, name: "Perfil Editado" };

    // Primeiro adiciona um perfil
    act(() => {
      result.current.addProfile(mockSavedProfile);
    });

    // Depois edita
    act(() => {
      result.current.editProfile(editedProfile);
    });

    expect(result.current.state.savedProfiles).toContainEqual(editedProfile);
    expect(localStorage.getItem("savedProfile")).toContain(editedProfile.name);
  });

  it("should delete a profile", () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    // Primeiro adiciona um perfil
    act(() => {
      result.current.addProfile(mockSavedProfile);
    });

    // Depois deleta
    act(() => {
      result.current.deleteProfile(mockSavedProfile);
    });

    expect(result.current.state.savedProfiles).not.toContainEqual(
      mockSavedProfile
    );
    expect(localStorage.getItem("savedProfile")).not.toContain(
      mockSavedProfile.id
    );
  });

  it("should clear active profile", () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    // Primeiro ativa um perfil
    act(() => {
      result.current.activeProfile(mockProfiles[0]);
    });

    // Depois limpa
    act(() => {
      result.current.clearActiveProfile();
    });

    expect(result.current.state.activeProfile).toBeNull();
    expect(localStorage.getItem("activeProfile")).toBeNull();
  });
});

describe("ProfileContext integration", () => {
  it("should load saved profiles from localStorage on mount", () => {
    // Prepara o localStorage com dados antes de renderizar
    localStorage.setItem("savedProfile", JSON.stringify([mockSavedProfile]));

    const { result } = renderHook(() => useProfileContext(), { wrapper });

    expect(result.current.state.savedProfiles).toHaveLength(1);
    expect(result.current.state.savedProfiles[0]).toEqual(mockSavedProfile);
  });

  it("should load active profile from localStorage on mount", () => {
    // Prepara o localStorage com dados antes de renderizar
    localStorage.setItem("activeProfile", JSON.stringify(mockProfiles[0]));

    const { result } = renderHook(() => useProfileContext(), { wrapper });

    expect(result.current.state.activeProfile).toEqual(mockProfiles[0]);
  });

  it("should handle localStorage errors gracefully", () => {
    // Mock para simular um erro no localStorage
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("LocalStorage error");
    });

    // Verifica se o erro é capturado sem quebrar o componente
    expect(() => {
      renderHook(() => useProfileContext(), { wrapper });
    }).not.toThrow();
  });

  it("should update multiple states correctly", () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    act(() => {
      result.current.fetchProfiles();
      result.current.addProfile(mockSavedProfile);
      result.current.activeProfile(mockProfiles[1]);
    });

    expect(result.current.state.initialProfiles).toHaveLength(9);
    expect(result.current.state.savedProfiles).toHaveLength(1);
    expect(result.current.state.activeProfile).toEqual(mockProfiles[1]);
  });
});
