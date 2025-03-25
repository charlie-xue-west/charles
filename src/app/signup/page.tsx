import { AuthForm } from "@components";

export default function SignUpPage() {
  return (
    <main className="h-full flex justify-center items-center">
      <AuthForm className="w-[480px]" formType="signup" />
    </main>
  );
}
