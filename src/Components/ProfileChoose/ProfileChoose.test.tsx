import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileChoose } from "./";
import { ProfileContext } from "@/contexts/ProfileContext";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileCard } from "./ProfileCard";
import { ArrowLeft } from "lucide-react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("lucide-react", () => ({
  ArrowLeft: () => <span data-testid="arrow-left-icon">←</span>,
  ArrowLeftIcon: () => <span data-testid="arrow-left-icon">←</span>,
  EditIcon: () => <span></span>,
  PlusIcon: () => <span></span>,
  ListIcon: () => <span></span>,
}));

vi.mock("../ProfileAdd", () => ({
  ProfileAdd: ({ callback }: { callback: (value: boolean) => void }) => (
    <div data-testid="profile-add">
      <button
        title="Voltar"
        aria-label="Voltar"
        onClick={() => callback(false)}
      >
        <span data-testid="arrow-left-icon">←</span>
      </button>
      Formulário de Perfil
    </div>
  ),
}));

describe("ProfileChoose", () => {
  const mockContextValue = {
    state: {
      savedProfiles: [{ id: "1", name: "João", image: "avatar1.jpg" }],
      initialProfiles: [
        { id: "default", name: "Default", image: "default.jpg" },
      ],
      activeProfile: null,
    },
    dispatch: vi.fn(),
    fetchProfiles: vi.fn(),
    activeProfile: vi.fn(),
    addProfile: vi.fn(),
    editProfile: vi.fn(),
    deleteProfile: vi.fn(),
    clearActiveProfile: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("deve renderizar corretamente", () => {
    render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileChoose />
      </ProfileContext.Provider>
    );

    expect(screen.getByText("Escolha seu perfil")).toBeInTheDocument();
    expect(screen.getByText("João")).toBeInTheDocument();
  });

  test("ProfileHeader mostra título correto", () => {
    render(<ProfileHeader isFormMode={false} hasProfiles={true} />);
    expect(screen.getByText("Escolha seu perfil")).toBeInTheDocument();
  });

  test("deve mostrar 'Crie um novo perfil' quando não há perfis salvos", () => {
    const emptyContextValue = {
      ...mockContextValue,
      state: {
        ...mockContextValue.state,
        savedProfiles: [],
        initialProfiles: [],
      },
    };

    render(
      <ProfileContext.Provider value={emptyContextValue}>
        <ProfileChoose />
      </ProfileContext.Provider>
    );

    expect(screen.getByText("Crie um novo perfil")).toBeInTheDocument();
  });

  test("deve alternar para modo de edição", () => {
    render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileChoose />
      </ProfileContext.Provider>
    );

    const gerenciarButton = screen.getByText("Gerenciar");
    fireEvent.click(gerenciarButton);

    expect(screen.getByText("Gerenciar Perfil")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });

  test("deve abrir formulário ao clicar em Adicionar", () => {
    render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileChoose />
      </ProfileContext.Provider>
    );

    expect(screen.queryByTestId("profile-add")).not.toBeInTheDocument();

    const adicionarButton = screen.getByText("Adicionar");
    fireEvent.click(adicionarButton);

    expect(screen.queryByTestId("profile-add")).toBeInTheDocument();
  });

  test("deve abrir e fechar formulário corretamente", async () => {
    render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileChoose />
      </ProfileContext.Provider>
    );

    fireEvent.click(screen.getByText("Adicionar"));
    expect(screen.getByTestId("profile-add")).toBeInTheDocument();

    fireEvent.click(screen.getByTitle("Voltar"));

    expect(screen.queryByTestId("profile-add")).not.toBeInTheDocument();
    expect(screen.getByText("Escolha seu perfil")).toBeInTheDocument();
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  test("ProfileCard permite edição no modo form", () => {
    const onEdit = vi.fn();
    render(
      <ProfileCard
        profile={{ id: "1", name: "João", image: "avatar.jpg" }}
        isFormMode={true}
        priority={true}
        onSelect={vi.fn()}
        onEdit={onEdit}
      />
    );

    fireEvent.click(screen.getByText("Editar"));
    expect(onEdit).toHaveBeenCalled();
  });
});
