import { APP_NAME, AppLogo } from "./AppLogo";

const PageLoader = () => {
  return (
    <div className="flex h-dvh items-center justify-center bg-[#050506] text-white">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-full bg-accent/25 blur-xl animate-pulse"
          />
          <AppLogo size={48} className="relative rounded-2xl" />
        </div>

        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
          <span className="size-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
          <span className="size-1.5 rounded-full bg-accent animate-bounce" />
        </div>

        <p className="text-sm font-medium text-white/50">Loading {APP_NAME}</p>
      </div>
    </div>
  );
};

export default PageLoader;