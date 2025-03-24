import { AuthForm } from "@components";

export default function SignUpPage() {
  return (
    <main className="h-full flex justify-center items-center">
      <AuthForm className="h-[689px] w-[381px]" formType="signup" />
    </main>
  );
}
