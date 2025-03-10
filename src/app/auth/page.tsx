import AuthForm from "./_components/auth-form";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </main>
  );
}
