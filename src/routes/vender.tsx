import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/vender")({
  head: () => ({
    meta: [
      { title: "Vender en Artesa — Abre tu tienda" },
      { name: "description", content: "Registra tu taller en Artesa y vende tus piezas a clientes en todo Bolivia." },
    ],
  }),
  component: Vender,
});

const beneficios = [
  "Publica productos en minutos",
  "Cobros en bolivianos, sin comisiones ocultas",
  "Envíos a todo Bolivia desde tu taller",
  "Soporte 1 a 1 para nuevos artesanos",
];

function Vender() {
  const [form, setForm] = useState({
    nombre: "",
    taller: "",
    region: "",
    email: "",
    password: "",
    descripcion: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Para artesanos
            </p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl">
              Vende lo que <em className="italic text-primary">creas con tus manos</em>.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Artesa es el mercado donde más de 340 artesanos bolivianos
              encuentran clientes que valoran su trabajo. Registra tu taller y
              empieza a recibir pedidos.
            </p>

            <ul className="mt-8 space-y-3">
              {beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-2xl">¡Solicitud recibida!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hola {form.nombre || "artesano"}, te contactaremos a{" "}
                  <span className="text-foreground">{form.email}</span> para
                  activar tu tienda en Artesa.
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  (Demo — conecta autenticación y base de datos para activar este flujo.)
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="font-display text-2xl">Abre tu tienda</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre completo" value={form.nombre} onChange={set("nombre")} />
                  <Field label="Nombre del taller" value={form.taller} onChange={set("taller")} />
                </div>
                <Field label="Departamento" value={form.region} onChange={set("region")} placeholder="La Paz, Cochabamba, Santa Cruz…" />
                <Field label="Correo electrónico" type="email" value={form.email} onChange={set("email")} />
                <Field label="Contraseña" type="password" value={form.password} onChange={set("password")} />

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Cuéntanos qué haces</label>
                  <textarea
                    required
                    rows={3}
                    value={form.descripcion}
                    onChange={set("descripcion")}
                    placeholder="Tejidos, cerámica, joyería…"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Solicitar mi tienda
                </button>
                <p className="text-xs text-muted-foreground">
                  Al continuar aceptas los términos de Artesa.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );
}
