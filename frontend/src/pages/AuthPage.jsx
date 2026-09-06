import { AuthActionPanel } from "../components/auth/AuthActionPanel";
import AuthHeader from "../components/auth/AuthHeader";
import { AuthHeroPanel } from "../components/auth/AuthHeroPanel";

function AuthPage() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <AuthHeader />

      <main className="relative flex flex-1 flex-col overflow-hidden md:flex-row">
        <AuthHeroPanel />
        <AuthActionPanel />
      </main>
    </div>
  );
}
export default AuthPage;