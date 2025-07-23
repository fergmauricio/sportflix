import { SpinLoader } from "@/components/SpinLoader";
import { SportVideo } from "@/Components/SportVideo";
import { JsonSportRepository } from "@/repositories/json-sport-repository";

import { Metadata } from "next";

import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-static";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const jsonRepository = new JsonSportRepository();
  const sport = await jsonRepository.findBySlug(slug);

  return {
    title: sport.title,
    description: sport.content,
  };
}

export default async function ItemSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  const jsonRepository = new JsonSportRepository();
  const sport = await jsonRepository.findBySlug(slug);

  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <SportVideo sport={sport} />
    </Suspense>
  );
}
