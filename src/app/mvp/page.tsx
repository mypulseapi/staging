import { DEFAULT_LOCALE } from "@/i18n/locales";
import { RedirectDocument } from "@/components/RedirectDocument";

/** `staging.thepulseapi.com/mvp`, the link sent to investors, resolves to the default locale's page. */
export default function MvpRedirect() {
  return <RedirectDocument target={`/${DEFAULT_LOCALE}/mvp`} />;
}
