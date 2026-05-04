import type { I18nConfig } from "next-i18next";

const i18nConfig: I18nConfig = {
  supportedLngs: ["en", "es"],
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common"],
  resourceLoader: (language, namespace) =>
    import(`./i18n/locales/${language}/${namespace}.json`),
};

export default i18nConfig;
