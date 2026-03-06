import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, PageHeading, PrimaryButton, TextInput } from "../components/UI";
import { useAuth } from "../context/AuthContext";

export default function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  const [email, setEmail] = useState(location.state?.email || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !verificationCode) {
      setError("Please provide both your email and the 6-digit verification code.");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyEmail({ email, verificationCode });
      setSuccess(data.message || "Email verified successfully.");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <PageHeading
        eyebrow="Secure your account"
        title="Verify your email"
        description="Enter the 6-digit code we sent to your inbox to activate your Tayarat account."
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
          label="Verification code"
          inputMode="numeric"
          maxLength={6}
          placeholder="6-digit code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />

        {error && (
          <Alert
            type="error"
            title="We couldn’t verify your email"
            message={error}
          />
        )}

        {success && (
          <Alert
            type="success"
            title="You’re verified"
            message={success}
          />
        )}

        <PrimaryButton type="submit" className="w-full justify-center" loading={loading}>
          {loading ? "Confirming your code…" : "Verify email"}
        </PrimaryButton>

        <p className="pt-1 text-center text-[11px] text-slate-500">
          Didn&apos;t receive a code? Check spam or try registering again with the same email.
        </p>
      </form>
    </div>
  );
}