import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, PageHeading, PrimaryButton, TextInput } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await register({ name, email, password });
      setSuccess(data.message || "Registration successful. Please verify your email.");
      setTimeout(() => {
        navigate("/email-verification", { state: { email } });
      }, 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <PageHeading
        eyebrow="Create your account"
        title="Join Tayarat"
        description="Set up a profile in seconds and unlock a smoother way to discover, book, and manage flights."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-soft"
      >
        <TextInput
          label="Full name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Alert
            type="error"
            title="We couldn’t create your account"
            message={error}
          />
        )}

        {success && (
          <Alert
            type="success"
            title="Registration successful"
            message={success}
          />
        )}

        <PrimaryButton type="submit" className="w-full justify-center" loading={loading}>
          {loading ? "Creating your profile…" : "Create account"}
        </PrimaryButton>

        <p className="pt-1 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brand-300 hover:text-brand-200">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}