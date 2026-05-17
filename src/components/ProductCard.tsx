import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/producto/$id"
      params={{ id: p.id }}
      className="group block"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-lg"
        style={{ backgroundColor: p.color }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-90 transition-transform duration-500 group-hover:scale-110">
          {p.emoji}
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground">
          {p.region}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium leading-tight">{p.nombre}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{p.artesano}</p>
        </div>
        <p className="whitespace-nowrap text-sm font-medium">
          Bs {p.precio}
        </p>
      </div>
    </Link>
  );
}
