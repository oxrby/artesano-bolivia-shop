import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import qrImg from "@/assets/qr-pago.png";

const searchSchema = z.object({ order: z.string().optional() });

export const Route = createFileRoute("/pago-qr")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Pagar con QR — Artesa" },
      { name: "description", content: "Escanea el QR para completar tu pago en Artesa." },
    ],
  }),
  component: PagoQR,
});

function PagoQR() {
  const { order } = Route.useSearch();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto flex max-w-lg flex-col items-center px-5 py-12 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="mt-5 font-display text-4xl">Pedido creado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Escanea el QR desde tu app bancaria para completar el pago.
          Nos contactaremos contigo por WhatsApp al número que dejaste.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <img src={qrImg} alt="QR para pagar el pedido" className="h-72 w-72 object-contain" />
        </div>

        {order && (
          <p className="mt-4 text-xs text-muted-foreground">
            Nº de pedido: <span className="font-mono text-foreground">{order.slice(0, 8)}</span>
          </p>
        )}

        <p className="mt-6 max-w-sm text-xs text-muted-foreground">
          Una vez realizado el pago, tu pedido pasará a preparación y será entregado
          dentro de Santa Cruz en 2 a 5 días.
        </p>

        <Link to="/productos" className="mt-8 inline-block text-sm text-primary underline-offset-4 hover:underline">
          Seguir comprando →
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
