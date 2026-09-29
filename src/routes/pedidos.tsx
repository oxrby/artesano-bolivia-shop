import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

const OWNER = "antoniosoriabarrientos4@gmail.com";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Pedidos recibidos — Artesa" },
      { name: "description", content: "Panel de pedidos de Artesa." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Pedidos,
});

type Order = {
  id: string; created_at: string; items: any; total: number; phone: string;
  delivery_address: string; notes: string | null; status: string;
};

const STATUSES = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];

function Pedidos() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const isOwner = user?.email === OWNER;

  const load = async () => {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setOrders((data ?? []) as Order[]);
  };

  useEffect(() => { if (isOwner) load(); }, [isOwner]);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status } as any).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Estado actualizado"); load(); }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="font-display text-4xl">Pedidos recibidos</h1>
        {loading ? null : !isOwner ? (
          <p className="mt-4 text-muted-foreground">
            Esta página es solo para el equipo de Artesa. <Link to="/login" className="text-primary underline">Ingresar</Link>
          </p>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-muted-foreground">Todavía no hay pedidos.</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((o) => (
              <li key={o.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-sm">#{o.id.slice(0, 8)} · {new Date(o.created_at).toLocaleString("es-BO")}</p>
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}
                    className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm">
                    {!STATUSES.includes(o.status) && <option value={o.status}>{o.status}</option>}
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <ul className="mt-3 text-sm">
                  {(Array.isArray(o.items) ? o.items : []).map((i: any, idx: number) => (
                    <li key={idx}>{i.qty} × {i.nombre} — Bs {i.precio * i.qty}</li>
                  ))}
                </ul>
                <p className="mt-2 font-medium">Total: Bs {o.total}</p>
                <p className="mt-2 text-sm">
                  📞 <a className="text-primary underline" href={`https://wa.me/591${o.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{o.phone}</a>
                </p>
                <p className="text-sm">📍 {o.delivery_address}</p>
                {o.notes && <p className="text-sm text-muted-foreground">📝 {o.notes}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
