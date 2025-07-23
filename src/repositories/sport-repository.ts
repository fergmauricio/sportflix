import { SportModel } from "@/models/sport-model";

export interface SportRepository {
  findAllPublic(): Promise<SportModel[]>;
  findById(id: string): Promise<SportModel>;
  findBySlug(slug: string): Promise<SportModel>;
}
