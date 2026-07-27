"use client";

import dynamic from "next/dynamic";

const ConectaExperience = dynamic(
  () => import("@/components/sections/ConectaExperience"),
  {
    ssr: false,
    loading: () => <ConectaExperienceSkeleton />,
  }
);

function ConectaExperienceSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-2" aria-hidden>
      {[0, 1].map((item) => (
        <div
          key={item}
          className="min-h-72 animate-pulse rounded-lg border border-gray-border bg-white p-7"
        >
          <div className="h-12 w-12 rounded-lg bg-gray-200" />
          <div className="mt-6 h-3 w-24 rounded bg-gray-200" />
          <div className="mt-3 h-7 w-48 rounded bg-gray-200" />
          <div className="mt-4 h-16 w-full rounded bg-gray-100" />
          <div className="mt-7 h-11 w-36 rounded-lg bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

type ConectaExperienceLazyProps = {
  ideaTypes: string[];
  industrialAreas: string[];
};

export default function ConectaExperienceLazy({
  ideaTypes,
  industrialAreas,
}: ConectaExperienceLazyProps) {
  return (
    <ConectaExperience
      ideaTypes={ideaTypes}
      industrialAreas={industrialAreas}
    />
  );
}
