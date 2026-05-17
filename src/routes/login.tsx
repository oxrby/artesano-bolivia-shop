import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Ingresar — Artesa" },
      { name: "description", content: "Ingresa a tu cuenta de Artesa para seguir comprando arte boliviano." },
    ],
  }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto flex max-w-md flex-col px-5 py-16">
        <h1 className="font-display text-4xl">
          {mode === "login" ? "Bienvenida de vuelta" : "Crear cuenta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Ingresa con tu correo para continuar comprando."
            : "Únete a Artesa para guardar tus favoritos y hacer pedidos."}
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl border border-border bg-card p-6 text-sm">
            <p className="font-medium">¡Listo!</p>
            <p className="mt-1 text-muted-foreground">
              {mode === "login"
                ? `Te enviamos un enlace de acceso a ${email}.`
                : `Cuenta creada para ${email}. Revisa tu correo para confirmarla.`}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              (Demo — conecta autenticación para activar este flujo.)
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Correo electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              {mode === "login" ? "Ingresar" : "Crear cuenta"}
            </button>
          </form>
        )}

        <button
          onClick={() => { setMode(mode === "login" ? "register" : "login"); setSent(false); }}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "login"
            ? "¿No tienes cuenta? Crear una"
            : "¿Ya tienes cuenta? Ingresar"}
        </button>

        <div className="mt-10 rounded-xl bg-secondary/60 p-4 text-sm">
          <p className="font-medium">¿Eres artesano?</p>
          <p className="mt-1 text-muted-foreground">
            Abre tu propia tienda en Artesa y vende dentro de Santa Cruz.
          </p>
          <Link
            to="/vender"
            className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Empezar a vender →
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
