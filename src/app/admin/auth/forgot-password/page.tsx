import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8">
        <h1 className="text-lg font-bold text-neutral-900">Forgot password</h1>
        <p className="mt-1 text-sm text-neutral-500">Enter your email to reset your password.</p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
