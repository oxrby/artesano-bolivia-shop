import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Ingresar — Artesa" },
      { name: "description", content: "Ingresa a tu cuenta de Artesa para comprar arte cruceño." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("¡Bienvenido de vuelta!");
        nav({ to: "/" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: name, role: "buyer" },
          },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Ya puedes comprar.");
        nav({ to: "/" });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) toast.error(result.error.message ?? "No se pudo ingresar con Google");
    else if (!result.redirected) nav({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto flex max-w-md flex-col px-5 py-16">
        <h1 className="font-display text-4xl">
          {mode === "login" ? "Bienvenido de vuelta" : "Crear cuenta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Ingresa para seguir comprando arte cruceño."
            : "Únete a Artesa para hacer pedidos y guardar tu dirección."}
        </p>

        <button
          onClick={onGoogle}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-secondary"
        >
          <GoogleIcon /> Continuar con Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> o con correo <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">Nombre</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium">Correo</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Contraseña</label>
            <input
              type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Un momento…" : mode === "login" ? "Ingresar" : "Crear cuenta"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "¿No tienes cuenta? Crear una" : "¿Ya tienes cuenta? Ingresar"}
        </button>

        <div className="mt-10 rounded-xl bg-secondary/60 p-4 text-sm">
          <p className="font-medium">¿Eres artesano?</p>
          <p className="mt-1 text-muted-foreground">Abre tu propia tienda en Artesa y vende dentro de Santa Cruz.</p>
          <Link to="/vender" className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
            Empezar a vender →
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.7 29.3 5 24 5c-7.7 0-14.4 4.4-17.7 9.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 34.9 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.4 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.2 5.2C41 34.9 44 30 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
