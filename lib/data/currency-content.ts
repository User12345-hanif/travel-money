/**
 * Per-currency editorial content.
 * ---------------------------------------------------------------------------
 * Currency *facts* (code, symbol, country, decimals, rate) live in
 * `currencies.ts`. This file holds the unique, human-written content for each
 * published currency page — the intro, informational sections, travel-money
 * guidance and FAQs that give each page genuine, non-duplicated value.
 *
 * A currency page is considered "published" only when it has an entry here, so
 * this map also drives static generation and 404s for not-yet-written pages.
 * Future currencies reuse the same components with their own content record.
 */

import { baseCurrency, currencies, type Currency } from "./currencies";

export type TravelTopic = "cash" | "cards" | "atms" | "exchange" | "dcc" | "fees";

export interface InfoBlock {
  heading: string;
  paragraphs: string[];
  /** Optional topic used to pick an icon on travel-money cards. */
  topic?: TravelTopic;
}

export interface CurrencyFaq {
  question: string;
  answer: string;
}

export interface CurrencyContent {
  /** Matches a Currency.slug in currencies.ts. */
  slug: string;
  /** Optional custom SEO title. Falls back to a generated title when omitted. */
  metaTitle?: string;
  /** Optional page H1. Falls back to "{name} ({code}) exchange rate & currency guide". */
  h1?: string;
  /** Short, useful hero description (no keyword stuffing). */
  summary: string;
  /** SEO meta description for the page. */
  metaDescription: string;
  /** Informational sections answering real user questions. */
  about: InfoBlock;
  howRatesWork: InfoBlock;
  whatAffects: InfoBlock;
  readingRates: InfoBlock;
  /** Optional tailored intro for the rate-summary section. */
  rateSummaryDescription?: string;
  /** Base currencies shown in the "1 GBP = …" rate summary. */
  rateBaseCodes: string[];
  /** Travel-money guidance blocks. */
  travel: InfoBlock[];
  /** Optional place phrase for the travel section heading (defaults to country). */
  travelPlace?: string;
  faqs: CurrencyFaq[];
  /** Codes of related, published currency pages to link to. */
  relatedCurrencyCodes: string[];
  /** Bases for "GBP → …" conversion links. Empty means none are rendered. */
  conversionPairBases: string[];
}

