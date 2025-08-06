import { describe, it, expect, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProfileSportContext } from "./";
import { setupListProfileMocks } from "./ListProfileSportContext.mock";

describe("ListProfileSportContext", () => {
  let mocks: ReturnType<typeof setupListProfileMocks>;

  beforeEach(() => {
    mocks = setupListProfileMocks();
  });

  afterEach(() => {
    mocks.cleanupListProfileMocks();
  });

  describe("ListProfileSportContext functions", () => {
    it("should add a Sport to a profile", () => {
      const { wrapper, mockSports, mockProfile, localStorageMock } = mocks;

      const { result } = renderHook(() => useProfileSportContext(), {
        wrapper,
      });

      act(() => {
        result.current.addProfileSport(mockProfile.id, mockSports[0]);
      });

      expect(result.current.state).toEqual({
        [mockProfile.id]: [mockSports[0]],
      });

      expect(localStorageMock.getItem("myCustomListProfile")).toBe(
        JSON.stringify({ [mockProfile.id]: [mockSports[0]] })
      );
    });

    it("should remove a Sport from a profile", () => {
      const { wrapper, mockSports, mockProfile, localStorageMock } = mocks;

      const { result } = renderHook(() => useProfileSportContext(), {
        wrapper,
      });

      act(() => {
        result.current.addProfileSport(mockProfile.id, mockSports[0]);
      });

      act(() => {
        result.current.removeProfileSport(mockProfile.id, mockSports[0].id);
      });

      expect(result.current.state[mockProfile.id]).toEqual([]);

      expect(localStorageMock.getItem("myCustomListProfile")).toBe(
        JSON.stringify({ [mockProfile.id]: [] })
      );
    });

    it("should handle empty localStorage", () => {
      const { wrapper, localStorageMock } = mocks;

      localStorageMock.clear();
      const { result } = renderHook(() => useProfileSportContext(), {
        wrapper,
      });

      expect(result.current.state).toEqual({});
    });
  });

  describe("ListProfileSportContext integration", () => {
    it("should load saved sports profiles from localStorage on mount", () => {
      const { wrapper, mockSports, mockProfile, localStorageMock } = mocks;

      localStorageMock.setItem("activeProfile", JSON.stringify(mockProfile));
      localStorageMock.setItem(
        "myCustomListProfile",
        JSON.stringify({ [mockProfile.id]: [mockSports[0]] })
      );

      const { result } = renderHook(() => useProfileSportContext(), {
        wrapper,
      });

      expect(result.current.state).toEqual({
        [mockProfile.id]: [mockSports[0]],
      });
    });
    it("should handle invalid localStorage data", () => {
      const { wrapper, localStorageMock } = mocks;

      localStorageMock.setItem("myCustomListProfile", "invalid-json");

      expect(() => {
        renderHook(() => useProfileSportContext(), { wrapper });
      }).not.toThrow();
    });
  });
});
