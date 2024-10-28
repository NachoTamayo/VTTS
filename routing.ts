import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/testRelease": {
      en: "/testRelease",
      es: "/testRelease",
    },
    "/version": {
      en: "/version",
      es: "/version",
    },
    "/serviceRequest": {
      en: "/serviceRequest",
      es: "/serviceRequest",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation(routing);
