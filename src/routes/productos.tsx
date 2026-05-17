import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ProductCard } from "@/components/ProductCard";
import { products, categorias } from "@/lib/products";

export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Explorar productos — Artesa" },
      { name: "description", content: "Explora textiles, cerámica, joyería y más, hechos por artesanos bolivianos." },
    ],
  }),
  component: Productos,
});

function Productos() {
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = cat === "Todos" || p.categoria === cat;
    const matchQ =
      q.trim() === "" ||
      p.nombre.toLowerCase().includes(q.toLowerCase()) ||
      p.artesano.toLowerCase().includes(q.toLowerCase()) ||
      p.region.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <h1 className="font-display text-4xl sm:text-5xl">Explorar</h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"} de artesanos cruceños.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, artesano o región…"
            className="w-full rounded-full border border-input bg-card px-5 py-3 text-sm outline-none transition focus:border-primary sm:max-w-sm"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No encontramos productos. Prueba con otra búsqueda.
          </p>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
