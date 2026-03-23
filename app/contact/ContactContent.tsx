"use client";

import { useState } from "react";
import AnimatedLabel from "@/components/animations/AnimatedLabel";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import FadeIn from "@/components/animations/FadeIn";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/hello.exovio/" },
  { label: "X", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/exovio-ai/" },
];

const BUDGET_OPTIONS = ["$5k – $10k", "$10k – $25k", "$25k – $50k", "$50k+"];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill in your name, email, and message.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full bg-transparent text-[#1A1A1A] border-b border-[#D9D4CE] py-4 text-sm " +
    "placeholder:text-[#8B8680] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-300";

  return (
    <div className="bg-[#F5F0EB]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-32 md:py-40 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <FadeIn direction="up">
            <AnimatedLabel>Get In Touch</AnimatedLabel>
          </FadeIn>

          <AnimatedHeading
            className="font-display font-light text-foreground leading-[0.95] tracking-tight max-w-4xl"
            style={
              { fontSize: "clamp(2rem, 4vw, 4.5rem)" } as React.CSSProperties
            }
            delay={0.1}
          >
            Let&apos;s build something extraordinary together
          </AnimatedHeading>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────── */}
      <section className="pb-20 md:pb-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0">
          {/* Left — Contact info */}
          <FadeIn direction="up" className="md:col-span-4 flex flex-col">
            <p className="text-sm text-muted uppercase tracking-widest mb-8">
              Reach out
            </p>

            <a
              href="mailto:hello.exovio@gmail.com"
              data-cursor-hover
              className="text-lg text-foreground hover:underline underline-offset-4 transition-all duration-300"
            >
              hello.exovio@gmail.com
            </a>

            <p className="text-sm text-muted mt-4">Nagpur, India</p>

            <p className="text-sm text-muted mt-8">
              Currently accepting projects for Q2 2026
            </p>

            <div className="flex flex-col gap-3 mt-12">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  data-cursor-hover
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-all duration-300 hover:translate-x-1 inline-block w-fit"
                >
                  {label}
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Right — Contact form / Success */}
          <div className="md:col-span-7 md:col-start-6 min-h-[500px]">
            {success ? (
              <div className="flex flex-col gap-4 pt-8">
                <p
                  className="font-display font-light text-foreground leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  Message sent!
                </p>
                <p className="text-sm text-muted">
                  We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-10">
                  <FadeIn direction="up" delay={0.1}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs text-muted uppercase tracking-widest mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Johnson"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" delay={0.2}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs text-muted uppercase tracking-widest mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" delay={0.3}>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-xs text-muted uppercase tracking-widest mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={
                          inputClass + " cursor-pointer appearance-none"
                        }
                      >
                        <option
                          value=""
                          disabled
                          className="bg-[#F5F0EB] text-[#8B8680]"
                        >
                          Select a range
                        </option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-[#F5F0EB] text-[#1A1A1A]"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" delay={0.4}>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs text-muted uppercase tracking-widest mb-2"
                      >
                        Tell Us About Your Project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Share what you're building, your timeline, and any context that helps us understand the project."
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={inputClass + " resize-none min-h-[120px]"}
                      />
                    </div>
                  </FadeIn>

                  {formError && (
                    <p className="text-sm text-red-400">{formError}</p>
                  )}

                  <FadeIn direction="up" delay={0.5}>
                    <button
                      type="submit"
                      disabled={sending}
                      className={[
                        "mt-8 w-full rounded-full bg-[#1A1A1A] text-[#F5F0EB] py-4 text-sm uppercase tracking-widest transition-all duration-300",
                        sending
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#C17F59]",
                      ].join(" ")}
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                  </FadeIn>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-12 text-center text-sm text-subtle">
          We typically respond within 24 hours.
        </p>
      </section>
    </div>
  );
}
