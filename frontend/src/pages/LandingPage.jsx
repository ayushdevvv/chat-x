import { useAuth, useClerk } from "@clerk/react";
import { useNavigate } from "react-router";
import { APP_NAME, AppLogo } from "../components/AppLogo";

const cursiveFont = { fontFamily: "'Instrument Serif', serif" };

const FEATURES = ["Instant delivery", "Private by default", "Built for speed"];

function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const clerk = useClerk();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!isLoaded) return;

    if (isSignedIn) {
      navigate("/chat");
    } else {
      clerk.openSignIn({ fallbackRedirectUrl: "/chat", forceRedirectUrl: "/chat" });
    }
  };

  return (
    <div className="min-h-dvh w-full overflow-hidden bg-[#060a14] text-white">
      <style>{`
        @keyframes mn-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes mn-typing {
          0%, 8% { opacity: 0; }
          14%, 52% { opacity: 1; }
          58%, 100% { opacity: 0; }
        }
        @keyframes mn-reply {
          0%, 55% { opacity: 0; transform: translateY(6px); }
          65%, 100% { opacity: 1; transform: translateY(0px); }
        }
        .mn-phone { animation: mn-float 6s ease-in-out infinite; }
        .mn-typing { animation: mn-typing 7s ease-in-out infinite; }
        .mn-reply { animation: mn-reply 7s ease-in-out infinite; opacity: 0; }
      `}</style>

      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#3d63dd]/20 blur-[140px]"
      />

      {/* header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <div className="flex items-center gap-2.5">
          <AppLogo size={34} className="rounded-[9px]" />
          <span className="text-lg italic" style={cursiveFont}>
            {APP_NAME}
          </span>
        </div>

        <button
          type="button"
          onClick={handleGetStarted}
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
        >
          {isSignedIn ? "Open chat" : "Sign in"}
        </button>
      </header>

      {/* hero */}
      <main className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 py-10 sm:px-12 md:grid-cols-2 md:py-20">
        {/* left: copy */}
        <div className="max-w-md">
          <h1 className="text-4xl italic leading-tight sm:text-5xl" style={cursiveFont}>
            Say it the moment you think it
          </h1>

          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
            mesNex delivers your messages the instant you send them, keeps every conversation
            private, and stays out of your way.
          </p>

          <button
            type="button"
            onClick={handleGetStarted}
            disabled={!isLoaded}
            className="mt-9 h-13 rounded-2xl bg-[#3d63dd] px-8 text-[15px] font-semibold text-white shadow-[0_18px_45px_-15px_rgba(61,99,221,0.7)] transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {!isLoaded ? "Loading" : isSignedIn ? "Go to chat" : "Get started"}
          </button>

          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/40">
            {FEATURES.map((feature, index) => (
              <span key={feature} className="flex items-center gap-5">
                {feature}
                {index < FEATURES.length - 1 ? (
                  <span className="h-3 w-px bg-white/15" aria-hidden />
                ) : null}
              </span>
            ))}
          </div>
        </div>

        {/* right: phone mockup */}
        <div className="flex justify-center md:justify-end">
          <div className="mn-phone w-71 rounded-[2.5rem] border border-white/10 bg-[#0b101c] p-2.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
            <div className="overflow-hidden rounded-[2rem] bg-[#080c17]">
              {/* phone header */}
              <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#1c2740] text-sm font-medium text-white/80">
                  SC
                </div>
                <div>
                  <p className="text-[14px] font-medium leading-tight">Sara Chen</p>
                  <p className="text-[11px] text-[#5ee6a8]">Online</p>
                </div>
              </div>

              {/* messages */}
              <div className="flex min-h-84 flex-col justify-end gap-2 px-3.5 py-4">
                <div className="max-w-[75%] self-start rounded-2xl rounded-bl-md bg-[#1c2740] px-3.5 py-2 text-[13px] leading-snug text-white/90">
                  hey, are we still on for tonight?
                </div>

                <div className="max-w-[75%] self-end rounded-2xl rounded-br-md bg-[#3d63dd] px-3.5 py-2 text-[13px] leading-snug text-white">
                  yes, see you at 8
                </div>

                <div className="relative h-9">
                  <div className="mn-typing absolute left-0 flex items-center gap-1 rounded-2xl rounded-bl-md bg-[#1c2740] px-3.5 py-3">
                    <span className="size-1.5 rounded-full bg-white/50" />
                    <span className="size-1.5 rounded-full bg-white/50" />
                    <span className="size-1.5 rounded-full bg-white/50" />
                  </div>

                  <div className="mn-reply absolute left-0 max-w-[85%] rounded-2xl rounded-bl-md bg-[#1c2740] px-3.5 py-2 text-[13px] leading-snug text-white/90">
                    perfect, can't wait
                  </div>
                </div>
              </div>

              {/* composer */}
              <div className="flex items-center gap-2 border-t border-white/8 px-3.5 py-3">
                <div className="h-8 flex-1 rounded-full bg-[#1c2740]" />
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#3d63dd] text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12L20 4L14 20L11 13L4 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;