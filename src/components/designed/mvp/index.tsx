/**
 * `/mvp`: the investor walkthrough of the whole Pulse journey on one sample store (dev, 2026-11-06).
 * The text comes from here, the steps from the client component; noindex, out of the sitemap.
 */
import en from "../../../../messages/designed.en.json";
import { designedHref, designedText } from "../t";
import { HeroAurora } from "../hero-aurora";
import { Mvp } from "./mvp";

export function MvpPage() {
  const t = designedText("mvp");
  const l = Object.fromEntries(Object.keys(en.mvp).map((k) => [k, t(k)]));
  return (
    <section className="relative isolate border-b border-line hero-bg">
      <HeroAurora />
      <div className="frame">
        <div className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow eyebrow-primary">{l.eyebrow}</p>
            <h1 className="mt-3 text-hero text-balance">{l.title}</h1>
            <p className="mt-4 text-body text-pretty text-muted">{l.lede}</p>
          </div>
          <div className="mt-10">
            <Mvp l={l} testHref={designedHref("/en")} />
          </div>
        </div>
      </div>
    </section>
  );
}
