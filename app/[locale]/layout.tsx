import type { Metadata } from "next";
import { Hind, Hind_Madurai } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { tamilLive } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const hind = Hind({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const hindMadurai = Hind_Madurai({
  subsets: ["latin", "tamil"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-madurai",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const hideFromSearch = locale === "ta" && !tamilLive;
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    robots: hideFromSearch ? { index: false, follow: false } : undefined,
  };
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${hind.variable} ${hindMadurai.variable}`}>
      <body>
        <a
          href="#main"
          style={{
            position: "absolute",
            left: 0,
            top: -100,
            padding: "var(--space-sm) var(--space-md)",
            background: "var(--color-surface-inverse)",
            color: "var(--color-text-inverse)",
            zIndex: 100,
          }}
          className="skip-link"
        >
          {locale === "ta" ? "முதன்மை உள்ளடக்கத்திற்குச் செல்" : "Skip to main content"}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main">{props.children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