const turkishLira: CurrencyContent = {
  slug: "turkish-lira",
  h1: "Turkish lira exchange rate",
  metaTitle: "Pound to Turkish Lira (TRY) Exchange Rate",
  summary:
    "The Turkish Lira (TRY, ₺) is Turkey’s currency. Convert pounds, euros and dollars with an indicative rate, then see cash, card, ATM and buying notes for a trip — Wayfare does not sell lira.",
  metaDescription:
    "Convert pounds to Turkish lira with an indicative TRY rate, plus cash, card, ATM and buying-lira notes for Turkey. Not a dealing quote.",
  about: {
    heading: "What is the Turkish Lira?",
    paragraphs: [
      "The Turkish Lira is the official currency of Turkey — also called Turkish money or Turkish currency in everyday speech. It is issued by the Central Bank of the Republic of Türkiye. The ISO code is TRY; the symbol is ₺ (sometimes written TL). One lira is divided into 100 kuruş.",
      "Lira are used throughout Turkey, from Istanbul and Ankara to the Aegean and Mediterranean coast. It is legal tender for everyday spending. Some tourist-facing businesses may also quote euros or dollars as a convenience price — that is not a second official currency.",
    ],
  },
  howRatesWork: {
    heading: "How Turkish Lira exchange rates work",
    paragraphs: [
      "An exchange rate shows how much one currency is worth in another. A GBP/TRY rate of 52.34, for example, means one pound buys roughly 52 lira on that quote. Market quotes move during trading hours; the converter on this page shows an indicative rate for planning — not a live dealing quote from Wayfare.",
      "The mid-market rate sits between buy and sell prices. A bank, bureau or card usually adds a margin, a fee, or both. Compare the lira you would actually receive for a set pound amount — not only the poster rate.",
    ],
  },
  whatAffects: {
    heading: "What affects the TRY exchange rate",
    paragraphs: [
      "As a floating currency, the lira’s value reflects supply and demand. Drivers include Turkey’s inflation, central-bank interest-rate decisions, the trade balance and foreign investment flows.",
      "GBP/TRY, EUR/TRY and USD/TRY can move quickly. Compare a bureau or card quote close to when you convert. Figures here are indicative for planning — a provider’s payout can differ once fees and margin apply.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/TRY, EUR/TRY and USD/TRY",
    paragraphs: [
      "Pairs are written base-first. In GBP/TRY the pound is the base and the lira is the quote, so the number is how many lira one pound buys. EUR/TRY and USD/TRY work the same way for euros and dollars.",
      "To convert pounds, multiply by the GBP/TRY rate (£100 × 52.34 = ₺5,234 on this demo figure). To go the other way, divide lira by the same rate. Use the converter on this page — or the dedicated currency converter — for other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Cash is still widely used in Turkey — markets, small cafés, taxis, tips and many rural stops. Carry some lira for day-to-day gaps and keep a small emergency amount separate. You rarely need the whole trip in notes; cards can cover hotels and larger city spends where terminals work.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants and shops in cities and tourist areas widely accept contactless and chip-and-PIN. Check foreign-transaction fees on your card. Away from main centres, have lira ready rather than assuming every stall will take plastic. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in towns and tourist areas. Withdraw lira when you need it rather than changing a large sum in one go. Read any operator fee on screen before you confirm. If the machine offers to charge you in pounds, compare that with a local-currency (TRY) withdrawal — that home-currency offer is dynamic currency conversion. Use the ATM withdrawal calculator for a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging Turkish lira",
      paragraphs: [
        "You can buy lira in the UK before you fly, exchange after you land, or withdraw from an ATM abroad. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or rank providers. Compare how many ₺ you would receive for a set pound amount after charges, then use the Travel Money hub if you want a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If an ATM or card terminal offers to charge you in pounds rather than lira, the operator is applying its own conversion (DCC). Choosing TRY usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees, margins and denominations",
      paragraphs: [
        "Common notes include ₺5, ₺10, ₺20, ₺50, ₺100 and ₺200; coins cover kuruş and small lira amounts. Providers earn through a rate margin, a commission, or both. Leave a little budget flexibility if GBP/TRY moves. Browse other published currencies in the currency explorer if your trip uses more than lira.",
      ],
    },
  ],
  travelPlace: "Turkey",
  faqs: [
    {
      question: "What is the Turkish Lira?",
      answer:
        "The Turkish Lira is the official currency of Turkey. Its code is TRY and its symbol is ₺ (also written TL). One lira is made up of 100 kuruş. Everyday Turkish money means the same currency.",
    },
    {
      question: "What currency does Turkey use?",
      answer:
        "Turkey uses the Turkish Lira (TRY). Some tourist businesses may show a euro or dollar price as a convenience quote, but lira is the legal tender for spending across the country.",
    },
    {
      question: "What is the TRY currency code?",
      answer:
        "TRY is the ISO 4217 code for the Turkish Lira. Banks, cards and converters use it so lira is clearly identified.",
    },
    {
      question: "What is the symbol for the Turkish Lira?",
      answer:
        "The usual symbol is ₺, introduced in 2012. You may also see TL. International listings use TRY.",
    },
    {
      question: "How do I convert GBP to TRY?",
      answer:
        "Multiply the pound amount by the GBP/TRY rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert TRY to GBP?",
      answer:
        "Divide the lira amount by the GBP/TRY rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I get Turkish lira?",
      answer:
        "Common options are a UK bank or bureau before you travel, an exchange desk after you arrive, or a foreign-card ATM in Turkey. Stock, hours and fees vary by provider. Wayfare does not sell lira — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Should I take cash to Turkey?",
      answer:
        "A modest amount of lira helps for markets, taxis, tips and smaller places that prefer cash. You do not usually need most of the trip in notes. Keep an emergency amount separate and use a card where terminals work.",
    },
    {
      question: "Can I use a card in Turkey?",
      answer:
        "In hotels, restaurants and many city shops, yes — contactless and chip-and-PIN are widely available in tourist areas. Check foreign-transaction fees. Smaller businesses and rural stops may prefer cash.",
    },
    {
      question: "Can I withdraw Turkish lira from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw TRY, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "How much Turkish lira do I need?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for markets and tips. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the lira you would actually receive.",
    },
    {
      question: "Should I buy lira before travelling to Turkey?",
      answer:
        "A small amount before you go covers arrival costs. Whether to buy more in the UK, exchange on arrival or use an ATM depends on the payout after fees, collection convenience and how much cash you want to carry. No method always wins.",
    },
  ],
  rateBaseCodes: ["GBP", "EUR", "USD"],
  relatedCurrencyCodes: ["EUR", "PLN", "USD", "AED", "THB", "CZK", "JPY"],
  conversionPairBases: [],
};

const euro: CurrencyContent = {
  slug: "euro",
  h1: "Euro exchange rate",
  metaTitle: "Euro Exchange Rate: Convert Pounds to Euros (EUR)",
  summary:
    "The euro (EUR, €) is the currency of the eurozone. Convert pounds and dollars with an indicative rate, then see cash, card, ATM and buying-euro notes for travel — Wayfare does not sell euros.",
  metaDescription:
    "Convert pounds to euros with an indicative EUR rate, plus cash, card, ATM and buying-euro notes for eurozone travel. Not a dealing quote.",
  about: {
    heading: "What is the euro?",
    paragraphs: [
      "The euro is the official currency of the eurozone — the European Union countries that have adopted it. Its currency code is EUR and its symbol is €. One euro is made up of 100 cents. It launched for electronic payments in 1999 and entered circulation as notes and coins in 2002.",
      "The euro is widely quoted against the pound and the dollar. Notes and coins from any euro country are legal tender wherever the euro is used, so cash from France spends the same in Spain or Italy.",
    ],
  },
  howRatesWork: {
    heading: "Which countries use the euro?",
    paragraphs: [
      "Twenty EU member states use the euro, including Ireland, France, Germany, Spain, Italy, Portugal, Greece, the Netherlands and Austria. Together they form the eurozone, where euro notes and coins are legal tender.",
      "The euro is also the official currency of several small non-EU states such as Andorra, Monaco, San Marino and Vatican City. You do not need to change money when travelling between euro countries.",
    ],
  },
  whatAffects: {
    heading: "What moves the euro exchange rate?",
    paragraphs: [
      "The euro floats freely, so its value against the pound or dollar reflects supply and demand. Influences include European Central Bank interest-rate decisions, eurozone inflation and growth, and political and economic news across member states.",
      "GBP/EUR can move during the trading day. Compare a bureau or card quote close to when you convert. Figures on this page are indicative for planning — a provider’s payout can differ once fees and margin apply.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/EUR and EUR/USD",
    paragraphs: [
      "Currency pairs are written base-first. In GBP/EUR the pound is the base, so the number shows how many euros one pound buys: a rate of 1.16 means £1 buys €1.16. EUR/USD works the same way for euros and dollars.",
      "To convert pounds to euros, multiply by the GBP/EUR rate; to go back, divide by it. Use the converter on this page — or the dedicated currency converter — for other amounts. The result is indicative only, not a dealing quote.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some euros for markets, small cafés, tips and places that prefer notes. The same notes and coins work across the eurozone, so you do not change money between countries such as France, Spain and Italy. You rarely need the whole trip in cash — keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Cards are widely accepted across much of the eurozone; contactless is common in shops, cafés and many transport networks. Check foreign-transaction fees on your card. Away from main centres, have a little cash ready rather than assuming every till will take plastic. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in cities, airports and many towns. Withdraw euros when you need them, and read any operator fee on screen before you confirm. If the machine offers to charge you in pounds, compare that with a local-currency (EUR) withdrawal — that home-currency offer is dynamic currency conversion. Use the ATM withdrawal calculator for a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging euros",
      paragraphs: [
        "You can buy euros in the UK before you fly, exchange after you land, or withdraw from an ATM abroad. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many € you would receive for a set pound amount after charges, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If an ATM or card terminal offers to charge you in pounds rather than euros, the operator is applying its own conversion (DCC). Choosing EUR usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees, margins and denominations",
      paragraphs: [
        "Common notes include €5, €10, €20, €50, €100 and €200; coins run from 1 cent to €2. Providers earn through a rate margin, a commission, or both. Compare the amount you would actually receive, not only a headline rate. Browse other published currencies in the currency explorer if your trip uses more than euros.",
      ],
    },
  ],
  travelPlace: "the eurozone",
  faqs: [
    {
      question: "What is the euro?",
      answer:
        "The euro is the official currency of the eurozone. Its code is EUR and its symbol is €. One euro is made up of 100 cents.",
    },
    {
      question: "What is EUR?",
      answer:
        "EUR is the ISO 4217 code for the euro. Banks, cards and converters use it so the currency is clearly identified.",
    },
    {
      question: "What is the euro symbol?",
      answer:
        "The euro symbol is €. It may appear before or after the amount depending on local convention. International listings also show EUR.",
    },
    {
      question: "Which countries use the euro?",
      answer:
        "Twenty European Union countries use the euro as their official currency, including France, Germany, Spain, Italy, Ireland, Portugal and the Netherlands. A few small non-EU states such as Monaco and San Marino use it too.",
    },
    {
      question: "How do I convert GBP to EUR?",
      answer:
        "Multiply the pound amount by the GBP/EUR rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert EUR to GBP?",
      answer:
        "Divide the euro amount by the GBP/EUR rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy euros?",
      answer:
        "Common options are a UK bank or bureau before you travel, an exchange desk after you arrive, or a foreign-card ATM in the eurozone. Stock, hours and fees vary by provider. Wayfare does not sell euros — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Where can I buy euros near me?",
      answer:
        "Wayfare does not list shops or provide a map. Search for a bank, supermarket travel-money desk or bureau near you, then check opening hours, stock, collection rules, fees and how many euros you would receive for a set pound amount.",
    },
    {
      question: "Should I carry euros in cash?",
      answer:
        "A modest amount helps for markets, tips and places that prefer notes. You do not usually need most of a eurozone trip in cash. Keep an emergency amount separate and use a card where terminals work.",
    },
    {
      question: "Can I use a card in the eurozone?",
      answer:
        "In many shops, hotels, restaurants and transport networks, yes — contactless is common. Check foreign-transaction fees. Smaller businesses may still prefer cash.",
    },
    {
      question: "Can I withdraw euros from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw EUR, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "How much money do I need for a eurozone trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for markets and tips. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the euros you would actually receive.",
    },
    {
      question: "Can I use euros from one country in another?",
      answer:
        "Yes. Euro notes and coins are legal tender throughout the eurozone, so cash from one member country can be spent in any other.",
    },
    {
      question: "Should I pay in euros or pounds at a terminal abroad?",
      answer:
        "When a card terminal or ATM offers to charge you in pounds, that is often dynamic currency conversion. Choosing euros usually keeps the clearer total — compare the on-screen figures before you confirm.",
    },
  ],
  relatedCurrencyCodes: ["TRY", "USD", "AED", "THB", "CZK", "PLN", "JPY"],
  conversionPairBases: [],
};

const uaeDirham: CurrencyContent = {
  slug: "uae-dirham",
  h1: "UAE dirham — Dubai currency and exchange rate",
  metaTitle: "UAE Dirham (AED): Dubai Currency and Exchange Rate",
  summary:
    "The UAE Dirham (AED, د.إ) is the currency of Dubai, Abu Dhabi and the Emirates. Convert pounds and euros with an indicative rate, then see cash, card, ATM and buying-dirham notes — Wayfare does not sell currency.",
  metaDescription:
    "Convert pounds to UAE dirhams with an indicative AED rate, plus cash, card, ATM and buying notes for Dubai and the Emirates. Not a dealing quote.",
  about: {
    heading: "What is the UAE Dirham?",
    paragraphs: [
      "The UAE Dirham — also called the Emirati dirham — is the official currency of the United Arab Emirates. Its ISO code is AED. One dirham is 100 fils. In Arabic it is often written د.إ; in English you will also see Dh or Dhs.",
      "The same notes and coins are legal tender in every emirate: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah. You do not change money when you travel between them.",
    ],
  },
  howRatesWork: {
    heading: "Dubai currency — dirham, not dinar",
    paragraphs: [
      "If you are looking up Dubai currency, the money in your hand is the dirham. Hotels, malls, taxis and cafés price in AED. A few tourist desks may also show a pound or dollar figure as a convenience quote; that is not a second official currency.",
      "Searches for a “Dubai dinar” usually mix the UAE up with countries that do use a dinar, such as Kuwait, Bahrain, Iraq or Jordan. The Emirates have used the dirham since 1973. AED is the code banks and converters use for it.",
    ],
  },
  whatAffects: {
    heading: "Why pound-to-dirham rates move",
    paragraphs: [
      "The dirham is pegged to the US dollar, so AED barely moves against USD. What you see in GBP/AED (and often EUR/AED) is mostly the pound or euro moving against the dollar, not a freely floating dirham.",
      "That peg can make a UAE budget easier to sketch than a floating currency, but a bureau, card or ATM still applies its own dealing rate plus any fee or margin. Figures on this page are indicative for planning — not the official peg and not a dealing quote.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/AED and EUR/AED",
    paragraphs: [
      "Pairs are written base-first. In GBP/AED the pound is the base, so the number is how many dirhams one pound buys: a sample rate of 4.95 means £1 ≈ 4.95 AED. EUR/AED works the same way for euros.",
      "To convert pounds, multiply by the GBP/AED rate; to go back, divide dirhams by the same rate. Use the converter on this page — or the dedicated currency converter — for other amounts. The result is indicative only, not a dealing quote.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some dirhams for taxis that prefer notes, small cafés, tips and markets. You do not need a large cash float in Dubai or Abu Dhabi: cards cover most malls and hotels. Keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Contactless and chip-and-PIN are widely accepted in Dubai and Abu Dhabi — hotels, shopping centres, metro, many restaurants. Check your card’s foreign-transaction fees before you rely on it. Away from main centres, have a little cash ready. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common at airports, malls and on the street. Withdraw AED when you need it, and read any operator fee on screen before you confirm. If the machine offers to charge you in pounds, compare that with a local-currency (AED) withdrawal — that home-currency offer is dynamic currency conversion. Use the ATM withdrawal calculator for a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging dirhams",
      paragraphs: [
        "You can buy UAE dirhams in the UK before you fly, exchange after you land, or withdraw from an ATM in the Emirates. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many AED you would receive for a set pound amount after charges, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If an ATM or card terminal offers to charge you in pounds rather than dirhams, the operator is applying its own conversion (DCC). Choosing AED usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees, margins and denominations",
      paragraphs: [
        "Notes commonly seen include 5, 10, 20, 50, 100, 200, 500 and 1,000 dirhams; coins cover fils and 1 dirham. Providers earn through a rate margin, a commission, or both. Compare the amount you would actually receive, not only a headline rate. Browse other published currencies in the currency explorer if your trip uses more than AED.",
      ],
    },
  ],
  travelPlace: "the UAE",
  faqs: [
    {
      question: "What currency is used in Dubai?",
      answer:
        "Dubai uses the UAE Dirham (AED), the same currency as the rest of the United Arab Emirates. You do not need a different currency for Abu Dhabi or the other emirates.",
    },
    {
      question: "Is the UAE Dirham the same as Dubai currency?",
      answer:
        "Yes. “Dubai currency” usually means the UAE Dirham. Abu Dhabi and the other emirates use the same notes and coins — there is no separate Dubai-only currency.",
    },
    {
      question: "What is the UAE Dirham?",
      answer:
        "The UAE Dirham — or Emirati dirham — is the official currency of the United Arab Emirates. Its code is AED and its common symbol is د.إ. One dirham equals 100 fils.",
    },
    {
      question: "What does AED stand for?",
      answer:
        "AED is the ISO 4217 code for the United Arab Emirates dirham. Banks, cards and currency converters use it so they are not confused with other dirhams, such as the Moroccan dirham (MAD).",
    },
    {
      question: "Is Dubai’s currency a dinar?",
      answer:
        "No. The UAE uses the dirham, not a dinar. Dinar is the unit in countries such as Kuwait, Bahrain, Iraq and Jordan. If you see “Dubai dinar”, that is almost always a mix-up with the dirham.",
    },
    {
      question: "How do I convert GBP to AED?",
      answer:
        "Multiply the pound amount by the GBP/AED rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert AED to GBP?",
      answer:
        "Divide the dirham amount by the GBP/AED rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy UAE dirhams?",
      answer:
        "Common options are a UK bank or bureau before you travel, an exchange desk after you arrive, or a foreign-card ATM in the UAE. Stock, hours and fees vary by provider. Wayfare does not sell dirhams — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Should I take cash to Dubai?",
      answer:
        "A modest amount of dirhams is useful for taxis, tips and smaller vendors. You do not usually need to carry most of a Dubai or Abu Dhabi trip in cash. Keep a small emergency amount separate and use a card where terminals work.",
    },
    {
      question: "Can I use a card in Dubai or the UAE?",
      answer:
        "In many hotels, malls, restaurants and on the metro, yes — contactless is common. Check foreign-transaction fees. Smaller shops may still prefer cash.",
    },
    {
      question: "Can I withdraw AED from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw AED, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose AED or GBP on a card or ATM?",
      answer:
        "When a terminal or cash machine offers to charge you in pounds, that is often dynamic currency conversion. Choosing AED usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a UAE trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for taxis and tips. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the dirhams you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "TRY", "THB", "USD", "CZK", "PLN", "JPY"],
  conversionPairBases: [],
};

const thaiBaht: CurrencyContent = {
  slug: "thai-baht",
  h1: "Thai baht exchange rate",
  metaTitle: "Thai Baht (THB) Exchange Rate and Thailand Currency",
  summary:
    "The Thai Baht (THB, ฿) is the currency of Thailand — Bangkok, Chiang Mai, Phuket and the islands. Convert pounds and euros with an indicative rate, then see cash, card, ATM and buying-baht notes — Wayfare does not sell currency.",
  metaDescription:
    "Convert pounds to Thai baht with an indicative THB rate, plus cash, card, ATM and buying-baht notes for Thailand. Not a dealing quote.",
  about: {
    heading: "What is the Thai Baht?",
    paragraphs: [
      "The Thai Baht is the official currency of Thailand, issued by the Bank of Thailand. Its ISO code is THB and its symbol is ฿. One baht is 100 satang.",
      "The same notes and coins are used nationwide: Bangkok, Chiang Mai, Phuket, the Gulf and Andaman islands, and smaller towns. You do not change money when you travel between provinces.",
    ],
  },
  howRatesWork: {
    heading: "Thailand’s currency in daily use",
    paragraphs: [
      "If you are looking up Thai currency, the unit in your hand is the baht. Street food, markets, songthaews and most island shops price in THB. A hotel or tour desk may also show a pound or dollar figure as a convenience quote; that is not a second official currency.",
      "Cash still covers a larger share of day-to-day spending than in many European cities, especially away from malls. Cards are common in hotels and shopping centres; they are patchier at food stalls and on smaller islands.",
    ],
  },
  whatAffects: {
    heading: "Why baht exchange rates move",
    paragraphs: [
      "The baht floats, so GBP/THB and EUR/THB move with supply and demand. Tourism, exports, and interest-rate decisions by the Bank of Thailand all feed into the figure you see quoted.",
      "Unlike a dollar-pegged currency, the baht can shift against both the pound and the dollar. A bureau, card or ATM still applies its own dealing rate plus any fee or margin. Figures on this page are indicative for planning — not a dealing quote.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/THB and EUR/THB",
    paragraphs: [
      "Pairs are written base-first. In GBP/THB the pound is the base, so the number is how many baht one pound buys: a sample rate of 44.5 means £1 ≈ ฿44.50. EUR/THB works the same way for euros.",
      "To convert pounds, multiply by the GBP/THB rate; to go back, divide baht by the same rate. Use the converter on this page — or the dedicated currency converter — for other amounts. The result is indicative only, not a dealing quote.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some baht for street food, markets, tips, small ferries, songthaews and places that prefer notes. You do not need to hold a whole trip in cash, but Thailand is still less card-only than many UK high streets — especially away from malls and on smaller islands. Keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, malls, larger restaurants and many Bangkok shops take contactless and chip-and-PIN. Check your card’s foreign-transaction fees. On islands, at stalls and for local transport, have baht ready rather than assuming a terminal will work. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in towns, malls and many tourist areas. Withdraw THB when you need it, and read any operator fee on screen before you confirm. If the machine offers to charge you in pounds, compare that with a local-currency (THB) withdrawal — that home-currency offer is dynamic currency conversion. Use the ATM withdrawal calculator for a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging baht",
      paragraphs: [
        "You can buy Thai baht in the UK before you fly, exchange after you land, or withdraw from an ATM in Thailand. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many ฿ you would receive for a set pound amount after charges, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If an ATM or card terminal offers to charge you in pounds rather than baht, the operator is applying its own conversion (DCC). Choosing THB usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees, margins and denominations",
      paragraphs: [
        "Notes commonly seen include 20, 50, 100, 500 and 1,000 baht; coins cover satang plus 1, 2, 5 and 10 baht. Providers earn through a rate margin, a commission, or both. Compare the amount you would actually receive, not only a headline rate. Browse other published currencies in the currency explorer if your trip uses more than baht.",
      ],
    },
  ],
  travelPlace: "Thailand",
  faqs: [
    {
      question: "What currency is used in Thailand?",
      answer:
        "Thailand uses the Thai Baht (THB). The same notes and coins work in Bangkok, Chiang Mai, Phuket and the islands — you do not need a different currency for another province.",
    },
    {
      question: "What is the Thai Baht?",
      answer:
        "The Thai Baht is the official currency of Thailand. Its code is THB and its symbol is ฿. One baht equals 100 satang.",
    },
    {
      question: "What does THB stand for?",
      answer:
        "THB is the ISO 4217 code for the Thai Baht. Banks, cards and currency converters use it so the currency is clearly identified.",
    },
    {
      question: "What is the symbol for Thai Baht?",
      answer:
        "The symbol is ฿. You will also see THB written after an amount in international listings.",
    },
    {
      question: "How do I convert GBP to THB?",
      answer:
        "Multiply the pound amount by the GBP/THB rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert THB to GBP?",
      answer:
        "Divide the baht amount by the GBP/THB rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy Thai Baht?",
      answer:
        "Common options are a UK bank or bureau before you travel, an exchange desk after you arrive, or a foreign-card ATM in Thailand. Stock, hours and fees vary by provider. Wayfare does not sell baht — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Should I take cash to Thailand?",
      answer:
        "A modest amount of baht helps for street food, markets, tips and smaller vendors. You do not usually need most of a trip in cash, but Thailand is still less card-only than many UK high streets. Keep an emergency amount separate and use a card where terminals work.",
    },
    {
      question: "Can I use a card in Thailand?",
      answer:
        "In hotels, malls and many city restaurants, yes — contactless is common. Check foreign-transaction fees. Markets, stalls and some island businesses still prefer cash.",
    },
    {
      question: "Can I withdraw Thai Baht from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw THB, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose THB or GBP on a card or ATM?",
      answer:
        "When a terminal or cash machine offers to charge you in pounds, that is often dynamic currency conversion. Choosing THB usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a Thailand trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for markets, street food and tips. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the baht you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "TRY", "AED", "USD", "CZK", "PLN", "JPY"],
  conversionPairBases: [],
};

const usDollar: CurrencyContent = {
  slug: "us-dollar",
  h1: "US dollar exchange rate",
  metaTitle: "US Dollar (USD) Exchange Rate: Pounds to Dollars",
  summary:
    "The US Dollar (USD, $) is the official currency of the United States and a widely used travel currency. Convert pounds and euros with an indicative rate, then see cash, card, ATM and buying-dollar notes — Wayfare does not sell dollars.",
  metaDescription:
    "Convert pounds to US dollars with an indicative USD rate, plus cash, card, ATM and buying-dollar notes for travel. Not a dealing quote.",
  about: {
    heading: "What is the US Dollar?",
    paragraphs: [
      "The US Dollar is the official currency of the United States. Its ISO code is USD and its symbol is $. One dollar is 100 cents. The Federal Reserve issues the currency; notes in circulation are Federal Reserve notes.",
      "The same dollar is legal tender in all 50 states, Washington, D.C., and US territories such as Puerto Rico. Ecuador and El Salvador use the US Dollar as official currency. Panama’s balboa is at par with the dollar, and USD notes circulate there too. Other countries price some goods in dollars without making it their legal tender — that is not the same as it being the local currency.",
    ],
  },
  howRatesWork: {
    heading: "How to compare USD exchange rates",
    paragraphs: [
      "An exchange rate is how many dollars one unit of another currency converts into. A GBP/USD figure of 1.351 means one pound buys about $1.35 on that quote. EUR/USD works the same way for euros. The number on a screen is not automatically the amount you receive.",
      "Banks, bureaux and cards usually add a margin, a fee, or both. A stronger-looking headline rate can still pay out fewer dollars once those extras are included. Compare the total dollars you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers and does not claim a “best” rate.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau in London or a card settlement will use its own figure.",
    ],
  },
  whatAffects: {
    heading: "Buying US dollars for a trip",
    paragraphs: [
      "Wayfare does not sell or supply physical dollars. If you want notes before you travel, you are buying USD from a bank, bureau or similar provider. What matters is the payout: how many dollars you receive after the rate margin and any commission.",
      "In the UK — including London — you will see dollar exchange on high streets, in some banks and at airports. Convenience desks can be useful on the day you fly; they are not automatically the cheapest. Ask what you get for a set pound amount, then judge that against the indicative conversion here.",
      "Cash, a travel card and an ATM withdrawal are different ways of ending up with dollars. Cash locks in a rate when you buy notes. A card converts when you spend. An ATM converts when you withdraw. None is always cheaper — fees and the rate on that transaction decide it.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/USD and EUR/USD",
    paragraphs: [
      "Pairs are written base-first. In GBP/USD the pound is the base, so the number is how many dollars one pound buys: a sample rate of 1.351 means £1 ≈ $1.351. EUR/USD is how many dollars one euro buys.",
      "To convert pounds, multiply by the GBP/USD rate (£100 × 1.351 = $135.10 on this demo figure). To go back, divide dollars by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some dollars for tips, taxis, small diners and places that still prefer notes. The US is card-heavy in cities, so you rarely need a large cash float. Keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Chip-and-PIN and contactless are widely accepted in the US — hotels, restaurants, shops and many taxis. Check your card’s foreign-transaction fees before you rely on it. A few smaller vendors still prefer cash. Sketch a trip total on the travel money planner if you want a cash-versus-card split.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in US cities, airports and malls. Withdraw dollars when you need them rather than exchanging a large sum in one go. Some operators add a fee on screen — this page does not assume a standard charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging dollars",
      paragraphs: [
        "You can buy US dollars in the UK — including London — before you fly, or after you land. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many $ you would receive for a set pound amount after charges, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If a US ATM or card terminal offers to charge you in pounds rather than dollars, the operator is applying its own conversion (DCC). Choosing USD usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are $1, $5, $10, $20, $50 and $100; coins cover cents plus $1. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than dollars.",
      ],
    },
  ],
  travelPlace: "the United States",
  faqs: [
    {
      question: "What is the US Dollar?",
      answer:
        "The US Dollar is the official currency of the United States. Its code is USD and its symbol is $. One dollar equals 100 cents.",
    },
    {
      question: "What does USD stand for?",
      answer:
        "USD is the ISO 4217 code for the United States dollar. Banks, cards and converters use it so it is not confused with other dollars, such as the Australian or Canadian dollar.",
    },
    {
      question: "What is the symbol for US Dollars?",
      answer:
        "The symbol is $. Because other currencies also use a dollar sign, international listings usually write USD after the amount.",
    },
    {
      question: "Where is the US Dollar used?",
      answer:
        "It is the official currency of the United States and of some other countries, including Ecuador and El Salvador. US territories use it too. Elsewhere it may be accepted as a convenience, but the local currency is still what prices are usually in.",
    },
    {
      question: "How do I convert GBP to USD?",
      answer:
        "Multiply the pound amount by the GBP/USD rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert USD to GBP?",
      answer:
        "Divide the dollar amount by the GBP/USD rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy US dollars?",
      answer:
        "Common options are a UK bank or bureau before you travel, or an exchange desk once you arrive. Stock, hours and fees vary by provider. Wayfare does not sell dollars — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Should I take US Dollars in cash when travelling?",
      answer:
        "A modest amount of dollars is useful for tips, taxis and smaller vendors in the US. You do not usually need to carry most of a trip in cash. Keep a small emergency amount separate and use a card where terminals work.",
    },
    {
      question: "Can I use a card instead of cash?",
      answer:
        "In most US hotels, shops and restaurants, yes. Check foreign-transaction fees on your card. Some smaller businesses still prefer cash.",
    },
    {
      question: "Can I withdraw US dollars from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw USD, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose USD or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing USD usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a US trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for tips and smaller vendors. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Ask how many dollars you receive for a set pound amount after charges, and compare that total — this page does not name a best provider.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "TRY", "AED", "THB", "CZK", "PLN", "JPY"],
  conversionPairBases: [],
};

const czechKoruna: CurrencyContent = {
  slug: "czech-koruna",
  h1: "Czech koruna — Czechia and Prague currency",
  metaTitle: "Czech Koruna (CZK): Czech Republic Currency and Exchange Rate",
  summary:
    "The Czech Koruna (CZK, Kč) — also called the Czech crown — is the currency of Czechia, including Prague. Convert pounds and euros with an indicative rate, then see cash, card, ATM and buying-koruna notes — Wayfare does not sell koruna.",
  metaDescription:
    "Convert pounds to Czech koruna (crown) with an indicative CZK rate, plus cash, card, ATM and buying notes for Prague and Czechia. Not a dealing quote.",
  about: {
    heading: "What is the Czech Koruna?",
    paragraphs: [
      "The Czech Koruna is the official currency of Czechia (the Czech Republic). English speakers often call it the Czech crown. Its ISO code is CZK and the everyday symbol is Kč, usually written after the amount (for example 200 Kč). One koruna is divided into 100 haléřů, though heller coins are no longer in circulation.",
      "The same notes and coins are legal tender nationwide — Prague, Brno, Český Krumlov and smaller towns alike. Czechia is in the European Union but has not adopted the euro, so day-to-day prices are in koruna.",
    ],
  },
  howRatesWork: {
    heading: "Prague currency — koruna, not euro",
    paragraphs: [
      "If you are looking up Prague currency, the money in your hand is Czech Koruna. Shops, cafés, trams and hotels price in CZK. A tourist desk may also show a pound or euro figure as a convenience quote; that is not a second official currency.",
      "Cards are common in central Prague. Cash still helps at markets, smaller pubs and some ticket machines. Euro notes are not Czech legal tender — do not assume a euro price is an official rate, and do not count on every vendor taking euros.",
    ],
  },
  whatAffects: {
    heading: "How Czech crown exchange rates work",
    paragraphs: [
      "A CZK exchange rate is how many koruna one unit of another currency converts into. A GBP/CZK figure of 29.2 means one pound buys about 29.20 Kč on that quote. EUR/CZK works the same way for euros. The number on a board is not automatically the amount you receive.",
      "Banks, bureaux and cards usually add a margin, a fee, or both. A stronger-looking headline rate can still pay out fewer koruna once those extras are included. Compare the total Kč you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/CZK and EUR/CZK",
    paragraphs: [
      "Pairs are written base-first. In GBP/CZK the pound is the base, so the number is how many koruna one pound buys: a sample rate of 29.2 means £1 ≈ 29.20 Kč. EUR/CZK is how many koruna one euro buys.",
      "To convert pounds, multiply by the GBP/CZK rate (£100 × 29.2 = 2,920 Kč on this demo figure). To go back, divide koruna by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some koruna for markets, tips, smaller pubs and the odd machine that prefers notes. Prague is fairly card-friendly in the centre, so you rarely need a large cash float. Keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants and many Prague shops take contactless and chip-and-PIN. Check your card’s foreign-transaction fees. Away from the centre, have Kč ready rather than assuming a terminal will work. Sketch a trip total on the travel money planner if you want a cash-versus-card split.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in Prague, at the airport and in towns. Withdraw koruna when you need it. Some operators add a fee on screen — this page does not assume a standard Czech ATM charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging koruna",
      paragraphs: [
        "You can buy Czech koruna in the UK before you fly, or exchange after you land. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many Kč you would receive for a set pound amount after charges, then use the Travel Money hub for a fuller buying checklist. In Prague, a change office marked “no commission” can still build its margin into the rate — check the koruna you would actually receive.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If a Prague ATM or card terminal offers to charge you in pounds rather than koruna, the operator is applying its own conversion (DCC). Choosing CZK usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are 100, 200, 500, 1,000, 2,000 and 5,000 Kč; coins cover 1, 2, 5, 10, 20 and 50 Kč. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than koruna.",
      ],
    },
  ],
  travelPlace: "Prague and Czechia",
  faqs: [
    {
      question: "What currency is used in Prague?",
      answer:
        "Prague uses the Czech Koruna (CZK), the same currency as the rest of Czechia. The euro is not the official currency. A euro price on a tourist menu is a convenience quote, not legal tender.",
    },
    {
      question: "What is the Czech Koruna?",
      answer:
        "The Czech Koruna — also called the Czech crown — is the official currency of Czechia. Its code is CZK and its everyday symbol is Kč. One koruna is 100 haléřů.",
    },
    {
      question: "Is the Czech crown the same as the Czech Koruna?",
      answer:
        "Yes. “Czech crown” is the English translation of koruna, so both names mean the same currency. Locals say koruna; the code is CZK and the everyday abbreviation is Kč.",
    },
    {
      question: "What does CZK stand for?",
      answer:
        "CZK is the ISO 4217 code for the Czech Koruna. Banks, cards and converters use it so it is not confused with other koruna or crown currencies.",
    },
    {
      question: "What is the Czech Koruna symbol?",
      answer:
        "The usual symbol is Kč, written after the amount (for example 500 Kč). International listings also show CZK.",
    },
    {
      question: "Is CZK the same as the euro?",
      answer:
        "No. Czechia is in the European Union but uses the koruna, not the euro, so prices are in CZK. Some tourist spots show a euro figure for convenience or take euros at their own rate — check which currency you are actually being charged in before you pay.",
    },
    {
      question: "How do I convert GBP to CZK?",
      answer:
        "Multiply the pound amount by the GBP/CZK rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert CZK to GBP?",
      answer:
        "Divide the koruna amount by the GBP/CZK rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy Czech Koruna?",
      answer:
        "Common options are a UK bank or bureau before you travel, or a Prague change office once you arrive. Stock, hours and fees vary by provider. Wayfare does not sell koruna — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Should I take Czech Koruna cash to Prague?",
      answer:
        "A modest amount of Kč is useful for markets, tips and smaller vendors. You do not usually need to carry most of a Prague trip in cash. Keep a small emergency amount separate and use a card where terminals work.",
    },
    {
      question: "Can I use a card in Prague?",
      answer:
        "In most hotels, restaurants and city shops, yes. Check foreign-transaction fees. Some smaller businesses still prefer cash.",
    },
    {
      question: "Can I withdraw Czech Koruna from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw CZK, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose CZK or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing CZK usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a Prague trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for markets and tips. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the koruna you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "TRY", "USD", "AED", "THB", "PLN", "JPY"],
  conversionPairBases: [],
};

const polishZloty: CurrencyContent = {
  slug: "polish-zloty",
  h1: "Polish zloty — Poland’s currency",
  metaTitle: "Polish Zloty (PLN): Polish Currency and Exchange Rate",
  summary:
    "The Polish Zloty (PLN, zł) is the official currency of Poland — Warsaw, Kraków and the rest of the country. Convert pounds and euros with an indicative rate, then see cash, card, ATM and buying-zloty notes — Wayfare does not sell zloty.",
  metaDescription:
    "Convert pounds to Polish zloty with an indicative PLN rate, plus cash, card, ATM and buying-zloty notes for Poland. Not a dealing quote.",
  about: {
    heading: "What is the Polish Zloty?",
    paragraphs: [
      "The Polish Zloty is Poland’s official currency, issued by Narodowy Bank Polski. Its ISO code is PLN and the everyday symbol is zł, usually written after the amount (for example 50 zł). One zloty is divided into 100 groszy. The name złoty means “golden”; in English it is the Polish Zloty.",
      "The same notes and coins are legal tender nationwide — Warsaw, Kraków, Gdańsk, Wrocław, the mountains and smaller towns. Poland is in the European Union but has not joined the eurozone, so day-to-day prices are in zloty, not euros.",
    ],
  },
  howRatesWork: {
    heading: "Polish money in Warsaw, Kraków and beyond",
    paragraphs: [
      "If you are looking up Polish currency for a city break, Warsaw and Kraków both use Polish Zloty. Shops, cafés, trains and hotels price in PLN. A tourist menu may also show a pound or euro figure as a convenience quote; that is not a second official currency.",
      "Cards are widely used in Polish cities. Cash still helps at markets, smaller bakeries and some rural stops. Euro notes are not Polish legal tender — do not assume a euro price is an official rate, and do not count on every vendor taking euros.",
    ],
  },
  whatAffects: {
    heading: "How Polish Zloty exchange rates work",
    paragraphs: [
      "A PLN exchange rate is how many zloty one unit of another currency converts into. A GBP/PLN figure of 4.92 means one pound buys about 4.92 zł on that quote. EUR/PLN works the same way for euros. The number on a board is not automatically the amount you receive.",
      "Banks, UK bureaux, Polish kantors and cards usually add a margin, a fee, or both. A stronger-looking headline rate can still pay out fewer zloty once those extras are included. Compare the total zł you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/PLN and EUR/PLN",
    paragraphs: [
      "Pairs are written base-first. In GBP/PLN the pound is the base, so the number is how many zloty one pound buys: a sample rate of 4.92 means £1 ≈ 4.92 zł. EUR/PLN is how many zloty one euro buys.",
      "To convert pounds, multiply by the GBP/PLN rate (£100 × 4.92 = 492 zł on this demo figure). To go back, divide zloty by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some zloty for markets, tips, bakeries and the first taxi or tram ticket. Warsaw and Kraków are fairly card-friendly in the centre, so you rarely need a large cash float. Keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants, supermarkets and city transport in Poland commonly take contactless and chip-and-PIN. Check your card’s foreign-transaction fees. Away from the centre, have zł ready rather than assuming a terminal will work. Sketch a trip total on the travel money planner if you want a cash-versus-card split.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in Polish cities, at airports and in towns. Withdraw zloty when you need it. Some operators add a fee on screen — this page does not assume a standard Polish ATM charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging zloty",
      paragraphs: [
        "You can buy Polish Zloty at a UK bureau before you fly, or exchange after you land. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. In Poland, kantors in town may quote differently again. Compare how many zł you would receive for a set pound amount after any commission, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If a Polish ATM or card terminal offers to charge you in pounds rather than zloty, the operator is applying its own conversion (DCC). Choosing PLN usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are 10, 20, 50, 100, 200 and 500 zł; coins cover 1, 2 and 5 zł plus groszy pieces. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than zloty.",
      ],
    },
  ],
  travelPlace: "Poland",
  faqs: [
    {
      question: "What currency is used in Poland?",
      answer:
        "Poland uses the Polish Zloty (PLN), including in Warsaw and Kraków. The euro is not the official currency. A euro price on a tourist menu is a convenience quote, not legal tender.",
    },
    {
      question: "What is the Polish Zloty?",
      answer:
        "The Polish Zloty is the official currency of Poland. Its code is PLN and its everyday symbol is zł. One zloty is 100 groszy.",
    },
    {
      question: "Is “zloty” the same as “złoty”?",
      answer:
        "Yes. Złoty is the Polish spelling — it means “golden” — and zloty is the common English form. Both refer to the same currency, written zł and coded PLN.",
    },
    {
      question: "What does PLN stand for?",
      answer:
        "PLN is the ISO 4217 code for the Polish Zloty. Banks, cards and converters use it so it is not confused with other currencies.",
    },
    {
      question: "What is the Polish Zloty symbol?",
      answer:
        "The usual symbol is zł, written after the amount (for example 100 zł). International listings also show PLN.",
    },
    {
      question: "Does Poland use the euro?",
      answer:
        "No. Poland is in the European Union but has not adopted the euro. Prices, cash and most card charges are in Polish Zloty.",
    },
    {
      question: "How do I convert GBP to PLN?",
      answer:
        "Multiply the pound amount by the GBP/PLN rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert PLN to GBP?",
      answer:
        "Divide the zloty amount by the GBP/PLN rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy Polish Zloty?",
      answer:
        "Common options are a UK bank or bureau before you travel, or a Polish kantor once you arrive. Stock, hours and fees vary by provider. Wayfare does not sell zloty — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Should I take Polish Zloty cash to Poland?",
      answer:
        "A modest amount of zł is useful for markets, tips and smaller vendors. You do not usually need to carry most of a Poland trip in cash. Keep a small emergency amount separate and use a card where terminals work.",
    },
    {
      question: "Can I use a card in Warsaw and Kraków?",
      answer:
        "In most hotels, restaurants and city shops, yes. Check foreign-transaction fees. Some smaller businesses still prefer cash.",
    },
    {
      question: "Can I withdraw Polish Zloty from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw PLN, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose PLN or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing PLN usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a Poland trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for markets and tips. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, kantor, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the zloty you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "CZK", "TRY", "USD", "AED", "THB", "JPY"],
  conversionPairBases: [],
};

const japaneseYen: CurrencyContent = {
  slug: "japanese-yen",
  h1: "Japanese yen exchange rate",
  metaTitle: "Japanese Yen (JPY) Exchange Rate for Travel",
  summary:
    "The Japanese Yen (JPY, ¥) is the official currency of Japan — Tokyo, Kyoto, Osaka and the rest of the country. Convert pounds, euros and dollars with an indicative rate, then see cash, card, ATM and buying-yen notes — Wayfare does not sell yen.",
  metaDescription:
    "Convert pounds to yen with an indicative JPY rate, plus cash, card, ATM and buying-yen notes for Japan. Not a dealing quote.",
  about: {
    heading: "What is the Japanese Yen?",
    paragraphs: [
      "The Japanese Yen is Japan’s official currency, issued by the Bank of Japan. Its ISO code is JPY and its symbol is ¥, usually written before the amount (for example ¥1,000). Everyday prices are in whole yen — the old sen subdivision is not used in shops. International listings use JPY so yen is not confused with the Chinese yuan, which can share the same ¥ mark.",
      "The same notes and coins are legal tender nationwide: Tokyo, Kyoto, Osaka, Hokkaido, Okinawa and smaller towns. You do not change money when you travel between prefectures. A hotel or tour desk may also show a pound or dollar figure as a convenience quote; that is not a second official currency.",
    ],
  },
  howRatesWork: {
    heading: "Yen in daily use in Japan",
    paragraphs: [
      "If you are looking up Japanese money for a trip, the unit in your hand is the yen. Convenience stores, vending machines, rail tickets and most restaurants price in JPY. Stored-value travel cards such as Suica or Pasmo also spend yen — they are a way to pay, not a different currency.",
      "Japan is more cash-friendly than a typical UK high street, especially at smaller restaurants, temples, markets and in the countryside. Hotels, department stores and many city shops take cards. An IC card covers trains and a growing list of convenience-store tills. Plan for a mix rather than assuming contactless will work everywhere.",
    ],
  },
  whatAffects: {
    heading: "Exchanging yen and reading a JPY rate",
    paragraphs: [
      "A JPY exchange rate is how many yen one unit of another currency converts into. A GBP/JPY figure of 205 means one pound buys about ¥205 on that quote. EUR/JPY and USD/JPY work the same way for euros and dollars. The number on a board is not automatically the amount you receive.",
      "Banks, UK bureaux, Japanese desks and cards usually add a margin, a fee, or both. A stronger-looking headline rate can still pay out fewer yen once those extras are included. Compare the total ¥ you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/JPY, EUR/JPY and USD/JPY",
    paragraphs: [
      "Pairs are written base-first. In GBP/JPY the pound is the base, so the number is how many yen one pound buys: a sample rate of 205 means £1 ≈ ¥205. EUR/JPY is how many yen one euro buys; USD/JPY is how many yen one dollar buys. The figures look large because a single yen is a small unit.",
      "To convert pounds, multiply by the GBP/JPY rate (£100 × 205 = ¥20,500 on this demo figure). Results are whole yen. To go back, divide yen by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some yen for vending machines, smaller restaurants, temple donations, markets and rural stops. You rarely need a whole trip in notes, but Japan still has more cash-only corners than the UK. Keep an emergency amount separate from daily spending. A ¥10,000 note is useful; keep smaller notes and coins for machines.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, department stores, chain restaurants and many city shops take chip-and-PIN and contactless. Check your card’s foreign-transaction fees. IC cards (Suica, Pasmo and similar) are the practical way to pay on trains and at many convenience stores. Away from the centre, have yen ready rather than assuming a terminal will work. Sketch a trip total on the travel money planner if you want a cash-versus-card split.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Not every Japanese bank machine accepts a foreign card. 7-Eleven and Japan Post ATMs are the usual starting point for UK and other overseas cards; airport machines are a backup on arrival. Withdraw yen when you need it. Some operators add a fee on screen — this page does not assume a standard Japanese ATM charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging yen",
      paragraphs: [
        "You can buy yen at a UK bureau before you fly, or exchange after you land. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. In Japan, city banks and exchange houses may quote differently again. Compare how many ¥ you would receive for a set pound amount after any commission, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If a Japanese ATM or card terminal offers to charge you in pounds rather than yen, the operator is applying its own conversion (DCC). Choosing JPY usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are ¥1,000, ¥5,000 and ¥10,000; a ¥2,000 note exists but is uncommon. Coins are ¥1, ¥5, ¥10, ¥50, ¥100 and ¥500. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than yen.",
      ],
    },
  ],
  travelPlace: "Japan",
  faqs: [
    {
      question: "What currency is used in Japan?",
      answer:
        "Japan uses the Japanese Yen (JPY), including in Tokyo, Kyoto and Osaka. The same notes and coins are legal tender nationwide. A pound or dollar figure on a hotel or tour desk is a convenience quote, not a second official currency.",
    },
    {
      question: "What is the Japanese Yen?",
      answer:
        "The Japanese Yen is the official currency of Japan. Its code is JPY and its symbol is ¥. Everyday amounts are in whole yen.",
    },
    {
      question: "Is “yen” the same as the “Japanese Yen”?",
      answer:
        "Yes. Yen is the everyday name for the currency; Japanese Yen is the full name and JPY is its international code. All three refer to the same money, written ¥.",
    },
    {
      question: "What does JPY stand for?",
      answer:
        "JPY is the ISO 4217 code for the Japanese Yen. Banks, cards and converters use it so yen is not confused with other currencies that share a ¥-style symbol.",
    },
    {
      question: "What is the yen symbol?",
      answer:
        "The usual symbol is ¥, written before the amount (for example ¥1,000). International listings also show JPY.",
    },
    {
      question: "How do I convert GBP to JPY?",
      answer:
        "Multiply the pound amount by the GBP/JPY rate. On this page’s demo figure of 205, £100 is ¥20,500. The converter shows an indicative result, not what a bureau or card will pay out.",
    },
    {
      question: "How do I convert JPY to GBP?",
      answer:
        "Divide the yen amount by the GBP/JPY rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy Japanese Yen?",
      answer:
        "Common options are a UK bank or bureau before you travel, a Japanese bank or exchange house after you arrive, or a foreign-card ATM. Stock, hours and fees vary by provider. Wayfare does not sell yen — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "How do I exchange yen for a trip to Japan?",
      answer:
        "You can buy yen notes in the UK, exchange after you arrive, withdraw from a foreign-card ATM, or spend on a card that converts when you pay. Compare the yen you would actually receive after fees — not a headline rate. Use the converter on this page as an indicative planning figure, then judge any real quote against it.",
    },
    {
      question: "Should I take yen cash to Japan?",
      answer:
        "A modest amount of yen is useful for vending machines, smaller restaurants, temples and rural stops. You do not usually need to carry most of a Japan trip in cash. Keep a small emergency amount separate.",
    },
    {
      question: "Can I use a card in Japan?",
      answer:
        "In hotels, department stores and many city shops, yes. Check foreign-transaction fees. Smaller restaurants, some temples and rural businesses still prefer cash. An IC card is useful for trains and convenience stores.",
    },
    {
      question: "Can I withdraw Japanese Yen from an ATM?",
      answer:
        "Yes, if your card works abroad — but not every Japanese bank machine takes foreign cards. 7-Eleven and Japan Post ATMs are the usual starting point. Read any fee on screen and compare a pounds conversion offer before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose JPY or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing JPY usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a Japan trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for machines, temples and rural stops. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, exchange house, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the yen you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "THB", "USD", "TRY", "AED", "CZK", "PLN"],
  conversionPairBases: [],
};

const australianDollar: CurrencyContent = {
  slug: "australian-dollar",
  h1: "Australian dollar exchange rate",
  metaTitle: "Australian Dollar (AUD): Australia Currency and Exchange Rate",
  summary:
    "The Australian Dollar (AUD, A$) is the currency used across Australia. Convert pounds to Australian dollars with an indicative GBP/AUD rate, then see cash, card, ATM and buying notes for a trip — Wayfare does not sell Australian dollars.",
  metaDescription:
    "Convert pounds to Australian dollars with an indicative AUD rate, plus cash, card, ATM and buying notes for Australia. Not a dealing quote.",
  about: {
    heading: "What is the Australian Dollar?",
    paragraphs: [
      "The Australian Dollar is Australia’s official currency, issued by the Reserve Bank of Australia. Its ISO code is AUD and the symbol is $ — usually written A$ or AU$ in international listings so it is not confused with the US or other dollars. One dollar is divided into 100 cents. In everyday speech it is also called the “Aussie dollar” or “oz dollar”.",
      "So Australia does use dollars, but they are Australian dollars, not US dollars. The same notes and coins are legal tender nationwide — Sydney, Melbourne, Brisbane, Perth and Tasmania included. A tourist-facing business may also show a pound figure as a convenience quote; that is not a second official currency.",
    ],
  },
  howRatesWork: {
    heading: "Australian money in daily use",
    paragraphs: [
      "If you are looking up the currency in Australia for a trip, the unit you spend is the Australian dollar. Shops, cafés, transport and hotels price in AUD across the country. Cards are widely used in cities, so you rarely need a large cash float, but some markets, small vendors and rural stops still prefer cash.",
      "Contactless is common in Australian cities. Keep some AUD for day-to-day gaps and smaller purchases, and use a card where terminals work. Plan for a mix rather than assuming either cash or card everywhere.",
    ],
  },
  whatAffects: {
    heading: "How Australian Dollar exchange rates work",
    paragraphs: [
      "A GBP/AUD exchange rate is how many Australian dollars one pound converts into. A figure of 2.03 means one pound buys about A$2.03 on that quote — the same idea people search for as “sterling to Australian dollar” or “foreign exchange AUD”. The number on a board is not automatically the amount you receive.",
      "Banks, UK bureaux, Australian desks and cards usually add a margin, a fee, or both. A headline rate that looks stronger can still pay out fewer Australian dollars once those extras are included, which is why the same GBP→AUD request differs between providers. Compare the total A$ you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers or claim a best rate.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/AUD, EUR/AUD and USD/AUD",
    paragraphs: [
      "Pairs are written base-first. In GBP/AUD the pound is the base, so the number is how many Australian dollars one pound buys: a sample rate of 2.03 means £1 ≈ A$2.03. EUR/AUD is how many Australian dollars one euro buys; USD/AUD is how many one US dollar buys.",
      "To convert pounds, multiply by the GBP/AUD rate (£100 × 2.03 = A$203 on this demo figure). To go back, divide Australian dollars by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some Australian dollars for markets, cafés, tips and smaller vendors. Cities are card-friendly, so you rarely need a large cash float — keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants, supermarkets and transport in Australian cities commonly take contactless and chip-and-PIN. Check your card’s foreign-transaction fees. Away from the centre, have AUD ready rather than assuming a terminal will work. Sketch a trip total on the travel money planner if you want a cash-versus-card split.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in Australian cities, at airports and in towns. Withdraw Australian dollars when you need them. Some operators add a fee on screen — this page does not assume a standard Australian ATM charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging Australian dollars",
      paragraphs: [
        "You can buy Australian dollars at a UK bank or bureau before you fly, or exchange after you land. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many A$ you would receive for a set pound amount after any commission, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If an Australian ATM or card terminal offers to charge you in pounds rather than Australian dollars, the operator is applying its own conversion (DCC). Choosing AUD usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are $5, $10, $20, $50 and $100; coins are 5c, 10c, 20c, 50c, $1 and $2. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than Australian dollars.",
      ],
    },
  ],
  travelPlace: "Australia",
  faqs: [
    {
      question: "What currency does Australia use?",
      answer:
        "Australia uses the Australian Dollar (AUD), including in Sydney, Melbourne and Tasmania. It is the currency across the whole country. A pound figure on a tourist menu is a convenience quote, not a second currency.",
    },
    {
      question: "What does AUD mean?",
      answer:
        "AUD is the ISO 4217 code for the Australian Dollar — the “Australian AUD” or “AU money” people search for. Its symbol is $, often written A$ or AU$, and one dollar is 100 cents.",
    },
    {
      question: "Is the Australian dollar the same as the US dollar?",
      answer:
        "No. Both are called “dollars”, but the Australian dollar (AUD) and US dollar (USD) are separate currencies with different values. In Australia the dollars you spend are Australian dollars, sometimes nicknamed the “Aussie” or “oz” dollar.",
    },
    {
      question: "How do I convert GBP to AUD?",
      answer:
        "Multiply the pound amount by the GBP/AUD rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert AUD to GBP?",
      answer:
        "Divide the Australian dollar amount by the GBP/AUD rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Why can GBP to AUD rates differ between providers?",
      answer:
        "Each bank, bureau, card or ATM sets its own dealing rate and may add a margin or fee, so the same pound-to-Australian-dollar request pays out different amounts. Wayfare does not claim a best rate — compare the A$ you would actually receive for a set pound sum, not just the headline rate.",
    },
    {
      question: "Where can I buy Australian dollars?",
      answer:
        "Common options are a UK bank or bureau before you travel, or an exchange desk once you arrive in Australia. Stock, hours and fees vary by provider. Wayfare does not sell Australian dollars — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Can I withdraw Australian dollars from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw AUD, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose AUD or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing AUD usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for an Australia trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for markets and smaller vendors. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the Australian dollars you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["USD", "EUR", "JPY", "THB", "AED", "CZK", "PLN"],
  conversionPairBases: [],
};

const icelandicKrona: CurrencyContent = {
  slug: "icelandic-krona",
  h1: "Icelandic krona — Iceland’s currency",
  metaTitle: "Icelandic Krona (ISK): Iceland Currency and Exchange Rate",
  summary:
    "The Icelandic Krona (ISK, kr) is the currency used in Iceland. Convert pounds to Icelandic krona with an indicative GBP/ISK rate, then see cash, card, ATM and buying notes for a trip — Wayfare does not sell krona.",
  metaDescription:
    "Convert pounds to Icelandic krona with an indicative ISK rate, plus cash, card, ATM and buying notes for Iceland. Not a dealing quote.",
  about: {
    heading: "What is the Icelandic Krona?",
    paragraphs: [
      "The Icelandic Krona is Iceland’s official currency, issued by the Central Bank of Iceland. Its ISO code is ISK and the symbol is kr. In Icelandic the currency is the króna (plural krónur); you may also see it written “krona”, “kronur” or “kroner” in English. Amounts are whole krónur — there is no minor unit in everyday use, so prices and the converter here do not use decimals.",
      "This is the currency for Iceland — Reykjavík and the whole country — and what Icelandic money is called day to day. A tour or hotel desk may also show a pound or euro figure as a convenience quote; that is not a second official currency.",
    ],
  },
  howRatesWork: {
    heading: "Icelandic money in daily use",
    paragraphs: [
      "If you are looking up the currency for Iceland or Reykjavík, the unit you spend is the krona. Shops, cafés, fuel stops and tours price in ISK. Cards are widely used across Iceland, so many visitors carry only a little cash — keep some krona for smaller purchases and gaps, and use a card where terminals work.",
      "Because a single krona is a small unit, everyday prices carry large numbers (a coffee can be several hundred krónur). That is normal — it does not mean anything is unusually expensive in pound terms until you convert it.",
    ],
  },
  whatAffects: {
    heading: "How Icelandic Krona exchange rates work",
    paragraphs: [
      "A GBP/ISK exchange rate is how many krona one pound converts into. A figure of 168 means one pound buys about 168 kr on that quote — the same idea people search for as “sterling to Icelandic krona” or “foreign exchange Icelandic krona”. The number on a board is not automatically the amount you receive.",
      "Banks, UK bureaux, Icelandic desks and cards usually add a margin, a fee, or both. A headline rate that looks stronger can still pay out fewer krona once those extras are included, which is why the same GBP→ISK request differs between providers. Compare the total kr you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers or claim a best rate.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/ISK, EUR/ISK and USD/ISK",
    paragraphs: [
      "Pairs are written base-first. In GBP/ISK the pound is the base, so the number is how many krona one pound buys: a sample rate of 168 means £1 ≈ 168 kr. EUR/ISK is how many krona one euro buys; USD/ISK is how many one US dollar buys. The figures look large because a single krona is a small unit.",
      "To convert pounds, multiply by the GBP/ISK rate (£100 × 168 = 16,800 kr on this demo figure). Results are whole krónur. To go back, divide krona by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Cards go a long way in Iceland, so you rarely need a large cash float. Carry a little krona for smaller purchases, tips and gaps, and keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants, shops, fuel stations and tours across Iceland commonly take contactless and chip-and-PIN. Check your card’s foreign-transaction fees. A prepaid travel money card can also hold krona — compare options on the Travel Money hub. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are found in Icelandic towns, at the airport and in Reykjavík. Withdraw krona when you need it. Some operators add a fee on screen — this page does not assume a standard Icelandic ATM charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging Icelandic krona",
      paragraphs: [
        "You can buy Icelandic krona at a UK bank or bureau before you fly, or exchange after you land. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many kr you would receive for a set pound amount after any commission, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If an Icelandic ATM or card terminal offers to charge you in pounds rather than krona, the operator is applying its own conversion (DCC). Choosing ISK usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are 500, 1,000, 2,000, 5,000 and 10,000 kr; coins are 1, 5, 10, 50 and 100 kr. Amounts are whole krónur — there is no minor unit in circulation. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than krona.",
      ],
    },
  ],
  travelPlace: "Iceland",
  faqs: [
    {
      question: "What currency does Iceland use?",
      answer:
        "Iceland uses the Icelandic Krona (ISK), including in Reykjavík and across the whole country. A pound or euro figure on a tour or hotel desk is a convenience quote, not a second currency.",
    },
    {
      question: "What is the Icelandic Krona, and what is ISK?",
      answer:
        "The Icelandic Krona is Iceland’s official currency — what Icelandic money is called day to day. ISK is its ISO 4217 code and the symbol is kr. Amounts are whole krónur, with no everyday minor unit.",
    },
    {
      question: "Is it “krona”, “krónur” or “kroner”?",
      answer:
        "They refer to the same currency. In Icelandic it is the króna (singular) and krónur (plural); in English you will also see “krona”, “kronur” and the Danish-style “kroner”. The code ISK and symbol kr are used everywhere to avoid confusion with other Nordic kronor and kroner.",
    },
    {
      question: "What are the Icelandic Krona denominations?",
      answer:
        "Notes are 500, 1,000, 2,000, 5,000 and 10,000 kr; coins are 1, 5, 10, 50 and 100 kr. Because there is no minor unit in circulation, prices and conversions are whole krónur.",
    },
    {
      question: "How do I convert GBP to ISK?",
      answer:
        "Multiply the pound amount by the GBP/ISK rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert ISK to GBP?",
      answer:
        "Divide the krona amount by the GBP/ISK rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Why can Icelandic Krona exchange rates differ between providers?",
      answer:
        "Each bank, bureau, card or ATM sets its own dealing rate and may add a margin or fee, so the same pound-to-krona request pays out different amounts. Wayfare does not claim a best rate — compare the kr you would actually receive for a set pound sum, not just the headline rate.",
    },
    {
      question: "Where can I buy Icelandic Krona?",
      answer:
        "Common options are a UK bank or bureau before you travel, or an exchange desk once you arrive. Stock, hours and fees vary by provider. Wayfare does not sell Icelandic krona — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Can I use cards in Iceland?",
      answer:
        "Cards are widely used across Iceland, from Reykjavík to smaller towns and tours. Check foreign-transaction fees, and keep a little krona for smaller purchases. A prepaid travel money card can also hold krona — compare options on the Travel Money hub.",
    },
    {
      question: "Can I withdraw Icelandic Krona from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw ISK, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose ISK or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing ISK usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for an Iceland trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a small cash share since cards cover most spending. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the krona you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "USD", "JPY", "AUD", "THB", "TRY", "PLN"],
  conversionPairBases: [],
};

const danishKrone: CurrencyContent = {
  slug: "danish-krone",
  h1: "Danish krone — Denmark and Copenhagen currency",
  metaTitle: "Danish Krone (DKK): Denmark Currency and Exchange Rate",
  summary:
    "The Danish Krone (DKK, kr) is Denmark’s currency — used in Copenhagen and across the country. Convert pounds to Danish kroner with an indicative GBP/DKK rate, then see cash, card, ATM and buying notes for a trip — Wayfare does not sell kroner.",
  metaDescription:
    "Convert pounds to Danish kroner with an indicative DKK rate, plus cash, card, ATM and buying notes for Denmark and Copenhagen. Not a dealing quote.",
  about: {
    heading: "What is the Danish Krone?",
    paragraphs: [
      "The Danish Krone is Denmark’s official currency, issued by Danmarks Nationalbank. Its ISO code is DKK and the symbol is kr. The currency is the krone (singular) and kroner (plural); one krone is divided into 100 øre. International listings use DKK so it is not confused with the Norwegian or Swedish kroner.",
      "Denmark uses the krone, not the euro: it is in the European Union but has not adopted the euro, so everyday prices are in kroner. A hotel or tour desk may also show a pound or euro figure as a convenience quote; that is not a second official currency.",
    ],
  },
  howRatesWork: {
    heading: "What currency is used in Copenhagen?",
    paragraphs: [
      "Copenhagen uses the Danish Krone, the same as the rest of Denmark — there is no separate Copenhagen currency. If you are looking up “money in Copenhagen” or the “currency of Copenhagen, Denmark”, the answer is DKK, priced in kroner across shops, cafés, transport and hotels.",
      "Denmark is highly card-friendly, so many visitors carry only a little cash. Keep some kroner for smaller purchases and gaps, and use a card where terminals work. Plan for a mix rather than assuming either everywhere.",
    ],
  },
  whatAffects: {
    heading: "How Danish Krone exchange rates work",
    paragraphs: [
      "A GBP/DKK exchange rate is how many kroner one pound converts into. A figure of 8.68 means one pound buys about 8.68 kr on that quote — the same idea people search for as “sterling to Danish krone”. The number on a board is not automatically the amount you receive.",
      "The krone is kept close to the euro through a long-standing peg, so EUR/DKK moves very little, while GBP/DKK still shifts with the pound. Banks, UK bureaux, Danish desks and cards usually add a margin, a fee, or both, which is why the same GBP→DKK request differs between providers. Compare the total kr you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers or claim a best rate.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/DKK, EUR/DKK and USD/DKK",
    paragraphs: [
      "Pairs are written base-first. In GBP/DKK the pound is the base, so the number is how many kroner one pound buys: a sample rate of 8.68 means £1 ≈ 8.68 kr. EUR/DKK is how many kroner one euro buys; USD/DKK is how many one US dollar buys.",
      "To convert pounds, multiply by the GBP/DKK rate (£100 × 8.68 = 868 kr on this demo figure). To go back, divide kroner by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Cards go a long way in Denmark, so you rarely need a large cash float. Carry a little kroner for smaller purchases, tips and gaps, and keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants, shops and transport in Copenhagen and across Denmark commonly take contactless and chip-and-PIN. Check your card’s foreign-transaction fees. Away from the centre, have kroner ready rather than assuming a terminal will work. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in Copenhagen, at the airport and in Danish towns. Withdraw kroner when you need it. Some operators add a fee on screen — this page does not assume a standard Danish ATM charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging Danish kroner",
      paragraphs: [
        "You can buy Danish kroner at a UK bank or bureau before you fly, or exchange after you land. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many kr you would receive for a set pound amount after any commission, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If a Danish ATM or card terminal offers to charge you in pounds rather than kroner, the operator is applying its own conversion (DCC). Choosing DKK usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are 50, 100, 200, 500 and 1,000 kr; coins are 50 øre, 1, 2, 5, 10 and 20 kr. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than kroner.",
      ],
    },
  ],
  travelPlace: "Denmark",
  faqs: [
    {
      question: "What currency does Denmark use?",
      answer:
        "Denmark uses the Danish Krone (DKK), including in Copenhagen and across the country. It is not the euro. A pound or euro figure on a tourist menu is a convenience quote, not legal tender.",
    },
    {
      question: "What is the Danish Krone, and what is DKK?",
      answer:
        "The Danish Krone is Denmark’s official currency. DKK is its ISO 4217 code and the symbol is kr. One krone is divided into 100 øre.",
    },
    {
      question: "Is it “krone” or “kroner”?",
      answer:
        "Both refer to the same currency: krone is singular and kroner is plural. You will see “Danish krone” and “Danish kroner” used interchangeably in English; the code DKK and symbol kr avoid confusion with Norwegian and Swedish kroner.",
    },
    {
      question: "What currency is used in Copenhagen?",
      answer:
        "Copenhagen uses the Danish Krone, the same as the rest of Denmark — there is no separate Copenhagen currency. Prices, cash and most card charges are in kroner.",
    },
    {
      question: "Does Denmark use the euro?",
      answer:
        "No. Denmark is in the European Union but has not adopted the euro, so it uses the Danish Krone. The krone is kept close to the euro through a long-standing peg, but you spend and are usually charged in kroner.",
    },
    {
      question: "How do I convert GBP to DKK?",
      answer:
        "Multiply the pound amount by the GBP/DKK rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert DKK to GBP?",
      answer:
        "Divide the krone amount by the GBP/DKK rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Where can I buy Danish kroner?",
      answer:
        "Common options are a UK bank or bureau before you travel, or an exchange desk once you arrive. Stock, hours and fees vary by provider. Wayfare does not sell Danish kroner — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Can I use cards in Denmark?",
      answer:
        "Cards are widely used across Denmark, from Copenhagen to smaller towns. Check foreign-transaction fees, and keep a little kroner for smaller purchases where cash is handy.",
    },
    {
      question: "Can I withdraw Danish kroner from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw DKK, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose DKK or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing DKK usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a Denmark trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a small cash share since cards cover most spending. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the kroner you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["EUR", "ISK", "CZK", "PLN", "USD", "JPY", "TRY"],
  conversionPairBases: [],
};

const hungarianForint: CurrencyContent = {
  slug: "hungarian-forint",
  h1: "Hungarian forint — Hungary’s currency",
  metaTitle: "Hungarian Forint (HUF): Hungary Currency and Exchange Rate",
  summary:
    "The Hungarian Forint (HUF, Ft) is the currency used in Hungary — Budapest and across the country. Convert pounds to forint with an indicative GBP/HUF rate, then see cash, card, ATM and buying notes for a trip — Wayfare does not sell forint.",
  metaDescription:
    "Convert pounds to forint with an indicative HUF rate, plus cash, card, ATM and buying notes for Hungary and Budapest. Not a dealing quote.",
  about: {
    heading: "What is the Hungarian Forint?",
    paragraphs: [
      "The Hungarian Forint is Hungary’s official currency, issued by the Magyar Nemzeti Bank (Hungarian National Bank). Its ISO code is HUF and the symbol is Ft. Because a single forint is a small unit, everyday prices carry large numbers — that is normal until you convert them into pounds.",
      "Hungary uses the forint, not the euro: it is in the European Union but has not adopted the euro, so day-to-day prices in Budapest and the rest of the country are in forint. A hotel or tour desk may also show a pound or euro figure as a convenience quote; that is not a second official currency.",
    ],
  },
  howRatesWork: {
    heading: "What currency is used in Budapest?",
    paragraphs: [
      "Budapest uses the Hungarian Forint, the same as the rest of Hungary — there is no separate Budapest currency. If you are looking up the currency for Budapest or Hungary, the answer is HUF, priced in forint across shops, cafés, transport and hotels.",
      "Cards are widely used in Hungarian cities, so many visitors carry only a little cash. Keep some forint for smaller purchases, markets and gaps, and use a card where terminals work.",
    ],
  },
  whatAffects: {
    heading: "How Hungarian Forint exchange rates work",
    paragraphs: [
      "A GBP/HUF exchange rate is how many forint one pound converts into. A figure of 470 means one pound buys about 470 Ft on that quote — the same idea behind searches for a “Hungarian forint exchange rate”. The number on a board is not automatically the amount you receive.",
      "The forint floats, so GBP/HUF and EUR/HUF move with the market. Banks, UK bureaux, Hungarian desks and cards usually add a margin, a fee, or both, which is why the same GBP→HUF request differs between providers. Compare the total Ft you would actually get for a round sum such as £100 or £500 — not the advertised rate alone. Wayfare does not rank providers or claim a best rate.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote. A bureau or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/HUF, EUR/HUF and USD/HUF",
    paragraphs: [
      "Pairs are written base-first. In GBP/HUF the pound is the base, so the number is how many forint one pound buys: a sample rate of 470 means £1 ≈ 470 Ft. EUR/HUF is how many forint one euro buys; USD/HUF is how many one US dollar buys. The figures look large because a single forint is a small unit.",
      "To convert pounds, multiply by the GBP/HUF rate (£100 × 470 = 47,000 Ft on this demo figure). To go back, divide forint by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some forint for markets, tips, smaller cafés and the first transport ticket. Budapest and larger towns are fairly card-friendly, so you rarely need a large cash float — keep an emergency amount separate from daily spending.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants, shops and transport in Hungarian cities commonly take contactless and chip-and-PIN. Check your card’s foreign-transaction fees. Away from the centre, have forint ready rather than assuming a terminal will work. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in Budapest, at the airport and in Hungarian towns. Withdraw forint when you need it. Some operators add a fee on screen — this page does not assume a standard Hungarian ATM charge. Use the ATM withdrawal calculator if you want a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging forint",
      paragraphs: [
        "You can buy Hungarian forint at a UK bank or bureau before you fly, or exchange at an office once you arrive in Budapest. Banks, bureaux and airport desks set their own rates, fees and stock — Wayfare does not sell notes or list shops near you. Compare how many Ft you would receive for a set pound amount after any commission, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If a Hungarian ATM or card terminal offers to charge you in pounds rather than forint, the operator is applying its own conversion (DCC). Choosing HUF usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are 500, 1,000, 2,000, 5,000, 10,000 and 20,000 Ft; coins are 5, 10, 20, 50, 100 and 200 Ft. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than forint.",
      ],
    },
  ],
  travelPlace: "Hungary",
  faqs: [
    {
      question: "What currency does Hungary use?",
      answer:
        "Hungary uses the Hungarian Forint (HUF), including in Budapest and across the country. It is not the euro. A pound or euro figure on a tourist menu is a convenience quote, not legal tender.",
    },
    {
      question: "What is the Hungarian Forint, and what is HUF?",
      answer:
        "The Hungarian Forint is Hungary’s official currency. HUF is its ISO 4217 code and the symbol is Ft. Because the forint is a small unit, everyday prices are written as large numbers.",
    },
    {
      question: "What currency is used in Budapest?",
      answer:
        "Budapest uses the Hungarian Forint, the same as the rest of Hungary — there is no separate Budapest currency. Prices, cash and most card charges are in forint.",
    },
    {
      question: "Does Hungary use the euro?",
      answer:
        "No. Hungary is in the European Union but has not adopted the euro, so it uses the Hungarian Forint. Some tourist-facing places may quote a euro price for convenience, but you are usually charged in forint.",
    },
    {
      question: "How do I convert GBP to HUF?",
      answer:
        "Multiply the pound amount by the GBP/HUF rate. The converter on this page shows an indicative result — not what a bureau or card will pay out. Open the full currency converter if you want to try other published pairs.",
    },
    {
      question: "How do I convert HUF to GBP?",
      answer:
        "Divide the forint amount by the GBP/HUF rate, or swap the currencies in the converter on this page. The figure is indicative for planning, not a dealing quote.",
    },
    {
      question: "Why can Hungarian Forint exchange rates differ between providers?",
      answer:
        "Each bank, bureau, card or ATM sets its own dealing rate and may add a margin or fee, so the same pound-to-forint request pays out different amounts. Wayfare does not claim a best rate — compare the Ft you would actually receive for a set pound sum, not just the headline rate.",
    },
    {
      question: "Where can I buy or exchange Hungarian Forint?",
      answer:
        "Common options are a UK bank or bureau before you travel, or an exchange office once you arrive in Budapest. Stock, hours and fees vary by provider. Wayfare does not sell forint — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Can I use cards in Hungary?",
      answer:
        "Cards are widely used across Hungarian cities, from Budapest to larger towns. Check foreign-transaction fees, and keep a little forint for markets and smaller purchases.",
    },
    {
      question: "Can I withdraw Hungarian Forint from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw HUF, read any fee on screen, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose HUF or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing HUF usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for a Hungary trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for markets and tips. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
    {
      question: "Why can the rate I receive differ from Wayfare’s figure?",
      answer:
        "Wayfare shows an indicative sample or reference rate for planning. A bank, bureau, card or ATM uses its own dealing rate and may add a margin or fee. Always compare the forint you would actually receive.",
    },
  ],
  relatedCurrencyCodes: ["CZK", "PLN", "EUR", "DKK", "TRY", "USD", "JPY"],
  conversionPairBases: [],
};

const indonesianRupiah: CurrencyContent = {
  slug: "indonesian-rupiah",
  h1: "Indonesian rupiah — Bali and Indonesia currency",
  metaTitle: "Indonesian Rupiah (IDR): Bali Currency and Exchange Rate",
  summary:
    "The Indonesian Rupiah (IDR, Rp) is the currency used across Indonesia — including Bali and Jakarta. Convert pounds to rupiah with an indicative GBP/IDR rate, then see cash, card, ATM and buying notes for a trip. Wayfare does not sell rupiah.",
  metaDescription:
    "Convert pounds to rupiah with an indicative IDR rate, plus cash, card, ATM and buying notes for Indonesia and Bali. Not a dealing quote.",
  about: {
    heading: "What is the Indonesian Rupiah?",
    paragraphs: [
      "The Indonesian Rupiah is Indonesia’s official currency, issued by Bank Indonesia. Its ISO code is IDR and the symbol is Rp — you will often see prices written like Rp 50,000. Because a single rupiah is a very small unit, everyday prices carry lots of zeros; 1,000 rupiah is only a few pence, so large numbers are normal until you convert them to pounds.",
      "There is one currency for the whole country: Indonesia uses the rupiah in Bali, Jakarta and everywhere else. Some tourist-facing businesses in Bali may also quote a US dollar figure, but that is a convenience price — you are normally charged in rupiah.",
    ],
  },
  howRatesWork: {
    heading: "What currency is used in Bali?",
    paragraphs: [
      "Bali uses the Indonesian Rupiah, the same as the rest of Indonesia — there is no separate Bali currency or Bali money. If you are checking what to bring for Bali, the answer is IDR, priced in rupiah across shops, restaurants, transport and tour desks.",
      "Cards are accepted at many hotels, larger restaurants and established venues, but smaller warungs, markets, drivers and rural spots often want cash. Keep some rupiah for day-to-day spending and use a card where terminals are reliable.",
    ],
  },
  whatAffects: {
    heading: "How Indonesian Rupiah exchange rates work",
    paragraphs: [
      "A GBP/IDR exchange rate is how many rupiah one pound converts into. A figure of 21,500 means one pound buys about Rp 21,500 on that quote — the same idea behind a “Bali exchange rate” or “Indonesian rupiah exchange rate” search. The number on a board is not automatically what you receive.",
      "The rupiah floats, so GBP/IDR moves with the market. UK banks, bureaux, Bali money-changers, airport desks and cards usually add a margin, a fee, or both, which is why the same pound amount changes hands for different totals. In Bali especially, compare the rupiah you would actually get for a set pound sum and watch for changers advertising an eye-catching rate then deducting fees. Wayfare does not rank providers or claim a best rate.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote — a changer or card will use its own number.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/IDR, EUR/IDR and USD/IDR",
    paragraphs: [
      "Pairs are written base-first. In GBP/IDR the pound is the base, so the number is how many rupiah one pound buys: a sample rate of 21,500 means £1 ≈ Rp 21,500. The figures look large because a single rupiah is a very small unit.",
      "To convert pounds, multiply by the GBP/IDR rate (£100 × 21,500 = Rp 2,150,000 on this demo figure). To go back, divide rupiah by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry rupiah for warungs, markets, drivers, tips and smaller venues, which often prefer cash. Keep an emergency amount separate from daily spending, and don’t rely on one big withdrawal covering a whole trip.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, larger restaurants and established shops in Bali and Jakarta commonly take cards, but coverage is patchy away from tourist areas. Check your card’s foreign-transaction fees and keep rupiah ready as a backup. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are common in Bali’s tourist areas, at airports and in Indonesian towns, though some have lower per-withdrawal limits. Withdraw rupiah when you need it and read any on-screen fee — this page does not assume a standard Indonesian ATM charge. Use the ATM withdrawal calculator for a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging rupiah",
      paragraphs: [
        "You can buy some Indonesian rupiah at a UK bank or bureau before you fly, or exchange at a money-changer once you arrive in Bali or Jakarta. Providers set their own rates, fees and stock — Wayfare does not sell notes or list changers near you. Compare how many rupiah you would receive for a set pound amount after any commission, count your notes, and use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If an Indonesian ATM or card terminal offers to charge you in pounds rather than rupiah, the operator is applying its own conversion (DCC). Choosing IDR usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are 1,000, 2,000, 5,000, 10,000, 20,000, 50,000 and 100,000 Rp; small coins also circulate. Because the rupiah is a small unit, denominations carry many zeros. Providers earn through a rate margin, a fee, or both. This page does not list changer-specific charges. Browse other published currencies in the currency explorer if your trip uses more than rupiah.",
      ],
    },
  ],
  travelPlace: "Indonesia",
  faqs: [
    {
      question: "What currency does Indonesia use?",
      answer:
        "Indonesia uses the Indonesian Rupiah (IDR), including in Bali and Jakarta. It is the only official currency nationwide. A US dollar figure on a tourist menu is a convenience quote, not legal tender.",
    },
    {
      question: "What is the Indonesian Rupiah, and what is IDR?",
      answer:
        "The Indonesian Rupiah is Indonesia’s official currency. IDR is its ISO 4217 code and the symbol is Rp. Because the rupiah is a small unit, everyday prices are written with lots of zeros.",
    },
    {
      question: "What currency is used in Bali?",
      answer:
        "Bali uses the Indonesian Rupiah, the same as the rest of Indonesia — there is no separate Bali currency. Prices, cash and most card charges are in rupiah, though some venues quote US dollars for convenience.",
    },
    {
      question: "How do I convert GBP to IDR?",
      answer:
        "Multiply the pound amount by the GBP/IDR rate. The converter on this page shows an indicative result — not what a bureau, changer or card will pay out. Open the full currency converter to try other published pairs.",
    },
    {
      question: "Why can Indonesian Rupiah exchange rates differ between providers?",
      answer:
        "Each bank, bureau, Bali money-changer, card or ATM sets its own dealing rate and may add a margin or fee, so the same pound amount pays out different totals. Wayfare does not claim a best rate — compare the rupiah you would actually receive for a set pound sum, and count your notes.",
    },
    {
      question: "Where can I buy or exchange Indonesian Rupiah?",
      answer:
        "Common options are a UK bank or bureau before you travel, or a licensed money-changer once you arrive in Bali or Jakarta. Stock, hours and fees vary by provider. Wayfare does not sell rupiah — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Can I withdraw Indonesian Rupiah from an ATM?",
      answer:
        "Yes, if your card works abroad. Withdraw IDR, read any fee on screen, note that some machines have lower limits, and compare a pounds conversion offer carefully before you accept it. Estimate cost first with the ATM withdrawal tool.",
    },
    {
      question: "Should I choose IDR or GBP at an ATM?",
      answer:
        "When a machine or terminal offers to charge you in pounds, that is often dynamic currency conversion. Choosing IDR usually keeps the clearer total — compare the on-screen figures before you confirm. Neither option is always cheaper.",
    },
    {
      question: "How much money do I need for an Indonesia or Bali trip?",
      answer:
        "There is no single right amount. Start from daily spend × days, then decide a cash share for warungs, markets and drivers. Use the travel budget sketch on this page, then the travel money planner for a fuller cash-versus-card plan.",
    },
  ],
  relatedCurrencyCodes: ["THB", "AUD", "USD", "EUR", "JPY", "TRY", "AED"],
  conversionPairBases: [],
};

const mexicanPeso: CurrencyContent = {
  slug: "mexican-peso",
  h1: "Mexican peso exchange rate",
  metaTitle: "Mexican Peso (MXN) Exchange Rate and How to Buy Pesos",
  summary:
    "The Mexican Peso (MXN) is the currency used in Mexico. Convert pounds to pesos with an indicative GBP/MXN rate, then see how to buy or exchange pesos before you travel. Wayfare does not sell pesos.",
  metaDescription:
    "Convert pounds to Mexican pesos with an indicative MXN rate, plus notes on buying, exchanging and using pesos in Mexico. Not a dealing quote.",
  about: {
    heading: "What is the Mexican Peso?",
    paragraphs: [
      "The Mexican Peso is Mexico’s official currency. Its ISO code is MXN; prices are often written with $ or MX$. One peso is 100 centavos. Mexican pesos are not the same as other currencies that use the word peso — Colombian or Chilean pesos, for example, are different money.",
      "Mexico uses the peso nationwide. Hotels or tour desks may also show a US dollar figure as a convenience quote; that is not a second official currency.",
    ],
  },
  howRatesWork: {
    heading: "How to get pesos in Mexico",
    paragraphs: [
      "You can buy some Mexican pesos in the UK before you fly, or get pesos after you arrive — at a bureau, a bank, or a cash machine. Cards are widely used in Mexican cities and resorts, so many visitors keep a modest cash float rather than converting everything up front.",
      "Wayfare does not sell notes or list shops near you. Compare the pesos you would actually receive for a set pound amount, then use the Travel Money hub for a buying checklist.",
    ],
  },
  whatAffects: {
    heading: "How Mexican Peso exchange rates work",
    paragraphs: [
      "A GBP/MXN exchange rate is how many pesos one pound converts into. A figure of 24.8 means one pound buys about 24.80 pesos on that quote — the same idea behind searches for “exchange rates for Mexican peso”. The number on a board is not automatically what you receive.",
      "The peso floats, so GBP/MXN moves with the market. Banks, UK bureaux, Mexican desks and cards usually add a margin, a fee, or both, which is why the same pound amount pays out different totals. Compare the pesos you would actually get for £100 or £500 — not the advertised rate alone. Wayfare does not rank providers or claim a best rate.",
      "Figures in the converter are indicative so you can see the arithmetic. They are not a dealing quote.",
    ],
  },
  readingRates: {
    heading: "Reading GBP/MXN, EUR/MXN and USD/MXN",
    paragraphs: [
      "Pairs are written base-first. In GBP/MXN the pound is the base, so the number is how many pesos one pound buys: a sample rate of 24.8 means £1 ≈ 24.80 pesos. EUR/MXN and USD/MXN work the same way from euro and US dollar.",
      "To convert pounds, multiply by the GBP/MXN rate (£100 × 24.8 = 2,480 pesos on this demo figure). To go back, divide pesos by the same rate. Use the converter on this page — or the dedicated currency converter — to try other amounts. The result is indicative only.",
    ],
  },
  rateSummaryDescription:
    "Indicative rates for travel planning — not dealing quotes.",
  rateBaseCodes: ["GBP", "EUR", "USD"],
  travel: [
    {
      topic: "cash",
      heading: "Cash",
      paragraphs: [
        "Carry some pesos for markets, tips, taxis and smaller shops. Keep an emergency amount separate from daily spending rather than converting a large float all at once.",
      ],
    },
    {
      topic: "cards",
      heading: "Cards",
      paragraphs: [
        "Hotels, restaurants and larger shops in Mexican cities and resorts commonly take cards. Check foreign-transaction fees, and keep pesos ready where terminals are less reliable. Sketch a cash-versus-card split on the travel money planner if you want a fuller trip budget.",
      ],
    },
    {
      topic: "atms",
      heading: "ATMs",
      paragraphs: [
        "Cash machines are a common way to get pesos in Mexico. Withdraw MXN when you need it and read any fee on screen — this page does not assume a standard Mexican ATM charge. Use the ATM withdrawal calculator for a rough cost before you travel.",
      ],
    },
    {
      topic: "exchange",
      heading: "Buying and exchanging pesos",
      paragraphs: [
        "You can buy Mexican pesos at a UK bank or bureau, order them for collection, or exchange once you arrive in Mexico. Providers set their own rates, fees, stock and delivery times — Wayfare does not sell pesos or list locations near you. Compare how many pesos you would receive for a set pound amount after any commission, then use the Travel Money hub for a fuller buying checklist.",
      ],
    },
    {
      topic: "dcc",
      heading: "Dynamic currency conversion",
      paragraphs: [
        "If a Mexican ATM or card terminal offers to charge you in pounds rather than pesos, the operator is applying its own conversion (DCC). Choosing MXN usually keeps the clearer total. Compare the on-screen figures before you confirm — neither path is always cheaper.",
      ],
    },
    {
      topic: "fees",
      heading: "Fees and denominations",
      paragraphs: [
        "Notes commonly seen are 20, 50, 100, 200, 500 and 1,000 pesos; coins include 1, 2, 5 and 10 pesos plus centavos. Providers earn through a rate margin, a fee, or both. This page does not list bank-specific charges. Browse other published currencies in the currency explorer if your trip uses more than pesos.",
      ],
    },
  ],
  travelPlace: "Mexico",
  faqs: [
    {
      question: "What currency does Mexico use?",
      answer:
        "Mexico uses the Mexican Peso (MXN). It is the only official currency nationwide. A US dollar figure on a tourist menu is a convenience quote, not legal tender.",
    },
    {
      question: "What is the Mexican Peso, and what is MXN?",
      answer:
        "The Mexican Peso is Mexico’s official currency. MXN is its ISO 4217 code. Prices are often written with $ or MX$. Mexican pesos are not the same as other peso currencies.",
    },
    {
      question: "Why can Mexican Peso exchange rates differ between providers?",
      answer:
        "Each bank, bureau, card or ATM sets its own dealing rate and may add a margin or fee, so the same pound-to-peso request pays out different amounts. Wayfare does not claim a best rate — compare the pesos you would actually receive for a set pound sum.",
    },
    {
      question: "Where can I buy or exchange Mexican Pesos?",
      answer:
        "Common options are a UK bank or bureau before you travel, ordering notes for collection, or exchanging after you arrive in Mexico. Stock, hours and fees vary by provider. Wayfare does not sell pesos or list shops near you — compare the amount received after charges, and use the Travel Money hub for a buying checklist.",
    },
    {
      question: "Can I buy Mexican Pesos online?",
      answer:
        "Many UK providers let you order Mexican pesos online for home delivery or collection. Availability, cut-off times and fees are set by each provider. Wayfare does not sell or dispatch notes — compare the pesos you would actually receive, then use the Travel Money hub.",
    },
    {
      question: "How do I get pesos in Mexico?",
      answer:
        "You can take pesos with you, exchange on arrival, use a card, or withdraw MXN from an ATM. Read any on-screen fee and compare a pounds conversion offer before you accept it. Estimate withdrawal cost first with the ATM withdrawal tool.",
    },
  ],
  relatedCurrencyCodes: ["USD", "EUR", "AUD", "THB", "JPY", "TRY", "AED"],
  conversionPairBases: [],
};

/** Published currency page content, keyed by slug. */
export const currencyContent: Record<string, CurrencyContent> = {
  "turkish-lira": turkishLira,
  euro,
  "uae-dirham": uaeDirham,
  "thai-baht": thaiBaht,
  "us-dollar": usDollar,
  "czech-koruna": czechKoruna,
  "polish-zloty": polishZloty,
  "japanese-yen": japaneseYen,
  "australian-dollar": australianDollar,
  "icelandic-krona": icelandicKrona,
  "danish-krone": danishKrone,
  "hungarian-forint": hungarianForint,
  "indonesian-rupiah": indonesianRupiah,
  "mexican-peso": mexicanPeso,
};

/**
 * Written and ready, but not published yet. Do not add to `currencyContent`
 * until that currency page is intentionally launched.
 */
export const unpublishedCurrencyContent: CurrencyContent[] = [];

export function getCurrencyContent(slug: string): CurrencyContent | undefined {
  return currencyContent[slug];
}

/** Slugs that have a real, published page (drives static generation). */
export const publishedCurrencySlugs: string[] = Object.keys(currencyContent);

/** Currency records that currently have a published page. */
export function getPublishedCurrencies(): Currency[] {
  return currencies.filter((currency) => publishedCurrencySlugs.includes(currency.slug));
}

/**
 * Currencies selectable in the dedicated converter: GBP plus every published
 * destination. New published slugs appear here automatically.
 */
export function getConverterCurrencies(): Currency[] {
  return [baseCurrency, ...getPublishedCurrencies()];
}
