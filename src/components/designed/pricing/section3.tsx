/**
 * What determines the price, and the closing ask.
 *
 * New in this pass. Repair, Monitor and the API are not flat subscriptions, and the page quoted
 * them without ever saying what moves the number. Four drivers, then the line that matters
 * commercially: nothing here requires a catalogue-wide enrichment contract to begin.
 */
import { designedText } from "../t";

const DRIVERS = [
  { name: "driver1", body: "driver1Body", icon: "#i-file-text" },
  { name: "driver2", body: "driver2Body", icon: "#i-chart-pie" },
  { name: "driver3", body: "driver3Body", icon: "#i-bell-ring" },
  { name: "driver4", body: "driver4Body", icon: "#i-sparkles" },
] as const;

export function Section3Section() {
  const t = designedText("pricing.section1");
  return (
    <section className="border-b border-line bg-surface-1">
      <div className="frame py-16 lg:py-20">
        <h2 className="reveal text-center text-title text-balance">
          {t("driversTitle")}
        </h2>
        <ul className="reveal mt-10 grid grid-cols-1 gap-4 delay-100 sm:grid-cols-2 lg:grid-cols-4">
          {DRIVERS.map((d) => (
            <li
              key={d.name}
              className="min-w-0 rounded-2xl border border-line bg-card p-5"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-primary-tint text-primary">
                <svg className="size-4" aria-hidden="true">
                  <use href={d.icon} />
                </svg>
              </span>
              <p className="mt-4 text-body font-semibold text-ink">
                {t(d.name)}
              </p>
              <p className="mt-1 text-data text-pretty text-muted">
                {t(d.body)}
              </p>
            </li>
          ))}
        </ul>
        <p className="reveal mt-6 text-center text-body text-pretty text-muted delay-200">
          {t("driversNote")}
        </p>
      </div>
    </section>
  );
}
