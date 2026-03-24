"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubPageShell from "@/components/layout/SubPageShell";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES_LIST = ["Brand Identity", "Web Design & Dev", "Digital Strategy", "Product Design", "Full Partnership", "Not sure yet"];
const BUDGETS = ["< $5k", "$5k–$15k", "$15k–$40k", "$40k+"];

type FormData = { name: string; email: string; company: string; message: string; service: string; budget: string };
type Status   = "idle" | "sending" | "success" | "error";

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HERO_LINES = ["Let's build something", "worth remembering,", "together."];

function ContactHero() {
  const tagRef    = useRef<HTMLSpanElement>(null);
  const linesRef  = useRef<HTMLSpanElement[]>([]);
  const bodyRef   = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set([tagRef.current, ...linesRef.current], { y: "110%" });
    gsap.set([bodyRef.current, bottomRef.current], { opacity: 0, y: 16 });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([tagRef.current, ...linesRef.current, bodyRef.current, bottomRef.current], { clearProps: "all" });
      return;
    }
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(tagRef.current, { y: 0, duration: 0.8, ease: "power3.out" }, 0)
      .to(linesRef.current, { y: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.05)
      .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.35)
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.5);
  }, []);

  return (
    <section className="overflow-hidden">
      <div className="min-h-[100svh] md:min-h-screen flex flex-col px-[2.8rem]">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-start md:items-center pt-24 md:pt-0">
            <div className="overflow-hidden">
              <span ref={tagRef} className="block font-body text-[.75rem] text-muted tracking-[.18em] uppercase">
                Get in touch
              </span>
            </div>
          </div>
          <div className="flex items-start md:items-center pb-12 md:pb-0">
            <div>
              <div className="mb-10">
                {HERO_LINES.map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <span
                      ref={el => { if (el) linesRef.current[i] = el }}
                      className="block font-body text-[clamp(1.7rem,3.4vw,3rem)] font-normal leading-[1.32] tracking-tight text-foreground"
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
              <p ref={bodyRef} className="font-body text-[clamp(.88rem,1.05vw,1rem)] font-light text-muted leading-[1.9] max-w-[360px]">
                Tell us about your project. We read every message personally and respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
        <div ref={bottomRef} className="flex justify-between items-center py-6 border-t border-border">
          <a href="mailto:hello@exovio.agency" className="font-body text-[.75rem] text-muted hover:text-foreground transition-colors duration-300">
            hello@exovio.agency
          </a>
          <span className="font-body text-[.75rem] text-muted">(Scroll)</span>
        </div>
      </div>
    </section>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  const [form, setForm]     = useState<FormData>({ name: "", email: "", company: "", message: "", service: "", budget: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 82%" },
      });
      gsap.from(infoRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out", delay: 0.12,
        scrollTrigger: { trigger: formRef.current, start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const toggle = (k: "service" | "budget", v: string) =>
    setForm(f => ({ ...f, [k]: f[k] === v ? "" : v }));

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())  e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", company: "", message: "", service: "", budget: "" });
    } catch {
      setStatus("error");
    }
  };

  const inp = "w-full bg-transparent border border-border px-4 py-3.5 font-body text-[.85rem] text-foreground placeholder:text-muted/40 focus:outline-none focus:border-foreground/40 transition-colors duration-300";
  const lbl = "block font-body text-[.68rem] text-muted uppercase tracking-[.12em] mb-2";

  return (
    <section ref={sectionRef} className="px-[2.8rem] py-20 md:py-28 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16 md:gap-20">

        {/* FORM COLUMN */}
        <div ref={formRef}>
          {status === "success" ? (
            <div className="py-24">
              <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-6">Message sent</p>
              <p className="font-body text-[clamp(1.4rem,2.5vw,2rem)] font-normal leading-[1.45] text-foreground mb-6 max-w-[420px]">
                Thank you. We'll be in touch within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="font-body text-[.82rem] text-muted hover:text-foreground border-b border-muted hover:border-foreground transition-colors duration-300 pb-px"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={lbl}>Name *</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={set("name")}
                    className={inp} style={{ borderColor: errors.name ? "rgba(240,100,80,0.6)" : undefined }} />
                  {errors.name && <p className="font-body text-[.72rem] text-red-400 mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label className={lbl}>Email *</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")}
                    className={inp} style={{ borderColor: errors.email ? "rgba(240,100,80,0.6)" : undefined }} />
                  {errors.email && <p className="font-body text-[.72rem] text-red-400 mt-1.5">{errors.email}</p>}
                </div>
              </div>

              {/* Company */}
              <div>
                <label className={lbl}>Company / Project</label>
                <input type="text" placeholder="Optional" value={form.company} onChange={set("company")} className={inp} />
              </div>

              {/* Service */}
              <div>
                <label className={lbl}>Service interested in</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                  {SERVICES_LIST.map(s => (
                    <button key={s} type="button" onClick={() => toggle("service", s)}
                      className="font-body text-[.78rem] border px-3 py-2.5 text-left transition-all duration-200"
                      style={{
                        borderColor: form.service === s ? "var(--color-foreground)" : "var(--color-border)",
                        color:       form.service === s ? "var(--color-foreground)" : "var(--color-muted)",
                        background:  form.service === s ? "var(--color-surface)"    : "transparent",
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className={lbl}>Budget range</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {BUDGETS.map(b => (
                    <button key={b} type="button" onClick={() => toggle("budget", b)}
                      className="font-body text-[.78rem] border px-3 py-2.5 text-left transition-all duration-200"
                      style={{
                        borderColor: form.budget === b ? "var(--color-foreground)" : "var(--color-border)",
                        color:       form.budget === b ? "var(--color-foreground)" : "var(--color-muted)",
                        background:  form.budget === b ? "var(--color-surface)"    : "transparent",
                      }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={lbl}>Tell us about your project *</label>
                <textarea rows={5} placeholder="What are you building? What's the challenge? What does success look like?"
                  value={form.message} onChange={set("message")} className={inp}
                  style={{ resize: "none", borderColor: errors.message ? "rgba(240,100,80,0.6)" : undefined }} />
                {errors.message && <p className="font-body text-[.72rem] text-red-400 mt-1.5">{errors.message}</p>}
              </div>

              {/* Submit */}
              <div className="flex items-center gap-6 pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="font-body text-[.82rem] text-foreground border border-foreground px-8 py-3.5 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : "Send message →"}
                </button>
                {status === "error" && (
                  <p className="font-body text-[.78rem] text-red-400">Something went wrong. Please try again.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* INFO SIDEBAR */}
        <div ref={infoRef} className="space-y-10">
          <div>
            <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-4">New business</p>
            <a href="mailto:hello@exovio.agency"
              className="font-body text-[.85rem] text-foreground hover:opacity-60 transition-opacity duration-300 border-b border-foreground pb-px">
              hello@exovio.agency
            </a>
          </div>
          <div>
            <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-4">Based in</p>
            <p className="font-body text-[.85rem] text-muted leading-[1.8]">Nashik, Maharashtra<br />India</p>
          </div>
          <div>
            <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-4">Social</p>
            <div className="space-y-3">
              {["Instagram", "Twitter/X", "LinkedIn"].map(s => (
                <a key={s} href="#" className="block font-body text-[.85rem] text-muted hover:text-foreground transition-colors duration-300">{s} ↗</a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-4">Response time</p>
            <p className="font-body text-[.85rem] text-muted leading-[1.8]">
              We respond within{" "}
              <em className="font-serif not-italic text-foreground">24 hours.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <SubPageShell>
      <ContactHero />
      <ContactForm />
    </SubPageShell>
  );
}
