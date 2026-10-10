// CHANGES-2026-10-10 #7: explicit block-type union for article bodies.
// Declared here (not inferred) so `t` stays a literal ("h"/"h3"/...)
// instead of widening to `string` — see the `satisfies Post[]` below,
// which checks against this without losing that narrowing.
export type ArticleBlock =
  | string
  | { t: "h"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "note"; text: string }
  | { t: "q"; q: string; text: string };

export type Post = {
  slug: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  body: ArticleBlock[];
  brief: string;
  reviewed: boolean;
};

export const en = {
  meta: {
    title: "Pulse — home healthcare in Chennai and its surroundings",
    description:
      "Doctor consultations, nursing, physiotherapy and lab collection, arranged at home in Chennai and its surroundings.",
    // CHANGES-2026-10-10 #1: dropped "and caregivers" — item 2 (the
    // Caregivers service) is out of scope for this slice.
  },
  nav: {
    brand: "Pulse",
    home: "Home",
    about: "About",
    techTrust: "Trust",
    blog: "Articles",
    professionals: "Professionals",
    hospitals: "Hospitals",
    contact: "Contact",
  },
  header: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langToggleLabel: "Language",
  },
  footer: {
    blurb: "Home care visits in Chennai and its surroundings.",
    pagesHeading: "Pages",
    elsewhereHeading: "Find us",
    // CHANGES-2026-10-03 #4: Instagram/YouTube removed until those
    // accounts exist (previously kept as hidden placeholders).
    social: ["WhatsApp"],
    contactHeading: "Contact",
    localityLink: "Chennai and surroundings",
    // CHANGES-2026-10-10 #5 — verbatim from v4.
    doctorLedTagline: "A doctor-led home healthcare service, Chennai.",
    legal: "© Pulse360Care. Placeholder legal line",
    privacy: "Privacy",
    terms: "Terms",
  },
  home: {
    /** Shared by the hero and the CTA band — one primary CTA, one label. */
    ctaLabel: "Tell us what you need",
    hero: {
      eyebrow: "Chennai · care at home",
      fourService: {
        lines: ["Care comes to", "your parents —", "at home"],
        // CHANGES-2026-10-10 #1: doctor consultation is home-only now, no
        // remote exception. "and caregivers" dropped — item 2 out of scope.
        lead: "Doctor consultations, nursing, physiotherapy and lab collection, arranged at home in Chennai and its surroundings.",
      },
      threeService: {
        lines: ["Care comes to", "your parents —", "at home"],
        lead: "Nursing, physiotherapy and lab collection, arranged in Chennai and its surroundings. You pick the time. We arrange the rest.",
      },
      locationPill: "Starting in Chennai and its surroundings",
      heroBrief: "A nurse and an elderly man at a doorway in a Chennai home, warm daylight, not clinical. Subject right-of-centre.",
      heroTrust: ["Checked by a person", "Works in Tamil", "One price, agreed first"],
      secondaryCta: "Talk to someone",
      // CHANGES-2026-10-10 #5: small secondary line under the CTA buttons.
      doctorLedNote: "Founded and run by doctors in Chennai.",
    },
    trustStrip: [
      // CHANGES-2026-10-10 #3: police verification removed.
      "Government ID checked on every person who visits",
      "Nursing council registration checked before a first visit",
      "The same attender returns for repeat visits wherever possible",
      "One price, told to you before anyone is booked",
    ],
    services: {
      heading: "What we arrange",
      // CHANGES-2026-10-10 #1/#2: doctor consultation is home-only, no
      // video; Caregivers added, so the counts in both sub-headings move up.
      subFour: "Five services, all at home.",
      subThree: "Four services, every one of them at your parents’ home in Chennai and its surroundings.",
      four: [
        {
          pill: "At home",
          title: "Doctor consultation",
          body: "A doctor visits you at home. They can refer you straight on.",
          brief: "Doctor checking an elderly woman's blood pressure in her Chennai living room, family member beside her.",
        },
        {
          pill: "At home",
          title: "Home nursing",
          body: "Injections, dressings, tube care, vitals.",
          brief: "Nurse changing a dressing for an elderly man at home, daylight, no clinical set.",
        },
        {
          pill: "At home",
          title: "Home physiotherapy",
          body: "Post-surgery and mobility sessions.",
          brief: "Physiotherapist guiding an older woman through a step exercise beside a bed.",
        },
        {
          pill: "At home",
          title: "Home lab collection",
          body: "Someone comes to the house to take the sample, so nobody has to travel.",
          brief: "Sample collector labelling a vial at a dining table, hands in focus.",
        },
        // CHANGES-2026-10-10 #2 — verbatim from v4.
        {
          pill: "At home",
          title: "Caregivers",
          body: "Day-to-day care and support at home: meals, bathing, moving around safely, company.",
          brief: "Caregiver helping an elderly woman walk from bedroom to living room, steady hand at her elbow, daylight.",
        },
      ],
      three: [
        {
          pill: "At home",
          title: "Home nursing",
          body: "Injections, dressings, catheter and tube care, vitals — by a registered nurse.",
          brief: "Nurse changing a dressing for an elderly man at home, daylight, no clinical set.",
        },
        {
          pill: "At home",
          title: "Home physiotherapy",
          body: "Post-surgery, stroke and mobility sessions, in the room your parent already uses.",
          brief: "Physiotherapist guiding an older woman through a step exercise beside a bed.",
        },
        {
          pill: "At home",
          title: "Home lab collection",
          body: "Someone comes to the house to take the sample, so nobody has to travel.",
          brief: "Sample collector labelling a vial at a dining table, hands in focus.",
        },
        // CHANGES-2026-10-10 #2 — verbatim from v4.
        {
          pill: "At home",
          title: "Caregivers",
          body: "Day-to-day care and support at home: meals, bathing, moving around safely, company.",
          brief: "Caregiver helping an elderly woman walk from bedroom to living room, steady hand at her elbow, daylight.",
        },
      ],
    },
    howItWorks: {
      heading: "Four steps, and you are told what happens at each one",
      stepLabel: "Step",
      meansLabel: "What this means",
      steps: [
        {
          title: "Tell us what is needed",
          body: "A short call or a message. No forms about the patient.",
          brief: "Woman in her forties on a phone at a kitchen table, evening light.",
          // CHANGES-2026-10-10 #2: Caregivers added, so the count moves up.
          items: ["Five services", "Your address", "A time that suits you"],
        },
        {
          title: "We match a verified professional",
          body: "From people already checked and working in your neighbourhood.",
          brief: "Operations reviewer at a desk comparing a certificate against a screen.",
          items: ["Confirmed before the visit", "Their name and qualification", "Someone else if they cannot come"],
        },
        {
          title: "You confirm the time and the price",
          body: "Nothing is fixed until you say yes to both.",
          brief: "Professional at a front door being greeted, seen from inside the house.",
          items: ["Told if anything changes", "Updates on WhatsApp", "Support if something goes wrong"],
        },
      ],
      step4Four: {
        title: "What comes next is written down",
        body: "You are told who is coming and when. Afterwards you get a short note of what was done — and if a doctor decides another service is needed, they refer you to it. A prescription the doctor writes is recorded here for your reference; Pulse does not issue it. The Pulse app is coming soon.",
        brief: "Two generations looking at a phone together on a veranda.",
        items: ["Referral from your doctor", "Your reports in one place", "App coming soon"],
      },
      step4Three: {
        title: "What comes next is written down",
        body: "You are told who is coming and when. Afterwards you get a short note of what was done, and when the next visit is due — not a phone call you have to remember. The Pulse app is coming soon.",
        brief: "Two generations looking at a phone together on a veranda.",
        items: ["Your reports in one place", "Nothing to repeat next time", "App coming soon"],
      },
    },
    comparison: {
      heading: "Arranging care should not depend on luck",
      sub: "Compared with arranging it yourself through calls and references.",
      onYourOwn: "Doing it yourself",
      withPulse: "With Pulse",
      rows: [
        { a: "Ask relatives for a phone number", b: "Someone already checked by us" },
        { a: "Hope they are qualified", b: "Registration verified by a person", emphasize: true },
        { a: "Guess what a fair price is", b: "One price, agreed beforehand" },
        { a: "Nobody to call when it goes wrong", b: "Support that answers" },
        { a: "Start again for the next service", b: "Records stay in one place" },
      ],
    },
    founders: {
      eyebrow: "Who we are",
      // CHANGES-2026-10-10 #5 — verbatim from v4.
      heading: "Started by two doctors",
      note: "We are not listing our professionals here. They are verified, and you will meet the one assigned to your visit — but we do not advertise individuals.",
      // CHANGES-2026-10-10 #6 — real names and bios, verbatim from v4.
      people: [
        {
          name: "Dr N Sidhhartha Shankar, MBBS, MD, DNB",
          role: "Founder",
          bio: "Witnessing critical ICU delays firsthand inspired me to build a home healthcare platform that brings doctors and nurses directly to patients before emergencies strike. By delivering timely, proactive medical support at home, we help families catch health issues early, avoid unnecessary hospitalizations, and bridge the gap to better care.",
          brief: "Portrait of Sidhu, founder of Pulse.",
        },
        {
          name: "Dr E S Prem Anand, MBBS, MD, DNB",
          role: "Co-founder",
          bio: "Inspired by caring for my own grandparents, I transitioned from my work as a radiologist to build a home-based healthcare platform centered on dignity and independence. We deliver trusted medical, nursing, and daily support directly to families, making compassionate quality care accessible right where it matters most.",
          brief: "Portrait of Prem, co-founder of Pulse.",
        },
      ],
    },
    check: {
      eyebrow: "What we check",
      title: "Your care in checked hands",
      // CHANGES-2026-10-10 #5 — verbatim from v4.
      body: "Every professional is reviewed by our medical team, led by doctors, before they can visit anyone. Not a form, not software — someone reads the documents.",
      brief: "Operations reviewer's desk: certificate, ID and laptop, hands only, no face.",
      rows: [
        "Council registration number, checked against the certificate",
        "Government ID, matched to the name and the photograph",
        "Re-checked every year, not once at sign-up",
      ],
    },
    about: {
      eyebrow: "About us",
      title: "Care built around the person arranging it",
      lead: "The person carrying all of this is almost never the patient. It is a working adult, often on the phone from another city, for a parent. That is who we build for.",
      strip: [
        "Daughter on a phone in an office, worried but composed.",
        "Nurse and elderly patient talking, both seated, home interior.",
        "Chennai street outside a home, autos and a compound wall.",
      ],
    },
    why: {
      eyebrow: "Why we started",
      body: "Placeholder. A short statement from the founder about the family situation that started this — in their own words, not marketing copy. This section stands where a testimonials block would normally go. We have no patients yet, so we are not inventing any.",
      signature: "Sidhu, Chennai",
      // CHANGES-2026-10-03 #2 — real copy, held behind whyStartedApproved
      // (lib/config.ts) until the owner signs off. Verbatim from v4.
      bodyFinal:
        "When someone in our own family came home from hospital, the hardest part was not the illness. It was the phone calls: finding a nurse, wondering whether she was qualified, and hoping she would turn up. We started Pulse so that other families in Chennai can get checked, qualified care at home without depending on luck or a friend of a friend.",
      // CHANGES-2026-10-10 #5: added the "Dr" honorific. Still gated behind
      // whyStartedApproved (lib/config.ts) — unchanged by this slice.
      signatureFinal: "Dr Sidhu and Dr Prem, founders, Chennai",
    },
    faq: {
      eyebrow: "Common questions",
      heading: "What families ask first",
      items: [
        {
          q: "Which areas do you cover?",
          a: "We are starting with areas in and around Chennai. We will provide support if possible beyond that.",
        },
        {
          q: "How do I know the professional is qualified?",
          a: "Someone on our team checks their council registration against their certificate, and their ID against their name, before they can take any booking.",
        },
        {
          q: "Can I choose the nurse myself?",
          a: "No. We assign a verified professional, and send someone else if the first cannot come.",
        },
        { q: "How do I pay?", a: "We agree the price with you before the visit and tell you how to pay." },
        {
          q: "Is my information private?",
          a: "The professional visiting sees the address and the reason for the visit, nothing else. Every view of a record is logged.",
        },
        {
          q: "What if something goes wrong?",
          a: "Call or message us. A low rating opens a support case automatically, and someone answers in Tamil or English.",
        },
      ],
    },
    joinTeaser: {
      eyebrow: "Join us",
      heading: "Work near where you live",
      // CHANGES-2026-10-10 #2: bodyFour verbatim from v4/CHANGES; bodyThree
      // adapted the same way (dropping "doctors").
      bodyThree: "For nurses, physiotherapists, sample collectors and caregivers in Chennai and its surroundings. Joining is free, and there are never more than three documents.",
      bodyFour: "For doctors, nurses, physiotherapists, sample collectors and caregivers in Chennai and its surroundings. Joining is free, and there are never more than three documents.",
      zone: "Chennai · zone based",
      cta: "Message us on WhatsApp",
    },
    articlesTeaser: {
      eyebrow: "Articles",
      heading: "Plain answers to the questions families ask",
    },
    marquee: {
      pause: "Pause",
      play: "Play",
      extra: ["Tamil and English", "Verified by a person"],
    },
    ctaBand: {
      title: "Take the first step for your parent",
      brief: "Wide: professional walking down a Chennai residential street with a bag, morning.",
    },
    contactTeaser: {
      eyebrow: "Contact",
      heading: "Get in touch",
      body: "We reply in Tamil or English, between 9am and 8pm.",
      cta: "Open the contact form",
      emergencyNote: "In an emergency do not use this page. Call 108.",
    },
  },
  verification: {
    heading: "Verification, in three steps",
    steps: [
      {
        title: "Identity",
        // CHANGES-2026-10-10 #3: police verification removed.
        body: "Government photo ID, confirmed against the person who arrives at your door.",
      },
      {
        title: "Qualification",
        body: "Nursing council registration, or a training certificate for attenders, confirmed directly with the body that issued it — not accepted as a photocopy.",
      },
      {
        title: "In person",
        body: "A face-to-face interview before anyone is listed, and again every year. This is the step that cannot be automated, so it is the one we spend the most time on.",
      },
    ],
    badge: "Verified by Pulse",
    badgeNote: "The stamp appears next to a professional only while all three checks are current. If a check lapses, the stamp disappears before the person does.",
  },
  about: {
    eyebrow: "About us",
    h1: "We started this because arranging care for a parent should not depend on luck.",
    lead: "When someone comes home from hospital, the family is handed a list of things to arrange and no way to arrange them.",
    whatWeWillDo: {
      eyebrow: "What we will do",
      heading: "Some things we have decided to always do",
      items: [
        "We will send only people we have checked ourselves, and tell you who is coming before they arrive.",
        "We will leave diagnosis to qualified doctors, so every medical answer comes from a person you can speak to.",
        "We will be clear about where we can reach today, and grow area by area.",
        "We will point you to 108 straight away if it is an emergency.",
      ],
    },
  },
  techTrust: {
    eyebrow: "Trust",
    h1: "How we check the person who knocks on your door.",
    intro: "Manual verification is slow and expensive and that's why we do it.",
    trustBlocks: [
      {
        head: "What we ask for",
        mark: "✓",
        items: [
          "The address the visit happens at",
          "A name and a mobile number",
          "The reason for the visit, in your own words",
        ],
      },
      {
        // CHANGES-2026-10-10 #4 — verbatim from v4.
        head: "Your health stays private",
        mark: "✓",
        items: [
          "Health details are shared only with the professional caring for you, in person.",
          "Book with just the basics. No test results or diagnosis needed.",
          "Our forms stay short and simple, with no medical questions.",
        ],
      },
      {
        head: "Who can see it",
        mark: "✓",
        items: [
          "The professional visiting you sees the address and the reason for the visit. Nothing else.",
          "Every view of a record is logged.",
          "We do not sell anything about you to anyone.",
        ],
      },
      {
        head: "How long we keep it",
        mark: "✓",
        items: [
          "Records you keep here stay until you delete them.",
          "A record of your prescription is kept for reference.",
          "Ask us to remove everything and we will.",
        ],
      },
    ],
  },
  blog: {
    eyebrow: "Articles",
    h1: "Plain answers to the questions families actually ask.",
    intro: "Written for someone tired and worried, not for a search engine.",
    // CHANGES-2026-10-03 #3 — replaces the previous 4 placeholder posts
    // with v4's 3 real articles, copied verbatim. `reviewed` gates
    // noindex + sitemap exclusion (app/sitemap.ts, blog/[slug]/page.tsx)
    // until a clinician signs off.
    // Order is newest first (CHANGES-2026-10-10 #7). `image` is a stable
    // per-post key for /images/panels/panel-{image}.png — deliberately NOT
    // derived from array position, because prepending the newest post would
    // otherwise silently reassign every older post's photo.
    posts: [
      // CHANGES-2026-10-10 #7 — new article, copied verbatim from
      // articles[0] in v4.dc.html. Body mixes plain paragraphs with typed
      // blocks (h/h3/ul/note/q); see blog/[slug]/page.tsx for the renderer
      // and the FAQPage JSON-LD built from the five `q` blocks.
      {
        slug: "keeping-the-bigger-picture-between-visits",
        date: "October 2026",
        readTime: "5 min read",
        title: "Home nursing care: how to keep the bigger picture between visits",
        excerpt: "Each visit tells you about that day. Here is how families keep the weeks in between connected.",
        image: "art-3",
        body: [
          "When a parent needs nursing at home, whether they are getting older or recovering after a hospital stay, each visit tends to be arranged on its own. A nurse comes, does what was asked, and leaves. The next need can feel like starting again from the beginning.",
          "Home nursing is genuinely valuable. But for families managing care over weeks or months, the visits are only part of the picture. This guide covers why one-off visits can leave gaps, and the simple things families can do to keep everything connected.",
          { t: "h", text: "Why one-off visits can leave gaps" },
          "A single nursing visit tells you about that day: what was done, and how your parent seemed. It doesn't tell you, on its own, how things have been going across several weeks.",
          "That's not a failing of the nurse. A visit is focused on the care arranged for it. The bigger picture has to be held by someone, and in most families that someone is you.",
          "Gaps tend to appear when:",
          {
            t: "ul",
            items: [
              "Notes from each visit live in different places, or only in someone's memory",
              "More than one family member is involved and nobody has the full story",
              "The person arranging care lives in another city or another country",
              "Your parent's own doctor doesn't hear about what's happening at home",
            ],
          },
          "None of these needs special tools to fix. They need a little structure.",
          { t: "h", text: "Practical steps for families" },
          { t: "h3", text: "Keep one simple care notebook" },
          "A notebook, a shared note on your phone or a WhatsApp group with just the people involved will do. After each visit, write down:",
          {
            t: "ul",
            items: [
              "The date and which service it was (nursing, physiotherapy, lab test, caregiver or doctor visit)",
              "What was done",
              "Anything the nurse or doctor asked the family to watch for or follow up on",
              "Questions that came up and haven't been answered yet",
            ],
          },
          "Keep it factual. The aim is not to assess your parent's health yourself. It is to make sure nothing anyone asked you to remember gets lost.",
          { t: "h3", text: "Ask the same few questions after every visit" },
          "Before the nurse leaves, it helps to ask:",
          {
            t: "ul",
            items: [
              "“Is there anything you'd like us to keep an eye on before the next visit?”",
              "“Is there anything we should mention to the doctor?”",
              "“When do you think the next visit should be?”",
            ],
          },
          "Asking the same questions each time makes it easier to see if something has changed.",
          { t: "h3", text: "Keep the doctor in the loop" },
          "Home nursing works best alongside a doctor, not instead of one. If your parent has a regular doctor, share your notebook with them at appointments. If the nurse has suggested mentioning something to a doctor, don't wait for the next routine appointment. Ask the clinic how they'd like you to raise it.",
          { t: "h3", text: "Decide who holds the bigger picture" },
          "When siblings or relatives share caregiving, agree on one person who keeps the notebook up to date and is the main contact for professionals. Others can still help. They just pass updates through that one person, so the story stays in one place.",
          { t: "h3", text: "If you're coordinating from another city or country" },
          "Many families manage a parent's care from a distance. A few things help:",
          {
            t: "ul",
            items: [
              "Ask whoever is at home, family member or neighbour, to send a short message after each visit",
              "Keep the care notebook somewhere you can both see it",
              "Know the home address details and the nearest hospital in advance, and keep them saved",
              "Choose a booking method where you can see what is booked, when, and its status, without needing a phone call each time",
            ],
          },
          { t: "h", text: "What home nursing is, and what it isn't" },
          "Home nursing is planned care in the home: support arranged in advance for a parent who is older, unwell or recovering.",
          {
            t: "note",
            text: "It is not an emergency service. If someone is seriously unwell or there is a medical emergency, call 108 or go to the nearest hospital straight away. Don't wait for a scheduled visit or try to book one.",
          },
          "Home nursing also doesn't replace your parent's own doctor or any specialist they already see. Think of it as one part of their care, and the care notebook as what links the parts together.",
          { t: "h", text: "Where Pulse fits" },
          "Pulse arranges connected home healthcare in Tamil or English, in Chennai and its surroundings. Families can book:",
          {
            t: "ul",
            items: [
              "Home nursing",
              "Home physiotherapy",
              "Home lab collection",
              "Caregivers for day-to-day support at home",
              "Doctor consultations at home",
            ],
          },
          "You choose the service and a time. Pulse then assigns a professional who has been verified before they can be booked. Fees are shown before you pay, and payment is online by UPI or card.",
          "Pulse is built around the problem this article describes: care that starts from zero each time. After a doctor's visit, if the doctor recommends nursing, physiotherapy, a lab test or a caregiver, that next step can be arranged through Pulse rather than starting a fresh search. Where a doctor writes a prescription, a record of it can be kept for reference.",
          "It doesn't replace the care notebook or your conversations with your parent's doctor. It just keeps more of the picture in one place.",
          { t: "h", text: "Frequently asked questions" },
          {
            t: "q",
            q: "Can a home nurse replace my parent's regular doctor?",
            text: "No. Home nursing supports the care your parent's doctor oversees; it doesn't replace it. Keep their doctor informed about what's happening at home.",
          },
          {
            t: "q",
            q: "How can I keep track of my parent's care if I live in another city?",
            text: "Keep one shared care notebook, ask someone at home to send a short update after each visit, and use a booking method that shows you what's booked and its status.",
          },
          {
            t: "q",
            q: "What should I ask the nurse after a home visit?",
            text: "Ask whether there's anything to keep an eye on, anything to tell the doctor, and when the next visit should be. Write the answers down.",
          },
          {
            t: "q",
            q: "Is home nursing suitable for emergencies?",
            text: "No. Home nursing is planned care. In an emergency, call 108 or go to the nearest hospital.",
          },
          {
            t: "q",
            q: "Can a doctor arrange nursing, physiotherapy, lab tests or a caregiver after a visit?",
            text: "Yes. On Pulse, if the doctor recommends one of these after a home visit, it can be arranged through us.",
          },
        ],
        brief: "Open notebook with handwritten visit notes on a dining table, a phone and reading glasses beside it, daylight.",
        reviewed: false,
      },
      {
        slug: "before-a-parent-comes-home-from-hospital",
        date: "October 2026",
        readTime: "3 min read",
        title: "What to arrange before a parent comes home from hospital",
        excerpt: "The discharge summary tells you what happened. It rarely tells you what to do on Tuesday.",
        image: "art-0",
        body: [
          "Before the day of discharge, ask the ward for three things in writing: the medicines and their timings, what the person can and cannot do yet, and the date of the next review.",
          "Then look at the house with fresh eyes. A clear path from the bed to the bathroom, a chair with arms, and a light that can be reached at night matter more than any equipment.",
          "Decide who will be at home in the first week, and when. If the doctor has asked for dressings, injections, physiotherapy or blood tests, arrange them before you leave the hospital, not after.",
          "Keep the discharge summary and the medicine list in one place where anyone visiting can find them. If something changes or worries you, call the treating doctor. In an emergency, call 108.",
        ],
        brief: "Hospital discharge paperwork on a bed, hands holding it.",
        reviewed: false,
      },
      {
        slug: "is-your-home-nurse-qualified",
        date: "October 2026",
        readTime: "2 min read",
        title: "How to tell whether a home nurse is actually qualified",
        excerpt: "There is a registration number, and there is a way to check it.",
        image: "art-1",
        body: [
          "Every qualified nurse in Tamil Nadu is registered with the Tamil Nadu Nurses and Midwives Council and has a registration number. Ask for it, and for the certificate it is printed on.",
          "Check that the name on the certificate matches the name on a government ID, and that the photograph matches the person in front of you.",
          "Ask what they were trained in and what they have done recently. A good nurse will tell you plainly what is within their training and what needs a doctor.",
          "Every professional Pulse sends has had these checks done by someone on our team, before their first visit and again every year.",
        ],
        brief: "Close crop of a nursing council registration certificate.",
        reviewed: false,
      },
      {
        slug: "physiotherapy-at-home-after-a-fracture",
        date: "October 2026",
        readTime: "2 min read",
        title: "Physiotherapy at home after a fracture",
        excerpt: "Recovery is measured in weeks of repetition, not a single appointment.",
        image: "art-2",
        body: [
          "After a fracture, the treating doctor decides when movement can start and how much weight the bone can take. Physiotherapy follows that plan; it does not replace it.",
          "Most of the work is short, regular sessions and simple exercises repeated between them. Doing them at home removes the hardest part for many families: getting someone in pain to a clinic and back.",
          "Ask the physiotherapist to write down the exercises and how often to do them, so whoever is at home can help on the days in between.",
          "Stop and call the doctor if there is new swelling, numbness, a change in colour, or pain that is getting worse rather than better.",
        ],
        brief: "Walking frame beside a bed, morning light, nobody in frame.",
        reviewed: false,
      },
    ] satisfies Post[],
    disclaimer: "General information, not medical advice.",
  },
  professionals: {
    eyebrow: "For professionals",
    h1: "Work near where you live, with the paperwork done once.",
    lead: "Joining is free. Never more than three documents, and you can send them on WhatsApp.",
    zone: "Chennai · zone based",
    rolesHeading: "Which role are you applying for?",
    // CHANGES-2026-10-10 #3: police verification removed from every role,
    // verbatim from v4.
    roles: [
      { title: "Nurse", body: "Council registration · Government ID · Photo." },
      { title: "Physiotherapist", body: "Council registration · Government ID · Photo." },
      { title: "Sample collector", body: "Training certificate · Government ID · Photo." },
      // CHANGES-2026-10-10 #2 — verbatim from v4.
      { title: "Caregiver", body: "Caregiving training or experience · Government ID · Photo." },
      {
        title: "Doctor",
        body: "Medical council registration · MBBS · Government ID.",
        note: "Doctor applications are reviewed separately, and each item is confirmed with the body that issued it. Expect it to take longer than a nursing application.",
      },
    ],
    approvalHeading: "How long approval takes",
    approvalNoteThree: "The slot is designed and reserved. No number goes here until we have measured it across real applications — a guess would be the first promise we break.",
    approvalNoteFour: "Still withheld, and now for a second reason: doctor verification and sample-collector verification are not the same job, so one published figure would be wrong for at least one role. When we publish, it will be per role or not at all.",
    whatsappCta: "Message us on WhatsApp",
  },
  hospitals: {
    eyebrow: "For hospitals",
    h1: "Refer patients to checked care at home.",
    // CHANGES-2026-10-10 #2 — verbatim from v4.
    intro: "When a patient needs nursing, physiotherapy, a lab test, a caregiver or a doctor after they leave you, the family can get it at home from someone we have checked. Pulse is run by doctors who understand discharge.",
    howHeading: "What a referral to Pulse looks like",
    hospBlocks: [
      {
        head: "One of our services, at home",
        // CHANGES-2026-10-10 #2 — verbatim from v4.
        body: "Home nursing, home physiotherapy, home lab collection, a caregiver or a doctor consultation. We confirm with the family and tell them who is coming.",
      },
      {
        head: "Verified professionals, checked by a person",
        body: "Council registration checked against the certificate, ID against the name, re-checked every year.",
      },
    ],
    cta: "Talk to us",
  },
  doctor: {
    // CHANGES-2026-10-10 #1: doctor consultation is home-only now. This
    // page isn't in CHANGES.md's table — collapsed "two ways" to one as
    // the minimal consequence of removing the video option; this specific
    // copy is my own draft, not sourced from v4.
    h1: "Talk to a doctor — at home",
    lead: "A full consultation with a registered doctor at your parents’ home, examined in person, and a referral onward if one is needed. The price is told to you before anything is booked.",
    waysHeading: "How it happens",
    ways: [
      {
        pill: "At home",
        title: "A doctor at your parents’ home",
        body: "The doctor comes to the house and examines in person. Booked the same way as a nursing or physiotherapy visit — the price is told to you before anything is booked.",
      },
    ],
    includesHeading: "What a consultation includes",
    includes: [
      {
        title: "The doctor’s own assessment",
        body: "In person. Pulse arranges the consultation; it does not take part in it.",
      },
      {
        title: "A written note afterwards",
        body: "What was discussed, kept on the same record as every other visit — so the nurse who comes on Thursday is not starting from nothing.",
      },
      {
        title: "A referral onward, if one is needed",
        body: "The doctor can refer you to home nursing, home physiotherapy or a home lab collection inside Pulse. You still confirm the time and the price yourself.",
      },
      {
        title: "A record of a prescription, if the doctor writes one",
        body: "The doctor issues any prescription through their own means. Pulse keeps a record of it for your reference, and does not issue, generate or send prescriptions.",
      },
    ],
    serviceNotSymptom: {
      title: "You ask for a service, never for a symptom",
      body: "Nothing here asks what is wrong. There is no symptom checker, no questionnaire about the patient and no “find the right doctor for your problem”. You choose a consultation, and where a doctor’s specialisation has been verified you may ask for that specialisation by name — but nothing on this site suggests which one you need. That judgement belongs to a doctor, not to a form.",
    },
    notThis: {
      title: "What this is not",
      body: "Not an emergency service. Not medical advice — nothing on this page or anywhere else on this site tells you what to do about a symptom. We do not name or picture individual doctors as a way of advertising.",
    },
    verifiedHeading: "How a doctor is verified",
    // CHANGES-2026-10-10 #3: police verification removed.
    verifiedBody: "Before a first consultation: NMC or State Medical Council registration, the qualification certificate, and the specialisation to be listed — each confirmed with the body that issued it. Identity checked as for every other professional.",
  },
  contact: {
    eyebrow: "Contact",
    h1: "Tell us who you are and we will come back to you as soon as possible.",
    lead: "A few short questions so the right person answers.",
    personaLegend: "Who is getting in touch?",
    personas: [
      { id: "family", label: "I am arranging care for someone", hint: "A parent, a relative, or yourself" },
      { id: "pro", label: "I am a healthcare professional", hint: "You want to work with us" },
      { id: "hospital", label: "I am from a hospital or clinic", hint: "Referrals and partnerships" },
      { id: "support", label: "I need help with something", hint: "A visit, a payment, or a complaint" },
    ],
    family: {
      kindHeading: "What kind of care?",
      // CHANGES-2026-10-10 #2: Caregiver added before "Not sure yet".
      kindThree: ["Nursing", "Physiotherapy", "Lab collection", "Caregiver", "Not sure yet"],
      kindFour: ["Doctor consultation", "Nursing", "Physiotherapy", "Lab collection", "Caregiver", "Not sure yet"],
      areaHeading: "Which area?",
      areaPlaceholder: "Area, neighbourhood or pin code",
      whenHeading: "When would you need it?",
      when: ["Within a week", "This month", "Looking ahead"],
    },
    professional: {
      roleHeading: "What is your role?",
      // CHANGES-2026-10-10 #2: Caregiver added.
      rolesThree: ["Nurse", "Physiotherapist", "Sample collector", "Caregiver"],
      rolesFour: ["Nurse", "Physiotherapist", "Sample collector", "Caregiver", "Doctor"],
      registrationHeading: "Do you have a registration number?",
      registration: ["Yes", "Applied for it", "No"],
    },
    hospital: {
      orgHeading: "What kind of organisation?",
      org: ["Hospital", "Clinic", "Diagnostic lab", "Pharmacy"],
      topicHeading: "What would you like to discuss?",
      topic: ["Discharge referrals", "Ongoing partnership", "Something else"],
    },
    support: {
      topicHeading: "What is it about?",
      topic: ["A visit that happened", "A booking coming up", "Payment", "Something else"],
      urgencyHeading: "How soon do you need an answer?",
      urgency: ["Today", "A few days", "No rush"],
    },
    reachLegend: "How do we reach you?",
    nameLabel: "Your name",
    mobileLabel: "Mobile number",
    mobilePlaceholder: "10 digits",
    noteLabel: "Anything else?",
    noteOptional: "optional",
    noMedical: "Please do not write medical details, test results, or anything about the patient's condition here.",
    sendLabel: "Send",
    sendingLabel: "Sending…",
    submitHelper: "We use your number to call you back about this enquiry. Nothing else.",
    startAgain: "Start again",
    directHeading: "Or reach us directly",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    hoursNote: "Hours placeholder.",
    sent: {
      title: "Thank you — we have your details.",
      body: "We've received this and will reply on the number you gave.",
    },
    errors: {
      required: "This field is required.",
      mobile: "Enter a 10-digit mobile number.",
      sendFailed: "That didn't go through.",
      sendFailedWhatsapp: "Message us on WhatsApp instead.",
    },
  },
};
