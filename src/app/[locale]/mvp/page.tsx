import { prepareLocale } from "@/i18n/render-locale";
import { MvpPage } from "@/components/designed/mvp";
import { designedText } from "@/components/designed/t";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const t = designedText("mvp");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    // A walkthrough for investors, sent by link: not a page for search.
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/mvp` },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  return <MvpPage />;
}
