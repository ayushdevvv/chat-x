import { useAuth, useClerk } from "@clerk/react";
import { useNavigate } from "react-router";
import { APP_NAME, AppLogo } from "../components/AppLogo";

const cursiveFont = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" };

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
];

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
    <div className="min-h-dvh w-full overflow-x-hidden bg-[#060a14] text-white">
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

      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#3d63dd]/20 blur-[140px]"
      />

      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#060a14]/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-12">
          <div className="flex items-center gap-2.5">
            <AppLogo size={32} className="rounded-[9px]" />
            <span className="text-[17px] font-semibold tracking-tight">{APP_NAME}</span>
          </div>

          <nav className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleGetStarted}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white/30 hover:text-white"
          >
            {isSignedIn ? "Open chat" : "Sign in"}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 py-16 sm:px-12 md:grid-cols-2 md:py-24">
        <div className="max-w-md">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Say it the moment you think it,{" "}
            <span style={cursiveFont} className="font-normal text-[#8fa8ff]">
              instantly
            </span>
          </h1>

          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
            {APP_NAME} delivers your messages the second you send them, keeps every conversation
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
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="mn-phone w-71 rounded-[2.5rem] border border-white/10 bg-[#0b101c] p-2.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
            <div className="overflow-hidden rounded-[2rem] bg-[#080c17]">
              <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-3.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#1c2740] text-sm font-medium text-white/80">
                  SC
                </div>
                <div>
                  <p className="text-[14px] font-medium leading-tight">Sara Chen</p>
                  <p className="text-[11px] text-[#5ee6a8]">Online</p>
                </div>
              </div>

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

      <section id="features" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-12">
        <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything feels{" "}
          <span style={cursiveFont} className="font-normal text-[#8fa8ff]">
            effortless
          </span>
        </h2>

        <div className="mt-14 space-y-16">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-lg font-medium">Real time delivery</p>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/55">
                Messages reach the other person the instant you hit send, with live typing and
                read status so you always know where a conversation stands.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#0b101c] p-5">
              <div className="flex items-center justify-between text-[12px] text-white/40">
                <span>You</span>
                <span>Delivered</span>
              </div>
              <div className="mt-3 flex justify-end">
                <div className="rounded-2xl rounded-br-md bg-[#3d63dd] px-3.5 py-2 text-[13px] text-white">
                  on my way now
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className="order-2 rounded-2xl border border-white/8 bg-[#0b101c] p-5 md:order-1">
              <div className="flex items-center gap-2 text-[12px] text-[#8fa8ff]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                Private by default
              </div>
              <div className="mt-3 rounded-2xl rounded-bl-md bg-[#1c2740] px-3.5 py-2 text-[13px] text-white/90">
                only you and Sara can read this
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-lg font-medium">Private by default</p>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/55">
                Every conversation is encrypted in transit, so your messages stay between you and
                the person you sent them to.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-lg font-medium">Built for speed</p>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/55">
                A lightweight interface that opens fast and stays fast, on any device, so nothing
                gets between you and the conversation.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#0b101c] p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#1c2740] text-xs font-medium">
                  JD
                </div>
                <div className="h-2 flex-1 rounded-full bg-white/8">
                  <div className="h-2 w-4/5 rounded-full bg-[#3d63dd]" />
                </div>
              </div>
              <p className="mt-3 text-[12px] text-white/40">Loaded in under a second</p>
            </div>
          </div>
        </div>
      </section>

      <section id="preview" className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 sm:px-12">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          See{" "}
          <span style={cursiveFont} className="font-normal text-[#8fa8ff]">
            {APP_NAME}
          </span>{" "}
          in action
        </h2>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0b101c] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex h-100 sm:h-110">
            <div className="hidden w-56 shrink-0 border-r border-white/8 sm:block">
              <div className="border-b border-white/8 px-4 py-3.5">
                <div className="h-8 rounded-full bg-[#1c2740]" />
              </div>
              {[
                { name: "Sara Chen", msg: "perfect, can't wait", active: true },
                { name: "Dev Team", msg: "deployed to prod", active: false },
                { name: "Marcus Lee", msg: "sent a photo", active: false },
              ].map((item) => (
                <div key={item.name} className={`flex items-center gap-2.5 px-4 py-3 ${item.active ? "bg-[#141c30]" : ""}`}>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1c2740] text-[11px] font-medium">
                    {item.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium">{item.name}</p>
                    <p className="truncate text-[11px] text-white/40">{item.msg}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2.5 border-b border-white/8 px-5 py-3.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#1c2740] text-[12px] font-medium">
                  SC
                </div>
                <div>
                  <p className="text-[13px] font-medium leading-tight">Sara Chen</p>
                  <p className="text-[11px] text-[#5ee6a8]">Online</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-end gap-2 px-5 py-4">
                <div className="max-w-[60%] self-start rounded-2xl rounded-bl-md bg-[#1c2740] px-3.5 py-2 text-[13px] text-white/90">
                  hey, are we still on for tonight?
                </div>
                <div className="max-w-[60%] self-end rounded-2xl rounded-br-md bg-[#3d63dd] px-3.5 py-2 text-[13px] text-white">
                  yes, see you at 8
                </div>
                <div className="max-w-[60%] self-start rounded-2xl rounded-bl-md bg-[#1c2740] px-3.5 py-2 text-[13px] text-white/90">
                  perfect, can't wait
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-white/8 px-5 py-3.5">
                <div className="h-8 flex-1 rounded-full bg-[#1c2740]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;