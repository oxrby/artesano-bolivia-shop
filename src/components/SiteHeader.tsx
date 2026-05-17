import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">
            artesa
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            Santa Cruz
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link
            to="/productos"
            className="text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Explorar
          </Link>
          <Link
            to="/vender"
            className="text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Vender
          </Link>
          <Link
            to="/login"
            className="text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Ingresar
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/productos"
            className="rounded-full p-2 text-foreground/70 transition hover:bg-secondary hover:text-foreground"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            className="rounded-full p-2 text-foreground/70 transition hover:bg-secondary hover:text-foreground"
            aria-label="Carrito"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl">artesa</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Un pequeño proyecto cruceño. Hecho a mano, entregado con cariño
            dentro de Santa Cruz de la Sierra.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">Comprar</p>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link to="/productos">Catálogo</Link></li>
            <li>Envíos</li>
            <li>Devoluciones</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">Comunidad</p>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link to="/vender">Vende en Artesa</Link></li>
            <li>Historias de artesanos</li>
            <li>Contacto</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Artesa · Hecho en Bolivia 🇧🇴
      </div>
    </footer>
  );
}
