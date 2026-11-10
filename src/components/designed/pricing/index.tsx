/**
 * The pricing page, top to bottom (owner, 2026-11-10, option A of the redesign mockup): the plans
 * first, then what a lift is worth, the three ways in, the catalogue lane, the full comparison, the
 * path as a scroll story, what counts, what moves the price, questions, and the ask.
 *
 * Neighbouring sections never share a background: hero aurora, blue wash, plain, deeper blue field,
 * plain, brand field, plain, grey, plain, the CTA boxes.
 */
import { PricingHero } from "./hero";
import { CalculatorSection, Section1Section } from "./section1";
import { Lanes } from "./lanes";
import { PlansSection } from "./plans";
import { Section2Section } from "./section2";
import { CountedSection } from "./counted";
import { Section3Section } from "./section3";
import { PricingFaq } from "./faq";
import { Section4Section } from "./section4";

export function DesignedPricing() {
  return (
    <>
      <PricingHero />
      <CalculatorSection />
      <Lanes />
      <Section1Section />
      <PlansSection />
      <Section2Section />
      <CountedSection />
      <Section3Section />
      <PricingFaq />
      <Section4Section />
    </>
  );
}
