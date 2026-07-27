import Container from "@/components/ui/Container";

export default function DutexConectaLoading() {
  return (
    <main className="min-h-screen bg-dark">
      <section className="bg-dark pt-40 pb-20 lg:pt-48 lg:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-pulse space-y-5">
              <div className="h-16 w-72 max-w-full rounded bg-white/10" />
              <div className="h-6 w-40 rounded-full bg-white/10" />
              <div className="h-12 w-full max-w-md rounded bg-white/10" />
              <div className="h-12 w-4/5 max-w-sm rounded bg-white/10" />
              <div className="h-20 w-full max-w-xl rounded bg-white/5" />
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-48 rounded-xl border border-white/10 bg-white/[0.04]" />
              <div className="flex gap-3">
                <div className="h-12 w-44 rounded-lg bg-white/10" />
                <div className="h-12 w-40 rounded-lg bg-white/5" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
