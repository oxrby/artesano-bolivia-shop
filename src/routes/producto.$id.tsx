import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { products } from "@/lib/products";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl">Producto no encontrado</h1>
        <Link to="/productos" className="mt-4 inline-block text-primary underline">
          Volver al catálogo
        </Link>
      </div>
    </div>
  ),
  component: ProductoDetalle,
});

function ProductoDetalle() {
  const { product: p } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-8">
        <Link
          to="/productos"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div
            className="relative aspect-square overflow-hidden rounded-2xl"
            style={{ backgroundColor: p.color }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[12rem]">
              {p.emoji}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {p.categoria} · {p.region}
            </p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl">{p.nombre}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Por <span className="text-foreground">{p.artesano}</span>
            </p>

            <p className="mt-6 font-display text-3xl">Bs {p.precio}</p>
            <p className="text-xs text-muted-foreground">Incluye envío a todo Bolivia</p>

            <p className="mt-6 leading-relaxed text-foreground/80">{p.descripcion}</p>

            <div className="mt-8 flex gap-3">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                <ShoppingBag className="h-4 w-4" /> Añadir al carrito
              </button>
              <button
                className="rounded-full border border-border p-3 transition hover:bg-secondary"
                aria-label="Guardar"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
              <div>
                <p className="mb-1 font-medium text-foreground">Envío</p>
                3–7 días hábiles en todo el país
              </div>
              <div>
                <p className="mb-1 font-medium text-foreground">Pago</p>
                QR, tarjeta o transferencia
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
