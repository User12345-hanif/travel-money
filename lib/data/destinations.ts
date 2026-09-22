export interface Destination {
  name: string;
  /** Currency code used in this destination. */
  currencyCode: string;
  currencyName: string;
  /** Route slug of the associated currency page. */
  currencySlug: string;
  blurb: string;
  /** Card image in /public. Below the fold; served as WebP. */
  image: string;
  imageAlt: string;
  /** Keeps the subject inside the short card crop. */
  imagePosition: string;
}

export const destinations: Destination[] = [
  {
    name: "Turkey",
    currencyCode: "TRY",
    currencyName: "Turkish Lira",
    currencySlug: "turkish-lira",
    blurb: "Bazaars, coastlines and lira — know the rate before you go.",
    image: "/images/home/dest-turkey.webp",
    imageAlt: "Istanbul skyline and the Bosphorus in soft morning light",
    imagePosition: "center 34%",
  },
  {
    name: "Thailand",
    currencyCode: "THB",
    currencyName: "Thai Baht",
    currencySlug: "thai-baht",
    blurb: "Street food to islands — budget your baht with confidence.",
    image: "/images/home/dest-thailand.webp",
    imageAlt: "Limestone islands and a longtail boat on calm water in Thailand",
    imagePosition: "center 46%",
  },
  {
    name: "Dubai",
    currencyCode: "AED",
    currencyName: "UAE Dirham",
    currencySlug: "uae-dirham",
    blurb: "A pegged dirham makes planning simple — here's what to expect.",
    image: "/images/home/dest-dubai.webp",
    imageAlt: "Dubai skyline and the Burj Khalifa across still water",
    imagePosition: "center 38%",
  },
  {
    name: "Poland",
    currencyCode: "PLN",
    currencyName: "Polish Zloty",
    currencySlug: "polish-zloty",
    blurb: "Great value across Europe — get more from every zloty.",
    image: "/images/home/dest-poland.webp",
    imageAlt: "Kraków’s old-town square and church towers under a soft sky",
    imagePosition: "center 42%",
  },
];
