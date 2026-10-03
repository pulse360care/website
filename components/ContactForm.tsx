"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/en";
import { contactDetails } from "@/lib/contact";

type PersonaId = "family" | "pro" | "hospital" | "support";

/** Chip answers are stored as whatever the active locale displays, but the
 * inbox needs one consistent language — look up the same-position English
 * string so the email reads the same regardless of site language. */
function toEnglish(value: string | null, localOptions: readonly string[], enOptions: readonly string[]): string {
  if (!value) return "";
  const i = localOptions.indexOf(value);
  return i === -1 ? value : (enOptions[i] ?? value);
}

function ChipGroup({
  options,
  selected,
  onSelect,
  ariaLabel,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", marginTop: "var(--space-xs)" }}>
      {options.map((option) => (
        <button key={option} type="button" className="chip" aria-pressed={selected === option} onClick={() => onSelect(option)}>
          {selected === option ? "✓ " : ""}
          {option}
        </button>
      ))}
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ margin: 0, padding: 0, border: 0, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <legend style={{ padding: 0, fontSize: 17, fontWeight: 600, lineHeight: 1.5, marginBottom: "var(--space-xs)" }}>{legend}</legend>
      {children}
    </fieldset>
  );
}

export function ContactForm({ locale, dict, doctorLive }: { locale: Locale; dict: Dictionary; doctorLive: boolean }) {
  const t = dict.contact;
  const isTamil = locale === "ta";

  const [persona, setPersona] = useState<PersonaId | null>(null);

  const [kind, setKind] = useState<string | null>(null);
  const [area, setArea] = useState("");
  const [when, setWhen] = useState<string | null>(null);

  const [role, setRole] = useState<string | null>(null);
  const [registration, setRegistration] = useState<string | null>(null);

  const [org, setOrg] = useState<string | null>(null);
  const [hospitalTopic, setHospitalTopic] = useState<string | null>(null);

  const [supportTopic, setSupportTopic] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never fill this in
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: boolean; mobile?: boolean }>({});

  const nameId = useId();
  const mobileId = useId();
  const noteId = useId();
  const companyId = useId();

  const kindOptions = doctorLive ? t.family.kindFour : t.family.kindThree;
  const enKindOptions = doctorLive ? en.contact.family.kindFour : en.contact.family.kindThree;
  const roleOptions = doctorLive ? t.professional.rolesFour : t.professional.rolesThree;
  const enRoleOptions = doctorLive ? en.contact.professional.rolesFour : en.contact.professional.rolesThree;

  function pickPersona(id: PersonaId) {
    setPersona(id);
    setKind(null);
    setArea("");
    setWhen(null);
    setRole(null);
    setRegistration(null);
    setOrg(null);
    setHospitalTopic(null);
    setSupportTopic(null);
    setUrgency(null);
  }

  function reset() {
    setPersona(null);
    setKind(null);
    setArea("");
    setWhen(null);
    setRole(null);
    setRegistration(null);
    setOrg(null);
    setHospitalTopic(null);
    setSupportTopic(null);
    setUrgency(null);
    setName("");
    setMobile("");
    setNote("");
    setCompany("");
    setSubmitted(false);
    setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = {
      name: name.trim().length === 0,
      mobile: !/^\d{10}$/.test(mobile.trim()),
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.mobile) return;

    const enPersonaLabel = persona ? (en.contact.personas.find((p) => p.id === persona)?.label ?? "") : "";

    const answers: { label: string; value: string }[] = [];
    if (persona === "family") {
      answers.push(
        { label: en.contact.family.kindHeading, value: toEnglish(kind, kindOptions, enKindOptions) },
        { label: en.contact.family.areaHeading, value: area },
        { label: en.contact.family.whenHeading, value: toEnglish(when, t.family.when, en.contact.family.when) },
      );
    } else if (persona === "pro") {
      answers.push(
        { label: en.contact.professional.roleHeading, value: toEnglish(role, roleOptions, enRoleOptions) },
        { label: en.contact.professional.registrationHeading, value: toEnglish(registration, t.professional.registration, en.contact.professional.registration) },
      );
    } else if (persona === "hospital") {
      answers.push(
        { label: en.contact.hospital.orgHeading, value: toEnglish(org, t.hospital.org, en.contact.hospital.org) },
        { label: en.contact.hospital.topicHeading, value: toEnglish(hospitalTopic, t.hospital.topic, en.contact.hospital.topic) },
      );
    } else if (persona === "support") {
      answers.push(
        { label: en.contact.support.topicHeading, value: toEnglish(supportTopic, t.support.topic, en.contact.support.topic) },
        { label: en.contact.support.urgencyHeading, value: toEnglish(urgency, t.support.urgency, en.contact.support.urgency) },
      );
    }

    setStatus("submitting");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ENQUIRY_URL ?? "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: enPersonaLabel,
          answers: answers.filter((a) => a.value),
          name,
          tel: mobile,
          more: note,
          company,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    const summaryParts = [
      persona ? t.personas.find((p) => p.id === persona)?.label ?? null : null,
      kind,
      area,
      when,
      role,
      registration,
      org,
      hospitalTopic,
      supportTopic,
      urgency,
    ].filter((v): v is string => Boolean(v));

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", alignItems: "flex-start", maxWidth: "70ch", padding: "var(--space-lg) var(--space-md)", border: "1px solid var(--color-border-brand)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)" }}>
        <h2 style={{ margin: 0, fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>{t.sent.title}</h2>
        <p style={{ margin: 0, fontSize: "var(--step-lead-en)", lineHeight: isTamil ? "var(--leading-lead-ta)" : "var(--leading-lead-en)", color: "var(--color-text-secondary)" }}>{t.sent.body}</p>
        {summaryParts.length ? (
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{summaryParts.join(" · ")}</p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          style={{ minHeight: 48, padding: "0 var(--space-lg)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", background: "var(--color-surface-base)", font: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
        >
          {t.startAgain}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)", maxWidth: "76ch" }}>
      <Fieldset legend={t.personaLegend}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "var(--space-sm)" }}>
          {t.personas.map((p) => {
            const on = persona === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => pickPersona(p.id as PersonaId)}
                aria-pressed={on}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "flex-start",
                  textAlign: "left",
                  minHeight: 48,
                  padding: "var(--space-md)",
                  border: `1px solid ${on ? "var(--color-border-brand)" : "var(--color-border-default)"}`,
                  borderRadius: "var(--radius-md)",
                  background: on ? "var(--color-surface-selected)" : "var(--color-surface-base)",
                  font: "inherit",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, color: on ? "var(--color-text-brand)" : "var(--color-text-primary)" }}>{p.label}</span>
                <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{p.hint}</span>
              </button>
            );
          })}
        </div>
      </Fieldset>

      {persona === "family" ? (
        <>
          <Fieldset legend={t.family.kindHeading}>
            <ChipGroup options={kindOptions} selected={kind} onSelect={setKind} ariaLabel={t.family.kindHeading} />
          </Fieldset>
          <Fieldset legend={t.family.areaHeading}>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder={t.family.areaPlaceholder}
              aria-label={t.family.areaHeading}
              style={{ minHeight: 48, maxWidth: "44ch", width: "100%", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "0 var(--space-md)", fontSize: 17, fontFamily: "inherit" }}
            />
          </Fieldset>
          <Fieldset legend={t.family.whenHeading}>
            <ChipGroup options={t.family.when} selected={when} onSelect={setWhen} ariaLabel={t.family.whenHeading} />
          </Fieldset>
        </>
      ) : null}

      {persona === "pro" ? (
        <>
          <Fieldset legend={t.professional.roleHeading}>
            <ChipGroup options={roleOptions} selected={role} onSelect={setRole} ariaLabel={t.professional.roleHeading} />
          </Fieldset>
          <Fieldset legend={t.professional.registrationHeading}>
            <ChipGroup options={t.professional.registration} selected={registration} onSelect={setRegistration} ariaLabel={t.professional.registrationHeading} />
          </Fieldset>
        </>
      ) : null}

      {persona === "hospital" ? (
        <>
          <Fieldset legend={t.hospital.orgHeading}>
            <ChipGroup options={t.hospital.org} selected={org} onSelect={setOrg} ariaLabel={t.hospital.orgHeading} />
          </Fieldset>
          <Fieldset legend={t.hospital.topicHeading}>
            <ChipGroup options={t.hospital.topic} selected={hospitalTopic} onSelect={setHospitalTopic} ariaLabel={t.hospital.topicHeading} />
          </Fieldset>
        </>
      ) : null}

      {persona === "support" ? (
        <>
          <Fieldset legend={t.support.topicHeading}>
            <ChipGroup options={t.support.topic} selected={supportTopic} onSelect={setSupportTopic} ariaLabel={t.support.topicHeading} />
          </Fieldset>
          <Fieldset legend={t.support.urgencyHeading}>
            <ChipGroup options={t.support.urgency} selected={urgency} onSelect={setUrgency} ariaLabel={t.support.urgencyHeading} />
          </Fieldset>
        </>
      ) : null}

      {persona ? (
        <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <Fieldset legend={t.reachLegend}>
            <div>
              <label htmlFor={nameId} style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: "var(--space-2xs)" }}>
                {t.nameLabel}
              </label>
              <input
                id={nameId}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                aria-invalid={errors.name || undefined}
                style={{ minHeight: 48, width: "100%", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "0 var(--space-md)", fontSize: 17, fontFamily: "inherit" }}
              />
              {errors.name ? (
                <div role="alert" style={{ marginTop: "var(--space-2xs)", fontSize: 13, color: "var(--color-error-text)" }}>
                  {t.errors.required}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor={mobileId} style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: "var(--space-2xs)" }}>
                {t.mobileLabel}
              </label>
              <input
                id={mobileId}
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder={t.mobilePlaceholder}
                inputMode="numeric"
                autoComplete="tel"
                aria-invalid={errors.mobile || undefined}
                style={{ minHeight: 48, width: "100%", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "0 var(--space-md)", fontSize: 17, fontFamily: "inherit" }}
              />
              {errors.mobile ? (
                <div role="alert" style={{ marginTop: "var(--space-2xs)", fontSize: 13, color: "var(--color-error-text)" }}>
                  {t.errors.mobile}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor={noteId} style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: "var(--space-2xs)" }}>
                {t.noteLabel} <span style={{ fontWeight: 400, color: "var(--color-text-secondary)" }}>({t.noteOptional})</span>
              </label>
              <textarea
                id={noteId}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                style={{ width: "100%", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-sm) var(--space-md)", fontSize: 17, lineHeight: 1.6, fontFamily: "inherit" }}
              />
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)", padding: "var(--space-sm) var(--space-md)", borderLeft: "3px solid var(--color-border-brand)", background: "var(--color-surface-base)" }}>
              {t.noMedical}
            </p>
          </Fieldset>

          <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }} aria-hidden="true">
            <label htmlFor={companyId}>Company</label>
            <input id={companyId} name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            style={{ minHeight: 56, minWidth: 220, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "var(--space-sm) var(--space-lg)", border: "none", borderRadius: "var(--radius-md)", background: "var(--color-action-primary)", color: "var(--color-action-primary-text)", fontSize: 17, fontWeight: 600, cursor: "pointer" }}
          >
            {status === "submitting" ? t.sendingLabel : t.sendLabel}
          </button>
          {status === "error" ? (
            <div role="alert" style={{ fontSize: 13, color: "var(--color-error-text)" }}>
              {t.errors.sendFailed}{" "}
              <a href={contactDetails.whatsappHref} style={{ color: "inherit", textDecoration: "underline" }}>
                {t.errors.sendFailedWhatsapp}
              </a>
            </div>
          ) : null}
          <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{t.submitHelper}</div>
        </form>
      ) : null}
    </div>
  );
}
