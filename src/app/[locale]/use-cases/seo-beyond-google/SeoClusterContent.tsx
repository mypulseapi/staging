import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import {
  SEO_CLUSTER_PARTS,
  SEO_CLUSTER_SYSTEMS,
  seoCluster,
} from "@/content/seo-cluster";

/*
 * The locale arrives as a prop: `useLocale()` resolves to English inside a Server Component under
 * `output: "export"` (see WhyContent). The count in the hero is computed from the data, so it
 * cannot disagree with the lists below it.
 */
export default function SeoClusterContent({ locale }: { locale: string }) {
  const c = seoCluster(locale);
  return (
    <>
      <PageHero title={c.title} lede={c.lede}>
        <p className="ed-d5 text-[color:var(--ed-ink)]">
          {c.clusterName}:{" "}
          {c.countLabel(SEO_CLUSTER_SYSTEMS, SEO_CLUSTER_PARTS)}
        </p>
        <nav aria-label={c.navLabel} className="mt-6 flex flex-wrap gap-2">
          {c.systems.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-[color:var(--ed-line)] bg-[color:var(--ed-raise)] px-4 py-2 text-[0.875rem] font-medium text-[color:var(--ed-ink-2)] transition hover:border-[color:var(--brand-indigo)] hover:text-[color:var(--ed-ink)]"
            >
              {s.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {c.systems.map((s, i) => (
        <Section
          key={s.id}
          id={s.id}
          tone={i % 2 === 1 ? "raise" : "canvas"}
          className="border-b border-[color:var(--ed-line)]"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <header>
              <h2 className="ed-d2 text-[color:var(--ed-ink)]">{s.name}</h2>
              <p className="ed-lede mt-4">{s.goal}</p>
              <p className="ed-body mt-6">
                <span className="font-semibold text-[color:var(--ed-ink)]">
                  {c.trackLabel}:
                </span>{" "}
                {s.track}
              </p>
            </header>
            <div className="min-w-0">
              <h3 className="ed-d5 text-[color:var(--ed-ink)]">
                {c.partsLabel}
              </h3>
              <ul className="mt-4 divide-y divide-[color:var(--ed-line)] rounded-2xl border border-[color:var(--ed-line)] bg-[color:var(--ed-raise)]">
                {s.parts.map((p) => (
                  <li
                    key={p}
                    className="ed-body px-5 py-3 text-[color:var(--ed-ink)]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="tint">
        <div className="max-w-[64ch]">
          <h2 className="ed-d2 text-[color:var(--ed-ink)]">
            {c.closing.title}
          </h2>
          <p className="ed-lede mt-6">{c.closing.body}</p>
        </div>
      </Section>
    </>
  );
}
