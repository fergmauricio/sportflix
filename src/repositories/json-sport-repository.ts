import { SportModel } from "@/models/sport-model";
import { SportRepository } from "./sport-repository";
import sportsData from "@/db/seed/sports.json";

const SIMULATE_WAIT_IN_MS = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export class JsonSportRepository implements SportRepository {
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise((resolve) => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  async findAllPublic(): Promise<SportModel[]> {
    const sports = sportsData.posts.filter((post) => post.published).sort();

    for (let i = sports.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sports[i], sports[j]] = [sports[j], sports[i]];
    }

    return sports;
  }

  async findById(id: string): Promise<SportModel> {
    const sports = await this.findAllPublic();
    const sport = sports.find((sport) => sport.id === id);

    if (!sport) throw new Error("Esporte não encontrado");

    return sport;
  }

  async findBySlug(slug: string): Promise<SportModel> {
    const sports = await this.findAllPublic();
    const sport = sports.find((sport) => sport.slug === slug);

    if (!sport) throw new Error("Esporte não encontrado");

    return sport;
  }
}
