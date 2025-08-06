import { describe, it, expect, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSportContext } from "./";
import { setupSportContextMocks } from "./SportContext.mock";
import { JsonSportRepository } from "@/repositories/json-sport-repository";

describe("SportContext", () => {
  let mocks: ReturnType<typeof setupSportContextMocks>;

  beforeEach(() => {
    mocks = setupSportContextMocks();
  });

  afterEach(() => {
    mocks.cleanupMocks();
  });

  describe("SportContext functions", () => {
    it("should fetch sports and update state", async () => {
      const { wrapper, mockSports } = mocks;

      vi.spyOn(
        JsonSportRepository.prototype,
        "findAllPublic"
      ).mockResolvedValue(mockSports);

      const { result } = renderHook(() => useSportContext(), {
        wrapper,
      });

      await act(async () => {
        await result.current.fetchSports();
      });

      expect(result.current.state.sports).toEqual(mockSports);
    });
  });
  it("should fetch sports by rating and update state", async () => {
    const { wrapper, mockSports } = mocks;

    vi.spyOn(
      JsonSportRepository.prototype,
      "findAllPublicByRating"
    ).mockResolvedValue(mockSports);

    const { result } = renderHook(() => useSportContext(), {
      wrapper,
    });

    await act(async () => {
      await result.current.fetchSportsByRating();
    });

    expect(result.current.state.sportsByRating).toEqual(mockSports);
  });
  it("should fetch sports by search term and update state", async () => {
    const { wrapper, mockSports } = mocks;

    const mockSearchTerm = "basquete";
    const mockResponse = mockSports.filter(
      (sport) =>
        sport.title.toLowerCase().includes(mockSearchTerm.toLowerCase()) ||
        sport.content.toLowerCase().includes(mockSearchTerm.toLowerCase())
    );

    const findAllPublicBySearchMock = vi
      .spyOn(JsonSportRepository.prototype, "findAllPublicBySearch")
      .mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSportContext(), {
      wrapper,
    });

    await act(async () => {
      await result.current.fetchSportsBySearch(mockSearchTerm);
    });

    expect(findAllPublicBySearchMock).toHaveBeenCalledTimes(1);
    expect(findAllPublicBySearchMock).toHaveBeenCalledWith(
      mockSearchTerm.trim()
    );
    expect(result.current.state.sportsBySearch).toEqual(mockResponse);
  });
  it("should not fetch sports if search term has less than 3 caracteres", async () => {
    const { wrapper } = mocks;

    const findAllPublicBySearchMock = vi.spyOn(
      JsonSportRepository.prototype,
      "findAllPublicBySearch"
    );

    const { result } = renderHook(() => useSportContext(), {
      wrapper,
    });

    await act(async () => {
      await result.current.fetchSportsBySearch("ba");
    });

    expect(findAllPublicBySearchMock).not.toHaveBeenCalled();
    expect(result.current.state.sportsBySearch).toEqual([]);
  });
  it("should not fetch when search term is empty", async () => {
    const { wrapper } = mocks;

    const findAllPublicBySearchMock = vi.spyOn(
      JsonSportRepository.prototype,
      "findAllPublicBySearch"
    );

    const { result } = renderHook(() => useSportContext(), {
      wrapper,
    });

    await act(async () => {
      await result.current.fetchSportsBySearch("");
    });

    expect(findAllPublicBySearchMock).not.toHaveBeenCalled();
    expect(result.current.state.sportsBySearch).toEqual([]);
  });
  it("should active a sport", () => {
    const { wrapper, mockSports } = mocks;

    const { result } = renderHook(() => useSportContext(), {
      wrapper,
    });

    act(() => {
      result.current.activeSport(mockSports[0]);
    });

    expect(result.current.state.activeSport).toEqual(mockSports[0]);
  });
  it("should clear a activeSport", () => {
    const { wrapper } = mocks;

    const { result } = renderHook(() => useSportContext(), {
      wrapper,
    });

    act(() => {
      result.current.clearActiveSport();
    });

    expect(result.current.state.activeSport).toBeNull();
  });
  it("should handle search errors gracefully", async () => {
    const mockError = new Error("Search failed");
    const consoleSpy = vi.spyOn(console, "log");

    vi.spyOn(
      JsonSportRepository.prototype,
      "findAllPublicBySearch"
    ).mockRejectedValue(mockError);

    const { result } = renderHook(() => useSportContext(), {
      wrapper: mocks.wrapper,
    });

    await act(async () => {
      await result.current.fetchSportsBySearch("basquete");
    });

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(result.current.state.sportsBySearch).toEqual([]);
  });

  it("should trim whitespace from search term", async () => {
    const { mockSports } = mocks;
    const findAllPublicBySearchMock = vi
      .spyOn(JsonSportRepository.prototype, "findAllPublicBySearch")
      .mockResolvedValue(mockSports);

    const { result } = renderHook(() => useSportContext(), {
      wrapper: mocks.wrapper,
    });

    await act(async () => {
      await result.current.fetchSportsBySearch("  basquete  ");
    });

    expect(findAllPublicBySearchMock).toHaveBeenCalledWith("basquete");
  });
});
