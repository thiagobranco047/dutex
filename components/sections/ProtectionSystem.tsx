"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { protectionChapters, type ProtectionChapter } from "@/lib/protectionSystemChapters";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function activeChapterIndex(currentTime: number, chapters: ProtectionChapter[]): number {
  if (chapters.length === 0) return -1;
  if (currentTime < chapters[0].startTime) return -1;
  let idx = 0;
  for (let i = chapters.length - 1; i >= 0; i--) {
    if (currentTime >= chapters[i].startTime) {
      idx = i;
      break;
    }
  }
  return idx;
}

export default function ProtectionSystem() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [popupChapter, setPopupChapter] = useState<ProtectionChapter | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const syncHighlight = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setHighlightIndex(activeChapterIndex(el.currentTime, protectionChapters));
  }, []);

  const onTimeUpdate = useCallback(() => {
    syncHighlight();
  }, [syncHighlight]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onSeeked = () => syncHighlight();
    el.addEventListener("seeked", onSeeked);
    return () => el.removeEventListener("seeked", onSeeked);
  }, [syncHighlight]);

  function goToChapter(chapter: ProtectionChapter) {
    const el = videoRef.current;
    if (el) {
      el.currentTime = chapter.startTime;
      void el.play().catch(() => {});
    }
    setPopupChapter(chapter);
    setHighlightIndex(protectionChapters.indexOf(chapter));
  }

  function togglePlayPause() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  }

  return (
    <section
      id="protecao-bobinas"
      className="overflow-x-hidden bg-white pt-20 pb-0 lg:pt-28"
      aria-labelledby="protection-system-heading"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <h2
            id="protection-system-heading"
            className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            Proteção e transporte de bobinas
          </h2>
          <p className="text-sm leading-relaxed text-gray-text sm:text-base lg:pt-1">
            Visualize, em 3D, como as soluções metálicas e elastoméricas da
            Dutex atuam na proteção de bobinas durante o transporte, manuseio e
            armazenamento em operações industriais críticas.
          </p>
        </div>
      </Container>

      {/* Vídeo em largura total da viewport; capítulos e popup sobrepostos */}
      <div
        className="relative mt-12 w-screen max-w-[100vw] bg-dark-deep lg:mt-16"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div className="relative h-[100vh] min-h-[20rem] w-full max-w-none overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            playsInline
            autoPlay
            muted
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={syncHighlight}
          >
            <source
              src="/videos/video-protecao-bobinas-dutex.webm"
              type="video/webm"
            />
            Seu navegador não suporta vídeo HTML5.
          </video>

          <button
            type="button"
            className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent"
            aria-label="Pausar ou reproduzir vídeo — clique na área do vídeo"
            onClick={togglePlayPause}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePlayPause();
              }
            }}
          />

          {/* Legibilidade da faixa inferior */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 via-black/45 to-transparent"
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2 px-3 sm:bottom-6 sm:px-4 md:bottom-8">
            {popupChapter && (
              <div
                className="mb-[5px] w-full max-w-md max-h-[min(40vh,22rem)] overflow-y-auto rounded-xl border border-white/15 bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:p-5"
                role="dialog"
                aria-labelledby="protection-popup-title"
                aria-modal="true"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-accent-dark">
                      Capítulo {popupChapter.id}
                    </p>
                    <h3
                      id="protection-popup-title"
                      className="mt-1 text-lg font-bold text-gray-900"
                    >
                      {popupChapter.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPopupChapter(null)}
                    className="shrink-0 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
                    aria-label="Fechar informações do capítulo"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-text">
                  {popupChapter.description}
                </p>
              </div>
            )}

            <div
              className="flex w-full max-w-[1120px] overflow-x-auto rounded-lg border border-white/25 bg-black/35 shadow-lg backdrop-blur-md"
              role="tablist"
              aria-label="Capítulos do vídeo"
            >
              {protectionChapters.map((chapter, index) => {
                const isActive = index === highlightIndex;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goToChapter(chapter)}
                    className={cn(
                      "min-w-[2.75rem] shrink-0 flex-1 py-2.5 text-center text-[11px] font-bold tracking-wider transition-colors sm:py-3 sm:text-xs",
                      "border-r border-white/15 last:border-r-0",
                      isActive
                        ? "bg-green-accent text-white"
                        : "bg-transparent text-white/85 hover:bg-white/15 hover:text-white"
                    )}
                  >
                    {chapter.id}
                  </button>
                );
              })}
            </div>
            <p className="pointer-events-none max-w-3xl px-2 text-center text-xs leading-relaxed text-white sm:text-sm">
              Reproduza o vídeo do início ao fim ou selecione um capítulo para ir
              direto ao trecho e abrir os detalhes técnicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
