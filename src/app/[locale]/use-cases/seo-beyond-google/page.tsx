import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { PageSchema } from "@/components/PageSchema";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { seoCluster } from "@/content/seo-cluster";
import SeoClusterContent from "./SeoClusterContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoClusterPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/use-cases/seo-beyond-google"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);

  // One question per system, answered in plain words, so an answer engine can lift a whole answer.
  const faq = {
    "@type": "FAQPage",
    mainEntity: seoCluster(locale).systems.map((s) => ({
      "@type": "Question",
      name: `${s.name}: ${s.goal}`,
      acceptedAnswer: { "@type": "Answer", text: s.answer },
    })),
  };

  return (
    <>
      <PageSchema
        locale={locale}
        path="/use-cases/seo-beyond-google"
        nodes={[faq]}
      />
      <SeoClusterContent locale={locale} />
    </>
  );
}
