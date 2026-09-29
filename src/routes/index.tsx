import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import heroImg from "@/assets/hero-artesa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artesa — Arte hecho a mano en Santa Cruz" },
      { name: "description", content: "Compra artesanía cruceña hecha a mano y paga por QR. Entregas en Santa Cruz de la Sierra." },
      { property: "og:title", content: "Artesa — Arte hecho a mano en Santa Cruz" },
      { property: "og:description", content: "Compra artesanía cruceña hecha a mano y paga por QR. Entregas en Santa Cruz de la Sierra." },
    ],
  }),
  component: Index,
});

function Index() {
  const destacados = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-10 sm:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Santa Cruz · Hecho a mano
            </p>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Arte que viene <em className="italic text-primary">de las manos</em> cruceñas.
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Un proyecto recién nacido en Santa Cruz de la Sierra. Somos un
              equipo de 2 personas conectando artesanos locales con clientes
              que valoran lo hecho a mano.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/productos"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Explorar productos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/vender"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
              >
                Vender en Artesa
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={heroImg}
              alt="Textiles y cerámica artesanal boliviana"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="grid grid-cols-3 gap-4 border-y border-border py-6 text-center">
          <div>
            <p className="font-display text-2xl">2</p>
            <p className="text-xs text-muted-foreground">Personas en el equipo</p>
          </div>
          <div>
            <p className="font-display text-2xl">SCZ</p>
            <p className="text-xs text-muted-foreground">Solo Santa Cruz</p>
          </div>
          <div>
            <p className="font-display text-2xl">100%</p>
            <p className="text-xs text-muted-foreground">Hecho a mano</p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl sm:text-4xl">Destacados de la semana</h2>
          <Link to="/productos" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {destacados.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* CTA seller */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="overflow-hidden rounded-2xl bg-accent px-8 py-12 text-accent-foreground sm:px-12 sm:py-16">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] opacity-80">Para artesanos</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Convierte tu taller en una tienda online.
            </h2>
            <p className="mt-3 text-sm opacity-90">
              Publica tus piezas, recibe pedidos dentro de Santa Cruz y dedícate
              a lo que mejor sabes hacer: crear.
            </p>
            <Link
              to="/vender"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
            >
              Abrir mi tienda <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
