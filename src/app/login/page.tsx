import { AuthForm } from "@components";

export default function LogInPage() {
  return (
    <main className="h-full flex justify-center items-center">
      <AuthForm className="h-[450px] w-[381px]" formType="login" />
    </main>
  );
}
