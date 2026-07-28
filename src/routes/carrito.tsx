import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Tu carrito — Artesa" },
      { name: "description", content: "Revisa tus productos, agrega tu dirección en Santa Cruz y paga por QR." },
    ],
  }),
  component: Carrito,
});

function Carrito() {
  const nav = useNavigate();
  const { items, setQty, remove, total, clear } = useCart();
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Ingresa a tu cuenta para hacer el pedido");
      nav({ to: "/login" });
      return;
    }
    if (items.length === 0) return;
    setLoading(true);
    try {
      const payload = items.map((i) => ({
        id: i.product.id, nombre: i.product.nombre, precio: i.product.precio, qty: i.qty,
      }));
      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          items: payload,
          total,
          phone,
          delivery_address: address,
          notes: notes || null,
        })
        .select("id")
        .single();
      if (error) throw error;
      clear();
      nav({ to: "/pago-qr", search: { order: data.id } as any });
    } catch (err: any) {
      toast.error(err?.message ?? "No se pudo crear el pedido");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <section className="mx-auto max-w-3xl px-5 py-24 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="mt-6 font-display text-4xl">Tu carrito está vacío</h1>
          <p className="mt-2 text-muted-foreground">Explora los productos de nuestros artesanos cruceños.</p>
          <Link to="/productos" className="mt-6 inline-block rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            Ver productos
          </Link>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="font-display text-4xl">Tu carrito</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {items.map(({ product: p, qty }) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-lg text-3xl" style={{ backgroundColor: p.color }}>
                  {p.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.nombre}</p>
                  <p className="text-xs text-muted-foreground">{p.artesano} · {p.region}</p>
                  <p className="mt-1 text-sm">Bs {p.precio}</p>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-border">
                  <button onClick={() => setQty(p.id, qty - 1)} className="p-1.5 hover:bg-secondary rounded-l-full" aria-label="Menos"><Minus className="h-3 w-3" /></button>
                  <span className="w-6 text-center text-sm">{qty}</span>
                  <button onClick={() => setQty(p.id, qty + 1)} className="p-1.5 hover:bg-secondary rounded-r-full" aria-label="Más"><Plus className="h-3 w-3" /></button>
                </div>
                <button onClick={() => remove(p.id)} className="p-2 text-muted-foreground hover:text-destructive" aria-label="Quitar">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={onCheckout} className="h-fit rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Datos de entrega</h2>
            <p className="mt-1 text-xs text-muted-foreground">Entregas solo dentro de Santa Cruz de la Sierra.</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Teléfono (para confirmación)</label>
                <input
                  required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 7XX XX XXX"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Dirección de entrega</label>
                <textarea
                  required rows={2} value={address} onChange={(e) => setAddress(e.target.value)}
                  placeholder="Zona, calle, número, referencia"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Notas (opcional)</label>
                <textarea
                  rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Instrucciones para el repartidor"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl">Bs {total}</span>
            </div>

            <button
              type="submit" disabled={loading}
              className="mt-4 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creando pedido…" : "Pagar por QR"}
            </button>
            {!user && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Necesitas <Link to="/login" className="text-primary underline">ingresar</Link> para hacer el pedido.
              </p>
            )}
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
