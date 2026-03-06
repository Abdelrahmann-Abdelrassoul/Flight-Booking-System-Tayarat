import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, PageHeading, PrimaryButton, TextInput } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <PageHeading
        eyebrow="Welcome back"
        title="Log in to Tayarat"
        description="Access your saved trips, manage upcoming flights, and keep your travel plans in sync across devices."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-soft"
      >
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Alert
            type="error"
            title="We couldn’t log you in"
            message={error}
          />
        )}

        <PrimaryButton type="submit" className="w-full justify-center" loading={loading}>
          {loading ? "Signing you in…" : "Continue"}
        </PrimaryButton>

        <p className="pt-1 text-center text-xs text-slate-400">
          New to Tayarat?{" "}
          <Link to="/register" className="font-medium text-brand-300 hover:text-brand-200">
            Create an account
          </Link>
        </p>
        <p className="text-center text-[11px] text-slate-500">
          Didn&apos;t verify yet?{" "}
          <Link
            to="/email-verification"
            className="font-medium text-slate-200 hover:text-white"
          >
            Verify your email
          </Link>
        </p>
      </form>
    </div>
  );
}