"use client";

import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition, useState } from "react";
import { Locale, usePathname, useRouter } from "@/routing";

type Props = {
  defaultValue: string;
};

export default function LocaleSwitcherSelect({ defaultValue }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [lang, setLang] = useState(defaultValue);

  function handleChangeLanguage(lang: string) {
    const nextLocale = lang as Locale;
    setLang(lang);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return lang === "en" ? (
    <img src="/uk.png" alt="UK Flag" onClick={() => handleChangeLanguage("es")} className="cursor-pointer" />
  ) : (
    <img src="/spain.png" alt="ES Flag" onClick={() => handleChangeLanguage("en")} className="cursor-pointer" />
  );
}
