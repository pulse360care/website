import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n";
import { doctorLive, foundersVisible } from "@/lib/config";
import { contactDetails } from "@/lib/contact";
import { Hero } from "@/components/Hero";
import { WhatWeCheck } from "@/components/WhatWeCheck";
import { AboutStrip } from "@/components/AboutStrip";
import { ServiceRow } from "@/components/ServiceRow";
import { Marquee } from "@/components/Marquee";
import { StepStrip } from "@/components/StepStrip";
import { Founders } from "@/components/Founders";
import { WhyWeStarted } from "@/components/WhyWeStarted";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Faq } from "@/components/Faq";
import { JoinUsTeaser } from "@/components/JoinUsTeaser";
import { ArticlesTeaser } from "@/components/ArticlesTeaser";
import { CtaBand } from "@/components/CtaBand";
import { ContactTeaser } from "@/components/ContactTeaser";
import { Reveal } from "@/components/Reveal";
import { notFound } from "next/navigation";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const home = dict.home;

  const hero = doctorLive ? home.hero.fourService : home.hero.threeService;
  const services = doctorLive
    ? home.services.four.map((item, i) => ({ ...item, brandPill: i === 0 }))
    : home.services.three;
  const servicesSub = doctorLive ? home.services.subFour : home.services.subThree;
  const step4 = doctorLive ? home.howItWorks.step4Four : home.howItWorks.step4Three;
  const steps = home.howItWorks.steps.map((s, i) => ({ ...s, n: String(i + 1), stepLabel: `${home.howItWorks.stepLabel} 0${i + 1}` }));
  const allSteps = [...steps, { ...step4, n: "4", stepLabel: `${home.howItWorks.stepLabel} 04` }];

  const marqueeItems = [
    ...(doctorLive ? [home.services.four[0].title] : []),
    ...home.services.three.map((s) => s.title),
    ...home.marquee.extra,
  ];

  const joinRoles = dict.professionals.roles.slice(0, doctorLive ? 4 : 3);

  const contactRows = [
    { label: dict.contact.whatsappLabel, value: contactDetails.whatsapp, href: contactDetails.whatsappHref },
    { label: dict.contact.phoneLabel, value: contactDetails.phone, href: contactDetails.phoneHref },
    { label: dict.contact.emailLabel, value: contactDetails.email, href: contactDetails.emailHref },
  ];

  return (
    <div>
      <Hero locale={locale} dict={dict} lines={hero.lines} lead={hero.lead} />

      <Reveal>
        <WhatWeCheck eyebrow={home.check.eyebrow} title={home.check.title} body={home.check.body} brief={home.check.brief} rows={home.check.rows} />
      </Reveal>

      <Reveal>
        <AboutStrip eyebrow={home.about.eyebrow} title={home.about.title} lead={home.about.lead} strip={home.about.strip} />
      </Reveal>

      <Reveal>
        <ServiceRow heading={home.services.heading} sub={servicesSub} items={services} />
      </Reveal>

      <Marquee items={marqueeItems} pauseLabel={home.marquee.pause} playLabel={home.marquee.play} />

      <Reveal>
        <StepStrip heading={home.howItWorks.heading} meansLabel={home.howItWorks.meansLabel} steps={allSteps} />
      </Reveal>

      {foundersVisible ? (
        <Reveal>
          <Founders eyebrow={home.founders.eyebrow} heading={home.founders.heading} note={home.founders.note} people={home.founders.people} />
        </Reveal>
      ) : null}

      <Reveal>
        <WhyWeStarted eyebrow={home.why.eyebrow} body={home.why.body} signature={home.why.signature} />
      </Reveal>

      <Reveal>
        <ComparisonTable heading={home.comparison.heading} sub={home.comparison.sub} onYourOwnLabel={home.comparison.onYourOwn} withPulseLabel={home.comparison.withPulse} rows={home.comparison.rows} />
      </Reveal>

      <Reveal>
        <Faq eyebrow={home.faq.eyebrow} heading={home.faq.heading} items={home.faq.items} />
      </Reveal>

      <Reveal>
        <JoinUsTeaser
          eyebrow={home.joinTeaser.eyebrow}
          heading={home.joinTeaser.heading}
          body={doctorLive ? home.joinTeaser.bodyFour : home.joinTeaser.bodyThree}
          zone={home.joinTeaser.zone}
          roles={joinRoles}
          cta={home.joinTeaser.cta}
          ctaHref={contactDetails.whatsappHref}
        />
      </Reveal>

      <Reveal>
        <ArticlesTeaser locale={locale} eyebrow={home.articlesTeaser.eyebrow} heading={home.articlesTeaser.heading} posts={dict.blog.posts} />
      </Reveal>

      <Reveal>
        <CtaBand locale={locale} wordmark={dict.nav.brand} title={home.ctaBand.title} brief={home.ctaBand.brief} ctaLabel={home.ctaLabel} />
      </Reveal>

      <Reveal>
        <ContactTeaser
          locale={locale}
          eyebrow={home.contactTeaser.eyebrow}
          heading={home.contactTeaser.heading}
          body={home.contactTeaser.body}
          cta={home.contactTeaser.cta}
          contactRows={contactRows}
          emergencyNote={home.contactTeaser.emergencyNote}
        />
      </Reveal>
    </div>
  );
}
