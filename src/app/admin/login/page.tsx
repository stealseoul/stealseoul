import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8">
        <h1 className="text-lg font-bold text-neutral-900">StealSeoul Admin</h1>
        <p className="mt-1 text-sm text-neutral-500">Sign in to manage products.</p>
        <LoginForm />
      </div>
    </div>
  );
}
