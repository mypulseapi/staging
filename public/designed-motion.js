// Page motion for Pulse. Plain JS, no dependencies.
// Every effect is driven by data attributes in the HTML so pages stay declarative:
//   .reveal / .reveal-bar  → fade/slide or grow when scrolled into view (sets [data-shown])
//   [data-count="94"]      → counts up from 0 when shown (optional data-suffix="%")
//   [data-type="text"]     → types the text, then sets [data-typed] on the closest [data-type-root]
//   [data-shelf]           → draws a grid of product squares (data-total, data-ready)
//   [data-demo]            → plays the hero workflow demo (tabs, steps, captions — see DESIGN.md §6)
//   [data-spy] links       → highlight the section currently in view (sets [data-active], aria-current)
//   [data-boxes]           → call-to-action grid: each cell the cursor enters gets a random colour (--lit)
//   [data-scroll-story="4"] → pinned scroll story: data-scroll-step (1..n), --story (0..1) from scroll progress
//   [data-why]             → Why PULSE orbit: turning ring; a circle turns to the top and opens its reason
//   [data-pause] buttons   → pause the hero demo (sets [data-held] on [data-pausable])
//   [data-bg-video]        → product hero background video: theme-matched source, plays only while on screen
//   [data-deal]            → About page DEAL acronym: big row → column → words (data-state hold/stack/expand/done)

// First: tell the CSS this script is running, so the reveal failsafe in globals.css stands down
// and below-the-fold content waits to fade up as it scrolls in, rather than appearing at 1.2s.
document.documentElement.setAttribute("data-motion", "");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Counts from data-from (default 0) to the target, after data-delay ms (default 0)
function countUp(el) {
  const target = Number(el.dataset.count ?? el.dataset.demoCount);
  const from = Number(el.dataset.from ?? 0);
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1400;
  const start = performance.now() + Number(el.dataset.delay ?? 0);
  const tick = (now) => {
    const t = Math.min(Math.max((now - start) / duration, 0), 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (target - from) * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function typeText(el) {
  const text = el.dataset.type;
  const root = el.closest("[data-type-root]");
  if (reduceMotion) {
    el.textContent = text;
    root?.setAttribute("data-typed", "");
    return;
  }
  let i = 0;
  el.textContent = "";
  const step = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(step, 70);
    else setTimeout(() => root?.setAttribute("data-typed", ""), 350);
  };
  setTimeout(step, 400);
}

function buildShelf(el) {
  const total = Number(el.dataset.total);
  const ready = Number(el.dataset.ready);
  const cells = [];
  for (let i = 0; i < total; i++) {
    const cell = document.createElement("span");
    cell.className =
      i < ready
        ? "reveal aspect-square rounded-sm bg-ink duration-300"
        : "reveal aspect-square rounded-sm missing-cell duration-300";
    cell.style.transitionDelay = reduceMotion
      ? "0ms"
      : `${Math.round(i * 6)}ms`;
    cells.push(cell);
  }
  el.replaceChildren(...cells);
  return cells;
}

function show(el) {
  el.setAttribute("data-shown", "");
  if (el.dataset.count !== undefined) countUp(el);
  if (el.dataset.type !== undefined) typeText(el);
  if (el.dataset.shelf !== undefined) {
    const cells = buildShelf(el);
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        cells.forEach((c) => c.setAttribute("data-shown", "")),
      ),
    );
  }
}

// A .reveal-bar starts at scale 0, a zero-width box at the edge of its clipped track; when the page is zoomed
// (90%, 80% …) such a box can fall just outside the clip and never count as visible, so the bar would never grow.
// Bars are therefore watched through their track (the parent, which always has a width) and shown with it.
// `.reveal-trigger` is watched like a reveal but does not fade itself: it starts its children's
// entrance (About's team cards, `card-in`, whose own hover transition `reveal` would override).
const REVEALS = ".reveal, .reveal-trigger, [data-count], [data-type], [data-shelf]";
const barsByTrack = new Map();
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      // A held figure needs its brake off: the markup has been in the document since prerender,
      // holding frame one. It is not an early return, because the same wrapper usually also
      // carries .reveal, and skipping the rest would unhold a figure that then never faded in.
      if (entry.target.classList.contains("figure-hold")) {
        entry.target.classList.remove("figure-hold");
      }
      const bars = barsByTrack.get(entry.target);
      if (bars) bars.forEach(show);
      if (!bars || entry.target.matches(REVEALS)) show(entry.target);
      revealObserver.unobserve(entry.target);
    }
  },
  { rootMargin: "0px 0px -10% 0px" },
);
document.querySelectorAll(REVEALS).forEach((el) => revealObserver.observe(el));
// The exported figures ride the same observer rather than a second one with the same config.
document.querySelectorAll(".figure-hold").forEach((el) => revealObserver.observe(el));
document.querySelectorAll(".reveal-bar").forEach((bar) => {
  const track = bar.parentElement;
  if (!barsByTrack.has(track)) {
    barsByTrack.set(track, []);
    revealObserver.observe(track);
  }
  barsByTrack.get(track).push(bar);
});

// Scroll-spy for the sticky step navigation. Sets [data-active] and aria-current="location" on the link for the
// last section whose heading has passed 40% of the viewport (so fast scrolling or a jump never skips one), clears it
// above the first section, and marks the last section once the page is scrolled to the bottom.
const spyLinks = [...document.querySelectorAll("[data-spy]")];
function setSpy(id) {
  spyLinks.forEach((link) => {
    const on = link.dataset.spy === id;
    link.toggleAttribute("data-active", on);
    if (on) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
const spySections = spyLinks
  .map((link) => document.getElementById(link.dataset.spy))
  .filter(Boolean);
if (spySections.length) {
  let queued = false;
  const update = () => {
    queued = false;
    const el = document.documentElement;
    if (scrollY + innerHeight >= el.scrollHeight - 2) {
      setSpy(spySections[spySections.length - 1].id);
      return;
    }
    const line = innerHeight * 0.4;
    let current = null;
    for (const section of spySections)
      if (section.getBoundingClientRect().top <= line) current = section.id;
    setSpy(current);
  };
  addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  addEventListener("resize", update, { passive: true });
  update();
}

// Header dropdowns are native <details> (they work without JS). Enhancements:
// - Mega menus ([data-mega]) share one Attio-style viewport that resizes between menus while the
//   contents slide/blur in the direction of travel.
// - Other dropdowns (language): hover-open, one open at a time, outside click / Escape to close.
// - Page scroll is locked while the mobile menu is open.
const canHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;

/* ====================================================================
 * Per-feature mounting.
 *
 * Every feature below used to bind its element once, at script load. That is
 * right for a set of static pages where each navigation is a full load. Here
 * the pages are a Next app: a client navigation swaps the DOM and nothing
 * re-runs, so the new page's elements were never initialised and the old
 * page's timers kept running. Measured on the Why orbit: it turned on first
 * load and was dead after every round trip.
 *
 * So a feature is now `init(el, signal)`, registered with the selector it
 * answers to. `mountFeatures` inits anything new and aborts anything whose
 * element has left the document. One AbortController per mounted element, so
 * `{ signal }` on a window or document listener removes it, and `onAbort`
 * carries the rest: frames, timers, observers.
 * ==================================================================== */
const mounted = new Map(); // element -> AbortController
const features = []; // { sel, init }

/** Register a feature. `init(el, signal)` runs once per matching element per page. */
function feature(sel, init) {
  features.push({ sel, init });
}

/** Run `fn` when this feature's element goes away. For frames, timers, observers. */
function onAbort(signal, fn) {
  signal.addEventListener("abort", fn, { once: true });
}

function mountFeatures() {
  for (const [el, ctrl] of mounted)
    if (!el.isConnected) {
      ctrl.abort();
      mounted.delete(el);
    }
  for (const { sel, init } of features)
    for (const el of document.querySelectorAll(sel)) {
      if (mounted.has(el)) continue;
      const ctrl = new AbortController();
      mounted.set(el, ctrl);
      // One broken feature must not stop the others from mounting.
      try {
        init(el, ctrl.signal);
      } catch (err) {
        console.error(`motion: ${sel} failed to mount`, err);
      }
    }
}

/* ---------------------------------------------------------------------
 * DIVERGENCE FROM THE DESIGNER'S FILE. Re-apply this after re-copying.
 *
 * The designer's menus open on hover and close on leaving. Reported as the
 * wrong behaviour: a menu that opens because the pointer crossed it opens
 * when nobody asked, and it closed again mid-reach while changing language.
 *
 * Kept as a flag rather than by deleting the three hover blocks, so a
 * re-copy of src/main.js needs this one line put back and nothing else.
 *
 * Hover opens the menus for mouse and pen only, gated on `canHover`. Touch has no hover and
 * keyboard needs Enter, so both keep the click and Enter path unchanged. Leaving the nav closes
 * after 150ms, and re-entering within that window cancels the close, so crossing the gap between
 * the summary and its panel does not shut it.
 * ------------------------------------------------------------------- */
const HOVER_OPENS_MENUS = true;
const mobileMenu = document.querySelector("[data-mobile-menu]");
const megaNav = document.querySelector("[data-mega-nav]");
const mega = megaNav ? createMegaMenu(megaNav) : null;
const dropdowns = [
  ...document.querySelectorAll("[data-dropdown]:not([data-mega])"),
];

function createMegaMenu(nav) {
  const viewport = nav.querySelector("[data-nav-viewport]");
  const stack = nav.querySelector("[data-nav-stack]");
  const items = [...nav.querySelectorAll("details[data-mega]")].map(
    (details, index) => {
      const content = details.querySelector("[data-nav-content]");
      details.querySelector("[data-panel]").hidden = true; // the no-JS panel is replaced by the viewport
      content.dataset.state = "inactive";
      stack.append(content);
      return { details, content, index };
    },
  );
  let active = null;
  let closeTimer;
  /*
   * Which item hover opened, if any.
   *
   * Both halves of this have been wrong. A guard that suppressed the close on every click made an
   * open menu impossible to close by clicking. Removing it made the FIRST click fail to open,
   * because `mouseenter` and `click` arrive together when a pointer first reaches a summary: hover
   * opened the menu and the click immediately toggled it shut.
   *
   * So the click asks which gesture it belongs to. Inside the gesture that hover opened, it commits
   * the open and does nothing visible. Any click after that toggles, which is what a click on an
   * already-open menu should do, and is the only behaviour a touch device ever sees.
   */
  let openedByHover = null;

  function settle(content) {
    if (content !== active?.content) {
      content.dataset.state = "inactive";
      delete content.dataset.dir;
    }
  }

  function open(item) {
    clearTimeout(closeTimer);
    if (active === item) return;
    closeAll(); // close the language dropdown
    const switching = active !== null;
    if (switching) {
      const dir = item.index > active.index ? "right" : "left";
      const previous = active.content;
      previous.dataset.state = "exiting";
      previous.dataset.dir = dir;
      setTimeout(
        () => previous.dataset.state === "exiting" && settle(previous),
        200,
      );
      item.content.dataset.dir = dir;
    } else {
      delete item.content.dataset.dir; // first open: the viewport fades in, no slide
    }
    item.content.dataset.state = "active";
    active = item;

    viewport.toggleAttribute("data-instant", !switching);
    const width = item.content.offsetWidth;
    // Anchored to the menu's left edge (like attio.com), but shifted left if it would overflow the window
    const overflow =
      nav.getBoundingClientRect().left +
      width -
      (document.documentElement.clientWidth - 16);
    viewport.style.setProperty(
      "--nav-viewport-x",
      `${-Math.max(0, Math.ceil(overflow))}px`,
    );
    viewport.style.setProperty("--nav-viewport-width", `${width}px`);
    viewport.style.setProperty(
      "--nav-viewport-height",
      `${item.content.offsetHeight}px`,
    );
    if (!switching) {
      void viewport.offsetWidth; // apply the size before the open transition starts
      viewport.setAttribute("data-open", "");
      requestAnimationFrame(() => viewport.removeAttribute("data-instant"));
    }
    items.forEach((other) => (other.details.open = other === item));
  }

  function close() {
    clearTimeout(closeTimer);
    openedByHover = null;
    if (!active) return;
    const content = active.content;
    active = null;
    viewport.removeAttribute("data-open");
    items.forEach((other) => (other.details.open = false));
    setTimeout(() => settle(content), 150);
  }

  items.forEach((item) => {
    item.details.querySelector("summary").addEventListener("click", (e) => {
      e.preventDefault(); // keep <details> in sync with the viewport ourselves
      if (openedByHover === item) {
        openedByHover = null; // the pointer's own gesture: it stays open, deliberately now
        return;
      }
      if (active === item) close();
      else open(item);
    });
    if (canHover && HOVER_OPENS_MENUS)
      item.details.parentElement.addEventListener("mouseenter", () => {
        openedByHover = item;
        open(item);
      });
  });
  if (canHover && HOVER_OPENS_MENUS) {
    // Hovering a plain link (About us, Pricing) closes the menu; leaving the nav closes it after a beat
    nav
      .querySelectorAll(":scope > ul > li:not(:has([data-mega]))")
      .forEach((li) => li.addEventListener("mouseenter", close));
    nav.addEventListener(
      "mouseleave",
      () => (closeTimer = setTimeout(close, 150)),
    );
    nav.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  }
  viewport.addEventListener("click", (e) => e.target.closest("a") && close());

  // Keyboard order (WCAG 2.4.3): the contents live in the shared viewport after the nav list, so Tab is routed by
  // hand — from an open menu's trigger into its links, from its last link on to the next top-level item, and
  // Shift+Tab from its first link back to the trigger. Focus leaving the nav closes the menu.
  const focusables = (root) =>
    [...root.querySelectorAll("a[href], button:not([disabled])")].filter(
      (el) => el.offsetParent !== null,
    );
  const topLevel = () =>
    [...nav.querySelectorAll(":scope > ul > li")]
      .map((li) => li.querySelector("summary, a[href]"))
      .filter(Boolean);
  items.forEach((item) => {
    const summary = item.details.querySelector("summary");
    summary.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || e.shiftKey || active !== item) return;
      const first = focusables(item.content)[0];
      if (!first) return;
      e.preventDefault();
      first.focus();
    });
    item.content.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const links = focusables(item.content);
      if (e.shiftKey && document.activeElement === links[0]) {
        e.preventDefault();
        summary.focus();
      } else if (!e.shiftKey && document.activeElement === links.at(-1)) {
        const order = topLevel();
        const next = order[order.indexOf(summary) + 1];
        if (!next) return;
        e.preventDefault();
        close();
        next.focus();
      }
    });
  });
  nav.addEventListener("focusout", (e) => {
    if (active && !nav.contains(e.relatedTarget)) close();
  });

  return {
    close,
    isOpen: () => active !== null,
    focusTrigger: () => active?.details.querySelector("summary").focus(),
    contains: (el) => nav.contains(el),
  };
}

function closeAll(except) {
  dropdowns.forEach((d) => d !== except && d.removeAttribute("open"));
}

// Keep an open panel inside the viewport (shift it left when it would overflow the right edge)
function keepInView(d) {
  const panel = d.querySelector("[data-panel]");
  if (!panel) return;
  panel.style.marginLeft = "";
  const overflow =
    panel.getBoundingClientRect().right -
    (document.documentElement.clientWidth - 16);
  if (overflow > 0) panel.style.marginLeft = `-${Math.ceil(overflow)}px`;
}

dropdowns.forEach((d) => {
  d.addEventListener("toggle", () => {
    if (!d.open) return;
    closeAll(d);
    mega?.close();
    keepInView(d);
  });
  if (!canHover || !HOVER_OPENS_MENUS) return;
  let timer;
  const host = d.parentElement;
  host.addEventListener("mouseenter", () => {
    clearTimeout(timer);
    d.open = true;
  });
  host.addEventListener("mouseleave", () => {
    timer = setTimeout(() => (d.open = false), 150);
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-dropdown]")) closeAll();
  if (mega && !mega.contains(e.target)) mega.close();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (mega?.isOpen()) {
    mega.focusTrigger();
    mega.close();
    return;
  }
  const open =
    dropdowns.find((d) => d.open) || (mobileMenu?.open && mobileMenu);
  if (!open) return;
  open.open = false;
  open.querySelector("summary")?.focus();
});

mobileMenu?.addEventListener("toggle", () => {
  document.documentElement.classList.toggle("overflow-hidden", mobileMenu.open);
  mobileMenu
    .querySelector("summary")
    .setAttribute("aria-label", mobileMenu.open ? "Close menu" : "Open menu");
});
// A link that opens a new tab keeps focus in this one. After a mouse or touch click, let it go: otherwise
// the first key pressed on return (an arrow to scroll, Cmd+W on the other tab) makes it keyboard focus,
// and an About team card lights up again. Enter on the keyboard (detail 0) keeps focus where it was put.
document.addEventListener("click", (event) => {
  const link =
    event.target instanceof Element && event.target.closest('a[target="_blank"]');
  if (link && event.detail > 0) link.blur();
});

// Close the mobile menu when one of its links is followed (e.g. #request)
mobileMenu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => (mobileMenu.open = false)));

// Hero workflow demo: steps play in order. The pace comes from CSS — when the active tab's timer bar
// (animate-demo-timer) finishes, the next step starts. Hovering the app window (not the timeline) or scrolling it out of view
// pauses the timer; clicking a tab jumps to that step. With reduced motion the timer is hidden, so
// nothing advances by itself.
feature("[data-demo]", function initDemo(demo, signal) {
  const tabs = [...demo.querySelectorAll("[data-demo-tab]")];
  const groups = [
    tabs,
    [...demo.querySelectorAll("[data-demo-step]")],
    [...demo.querySelectorAll("[data-demo-caption]")],
  ];

  const grid = demo.querySelector("[data-demo-grid]");
  if (grid) {
    // Payoff grid: products a shopper could already tell apart, ones the repair separates, the rest
    const total = Number(grid.dataset.total);
    const before = Number(grid.dataset.before);
    const after = Number(grid.dataset.after);
    const cells = [];
    for (let i = 0; i < total; i++) {
      const cell = document.createElement("span");
      if (i < before)
        cell.className = "aspect-square rounded-xs bg-chart-main sm:rounded-sm";
      else if (i < after) {
        cell.className = "demo-fill aspect-square rounded-xs sm:rounded-sm";
        cell.style.transitionDelay = `${1000 + (i - before) * 13}ms`; // one after another, as on thepulseapi.com
      } else cell.className = "aspect-square rounded-xs bg-line sm:rounded-sm";
      cells.push(cell);
    }
    grid.replaceChildren(...cells);
  }

  const go = (index) => {
    groups.forEach((list) =>
      list.forEach((el) => el.removeAttribute("data-active")),
    );
    void demo.offsetWidth; // restart the timer and the step's entrance even when the same step is picked again
    groups.forEach((list) => list[index]?.setAttribute("data-active", ""));
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1; // one Tab stop for the tab list (roving tabindex)
      tab.toggleAttribute("data-done", i < index); // earlier steps stay full on the timeline
    });
    groups[1][index].querySelectorAll("[data-demo-count]").forEach(countUp);
  };
  // ARIA tab pattern: Left / Right move between the steps (wrapping), Home / End jump to the first / last
  tabs.forEach((tab, i) => {
    tab.tabIndex = tab.hasAttribute("data-active") ? 0 : -1;
    tab.addEventListener("keydown", (e) => {
      const to = {
        ArrowRight: (i + 1) % tabs.length,
        ArrowLeft: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      go(to);
      tabs[to].focus();
    });
  });
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => go(i));
    tab
      .querySelector(".demo-timer")
      ?.addEventListener("animationend", () => go((i + 1) % tabs.length));
  });
  const io = new IntersectionObserver(([entry]) =>
    demo.toggleAttribute("data-paused", !entry.isIntersecting),
  );
  io.observe(demo);
  onAbort(signal, () => io.disconnect());
  go(0);
});

// Story board (Decision Audit page): one [data-story] figure plays its [data-scene] beat timeline, the same model
// as How it works (data-play, then data-b2 … at the ms in data-beats; pre-N / at-N variants in CSS). It loops
// while on screen; its pause button (data-held) holds it on the current beat, and it carries on from there
// (hovering does not pause it, owner's choice 20 Oct 2026). With data-once it plays one time and rests on its last beat (the Verification before/after
// meter). Without JS or with reduced motion it never starts, so the board shows its final frame.
// Step buttons ([data-story-step="N"], disabled in the HTML so they do nothing without JS) jump to beat N: the
// earlier beats are set at once, beat N's own transition plays, and the story carries on from there (or stays put
// while paused). With reduced motion they still switch steps, instantly and without autoplay.
feature("[data-story]", function initStory(story, signal) {
  const scene = story.querySelector("[data-scene]");
  if (!scene) return;
  const steps = story.querySelectorAll("[data-story-step]");
  const mark = (n) =>
    steps.forEach((step) =>
      step.toggleAttribute(
        "aria-current",
        Number(step.dataset.storyStep) === n,
      ),
    );
  if (reduceMotion) {
    steps.forEach((step) => {
      step.disabled = false;
      step.addEventListener("click", () => {
        const n = Number(step.dataset.storyStep);
        scene.setAttribute("data-instant", "");
        scene.setAttribute("data-play", "");
        for (let b = 2; b <= 9; b++)
          scene.toggleAttribute(`data-b${b}`, b <= n);
        mark(n);
      });
    });
    return;
  }
  const HOLD = 2600; // ms the final frame stays before the loop restarts
  const FADE = 400; // ms, matches how-scene's opacity transition
  const beats = scene.dataset.beats.split(" ").map(Number);
  const end = beats[beats.length - 1] + HOLD;
  const once = story.hasAttribute("data-once"); // plays one time and rests on its last beat (no fade, no loop)
  let done = false;
  let timers = [];
  let at = 0; // ms into the loop where it was paused
  let startedAt = 0;
  let running = false;
  let onScreen = false;

  const clear = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const run = () => {
    clear();
    if (at === 0) {
      // jump back to the first beat without transitions
      scene.setAttribute("data-instant", "");
      for (let b = 2; b <= 9; b++) scene.removeAttribute(`data-b${b}`);
      scene.removeAttribute("data-fade");
      scene.setAttribute("data-play", "");
      void scene.offsetWidth;
      scene.removeAttribute("data-instant");
      mark(1);
    }
    startedAt = performance.now() - at;
    beats.forEach((t, i) => {
      if (i > 0 && t > at)
        timers.push(
          setTimeout(() => {
            scene.setAttribute(`data-b${i + 1}`, "");
            mark(i + 1);
            if (once && i === beats.length - 1) done = true;
          }, t - at),
        );
    });
    if (once) return;
    timers.push(
      setTimeout(
        () => {
          scene.setAttribute("data-fade", "");
          timers.push(
            setTimeout(() => {
              at = 0;
              run();
            }, FADE),
          );
        },
        Math.max(0, end - at),
      ),
    );
  };
  const sync = () => {
    if (done) return;
    const want = onScreen && !story.hasAttribute("data-held");
    if (want === running) return;
    running = want;
    if (want) return run();
    clear();
    at = performance.now() - startedAt;
    if (at >= end) {
      // paused while fading out: the next play starts at the first beat
      scene.removeAttribute("data-fade");
      at = 0;
    }
  };

  const goTo = (n) => {
    clear();
    scene.setAttribute("data-instant", "");
    scene.removeAttribute("data-fade");
    scene.setAttribute("data-play", "");
    for (let b = 2; b <= 9; b++) scene.toggleAttribute(`data-b${b}`, b < n);
    void scene.offsetWidth;
    scene.removeAttribute("data-instant");
    if (n > 1) scene.setAttribute(`data-b${n}`, "");
    mark(n);
    at = beats[n - 1];
    done = once && n === beats.length;
    startedAt = performance.now() - at;
    if (running && !done) run();
  };
  steps.forEach((step) => {
    step.disabled = false;
    step.addEventListener("click", () => goTo(Number(step.dataset.storyStep)));
  });

  new MutationObserver(sync).observe(story, {
    attributes: true,
    attributeFilter: ["data-held"],
  });
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    },
    { threshold: 0.4 },
  );
  io.observe(story);
  onAbort(signal, () => io.disconnect());
});

// Revenue calculator (home, [data-calc]), as the owner specified:
//   maxIncrease   = 100 − currentCR
//   validIncrease = max(0, min(expectedIncrease, maxIncrease))
//   projectedCR   = currentCR + validIncrease
// Current revenue = visits × currentCR × order value; the potential addition is the projected revenue minus the
// current one (visits × validIncrease × order value). Both sliders keep a fixed 0–100 scale and share 100%: the one
// being dragged stops at the room the other leaves (it never pushes the other thumb), the used-up part of its track
// is pale, and a slider with no room left is disabled; so validIncrease always equals the chosen increase. Number fields are clamped to their min/max (shown back when the field is left). Results of a million or
// more use the short form ($55M). The HTML holds the result for the default inputs, so it reads without JavaScript.
feature("[data-calc]", function initCalc(calc) {
  const field = (name) => calc.querySelector(`[name="${name}"]`);
  const out = (name) => calc.querySelector(`[data-out="${name}"]`);
  /*
   * Copy and number formatting both follow the page, not this file.
   *
   * Every string below was a literal here, so the calculator printed English over the translated
   * markup the moment a slider moved: /vi loaded in Vietnamese and reverted as it was used. The
   * templates come from data- attributes the component renders from the message catalogue, and
   * fall back to the English wording if an attribute is missing.
   *
   * The locale drives the separators too (Vietnamese writes 12,2 where English writes 12.2). The
   * CURRENCY stays USD because the field beside it is labelled "Average order value (USD)";
   * converting the number without converting the amount would be a lie in either language.
   */
  const loc = document.documentElement.lang || "en";
  const copy = (name, fallback) => calc.dataset[name] || fallback;
  const fill = (template, values) =>
    template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  const full = new Intl.NumberFormat(loc, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const short = new Intl.NumberFormat(loc, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const decimal = new Intl.NumberFormat(loc, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const money = (v) => (v >= 1e6 ? short : full).format(v);
  const round = (v) => Math.round(v * 10) / 10;
  const pct = (v) => `${new Intl.NumberFormat(loc).format(round(v))}%`;
  const clamp = (input) => {
    const v = Number(input.value);
    const lo = Number(input.min),
      hi = Number(input.max);
    return Math.min(Math.max(Number.isFinite(v) ? v : 0, lo), hi);
  };
  const conv = field("conv"),
    uplift = field("uplift");
  const update = () => {
    const visits = clamp(field("visits"));
    const aov = clamp(field("aov"));
    const currentCR = Number(conv.value);
    const expectedIncrease = Number(uplift.value);
    const maxIncrease = round(100 - currentCR);
    const validIncrease = Math.max(0, Math.min(expectedIncrease, maxIncrease));
    const projectedCR = round(currentCR + validIncrease);
    // sliders: fill to the thumb; the uplift track turns pale past maxIncrease
    // each track is pale past the room the other slider leaves; a slider with no room left is disabled
    const convRoom = round(100 - expectedIncrease);
    conv.style.setProperty("--range-fill", `${currentCR}%`);
    conv.style.setProperty("--range-room", `${convRoom}%`);
    conv.disabled = convRoom <= 0 && currentCR <= 0;
    uplift.style.setProperty("--range-fill", `${validIncrease}%`);
    uplift.style.setProperty("--range-room", `${maxIncrease}%`);
    uplift.disabled = maxIncrease <= 0 && expectedIncrease <= 0;
    out("conv").textContent = pct(currentCR);
    const increaseText = decimal.format(validIncrease);
    out("uplift").textContent = fill(copy("copyPoints", "+{n} points"), {
      n: increaseText,
    });
    conv.setAttribute("aria-valuetext", pct(currentCR));
    uplift.setAttribute(
      "aria-valuetext",
      fill(copy("copyValuetext", "plus {n} percentage points"), { n: increaseText }),
    );
    out("relative").textContent =
      expectedIncrease > maxIncrease
        ? fill(
            copy(
              "copyCapped",
              "Projected conversion rate {p}. The increase is capped at {n} points, because a conversion rate cannot pass 100%.",
            ),
            { p: pct(projectedCR), n: decimal.format(maxIncrease) },
          )
        : fill(
            copy("copyRelative", "Projected conversion rate {p} ({c} now + {n} points)."),
            { p: pct(projectedCR), c: pct(currentCR), n: increaseText },
          );
    const currentRevenue = (visits * currentCR * aov) / 100;
    const projectedRevenue = (visits * projectedCR * aov) / 100;
    out("current").textContent = money(currentRevenue);
    out("extra").textContent = `+${money(projectedRevenue - currentRevenue)}`;
  };
  calc.addEventListener("input", (e) => {
    // the slider being dragged stops at the room the other one leaves (never pushes the other thumb)
    const stop = (moved, other) => {
      const room = round(100 - Number(other.value));
      if (Number(moved.value) > room) moved.value = String(room);
    };
    if (e.target === conv) stop(conv, uplift);
    if (e.target === uplift) stop(uplift, conv);
    update();
  });
  // when a number field is left, show the value the calculation used (clamped, never empty)
  calc.addEventListener("change", (e) => {
    if (!e.target.matches?.('input[type="number"]')) return;
    e.target.value = String(clamp(e.target));
    update();
  });
  calc
    .querySelector("form")
    ?.addEventListener("submit", (e) => e.preventDefault());
  update();
});

// Pause buttons for content that moves by itself (WCAG 2.2.2): [data-pause] toggles data-held on its
// [data-pausable] wrapper (CSS stops the hero demo timer); aria-pressed and the icon follow.
feature("[data-pause]", function initPause(button) {
  const target = button.closest("[data-pausable]");
  button.addEventListener("click", () => {
    const held = target.toggleAttribute("data-held");
    button.setAttribute("aria-pressed", String(held));
    button
      .querySelector("use")
      .setAttribute("href", held ? "#i-play" : "#i-pause");
  });
});

// Why PULSE orbit: the ring of five circles turns slowly (--why-angle, one turn every 2 minutes; not with
// reduced motion, and only while on screen). Clicking a circle turns it to 3 o'clock and opens the card beside it
// with its reason; clicking it again, the card's × or Esc closes the card and the ring turns on. "Next" moves on.
// The ring also holds still while the pointer or keyboard focus is on the orbit.
// Call-to-action background boxes (CSS boxes-grid): each cell the cursor enters gets one of the six box
// colours at random, as 21st.dev's original does; CSS lights it and fades it out.
feature("[data-boxes]", function initBoxes(grid, signal) {
  grid.addEventListener(
    "pointerover",
    (event) => {
      const cell = event.target;
      if (cell.parentElement?.parentElement !== grid) return;
      cell.style.setProperty("--lit", `var(--box-${1 + Math.floor(Math.random() * 6)})`);
    },
    { signal },
  );
});

// Pinned scroll story (pricing). Progress is how far the element's top has scrolled past the viewport, over the
// height it has beyond one screen; the step is that progress in n equal parts. CSS does the rest (globals.css).
feature("[data-scroll-story]", function initScrollStory(story, signal) {
  const n = Number(story.dataset.scrollStory) || 4;
  let frame = 0;
  const update = () => {
    frame = 0;
    const box = story.getBoundingClientRect();
    const span = box.height - window.innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) : 0;
    story.dataset.scrollStep = String(Math.min(n, Math.floor(p * n) + 1));
    story.style.setProperty("--story", p.toFixed(3));
  };
  const queue = () => {
    frame ||= requestAnimationFrame(update);
  };
  window.addEventListener("scroll", queue, { passive: true, signal });
  window.addEventListener("resize", queue, { signal });
  onAbort(signal, () => cancelAnimationFrame(frame));
  update();
});

feature("[data-why]", function initWhy(why, signal) {
  const spin = why.querySelector("[data-why-spin]");
  const tabs = [...why.querySelectorAll("[data-why-tab]")];
  const panels = [...why.querySelectorAll("[data-why-panel]")];
  const step = 360 / tabs.length;
  const speed = 360 / 120000; // degrees per millisecond
  let angle = 0;
  let open = -1;
  let onScreen = false;
  let last = performance.now();
  const setAngle = () => spin.style.setProperty("--why-angle", `${angle}deg`);

  // the ring stops while the pointer or keyboard focus is on the orbit (so the circles hold still to be picked),
  // while a card is open, and off screen; the animation loop only runs while it turns
  let frame = 0;
  // Declared, because `turning()` reads it before any pointer event assigns it. Undeclared, the
  // read threw "hovered is not defined" on the first intersection and the ring never turned at all.
  let hovered = false;
  // touch screens have no hover to hold it still, so there the ring does not turn by itself (WCAG 2.2.2)
  const noHover = window.matchMedia("(hover: none)").matches;
  const turning = () =>
    open < 0 && onScreen && !hovered && !reduceMotion && !noHover;
  const tick = (now) => {
    angle = (angle + (now - last) * speed) % 360;
    setAngle();
    last = now;
    frame = turning() ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => {
    if (frame || !turning()) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  // watch the orbit itself, not the section: hidden on phones (no box) or scrolled away, it does not turn
  const orbit = why.querySelector("[data-why-orbit]");
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    wake();
  });
  io.observe(orbit ?? why);
  const setHover = (on) => {
    hovered = on;
    wake();
  };
  orbit?.addEventListener(
    "pointerenter",
    (e) => e.pointerType !== "touch" && setHover(true),
  );
  orbit?.addEventListener(
    "pointerleave",
    (e) => e.pointerType !== "touch" && setHover(false),
  );
  orbit?.addEventListener("focusin", () => setHover(true));
  orbit?.addEventListener(
    "focusout",
    (e) => !orbit.contains(e.relatedTarget) && setHover(false),
  );

  // Switching reasons: the card fades out (250ms), the ring turns, then the card fades back in with the new
  // reason (CSS why-card waits 600ms after data-show, so it appears as the 900ms turn ends).
  let swap = 0;
  const showPanel = (index) => {
    panels.forEach((panel, i) =>
      panel.toggleAttribute("data-active", i === index),
    );
    why.setAttribute("data-open", "");
    why.setAttribute("data-show", "");
  };
  const select = (index) => {
    const switching = open >= 0 && open !== index;
    open = index;
    // Shortest turn that brings circle `index` (at index × step degrees on the ring) to 3 o'clock (90°)
    const delta = ((((90 - index * step - angle) % 360) + 540) % 360) - 180;
    angle += delta;
    if (!reduceMotion) spin.setAttribute("data-turning", "");
    setAngle();
    setTimeout(() => spin.removeAttribute("data-turning"), 900);
    tabs.forEach((tab, i) => {
      tab.toggleAttribute("data-active", i === index);
      tab.setAttribute("aria-expanded", String(i === index));
    });
    clearTimeout(swap);
    if (switching && !reduceMotion) {
      why.removeAttribute("data-show"); // the slot stays open; only the card fades out and back in
      swap = setTimeout(() => showPanel(index), 300);
    } else showPanel(index);
  };
  const close = () => {
    const was = open;
    open = -1;
    wake(); // the ring turns on again
    clearTimeout(swap);
    why.removeAttribute("data-open");
    why.removeAttribute("data-show");
    tabs.forEach((tab) => {
      tab.removeAttribute("data-active");
      tab.setAttribute("aria-expanded", "false");
    });
    if (was >= 0) tabs[was].focus();
  };

  tabs.forEach((tab, i) =>
    tab.addEventListener("click", () => (open === i ? close() : select(i))),
  );
  why.querySelector("[data-why-close]").addEventListener("click", close);
  why.querySelectorAll("[data-why-next]").forEach((button) =>
    button.addEventListener("click", () => {
      select((open + 1) % tabs.length);
      // the card is hidden while it swaps, so keep focus on the new reason's circle
      tabs[open].focus();
    }),
  );
  // Esc closes the card wherever focus is
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && open >= 0) close();
    },
    { signal },
  );

  // The frame, the observer and the two timers outlive the element on their own; the signal is
  // what stops a navigated-away orbit from still animating and still answering Escape.
  onAbort(signal, () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    clearTimeout(swap);
  });
});

// How it works (lovable.dev style): the step whose card has crossed the middle of the screen is active.
// Its description opens (CSS: how-desc) and --how-p (0 → 1) fills the line under it as the card scrolls
// past (CSS: how-progress). The active card — once it is on screen — plays its story on a loop: a "beat"
// timeline on its [data-scene] (CSS: how-scene, pre-N / at-N variants). data-play starts it, data-b2 …
// arrive at the times in data-beats; the last frame holds, the scene fades out, resets instantly and plays
// again. A scene that loses focus (another card becomes active, or it leaves the screen) pauses on its current
// beat and carries on from there when it comes back. Hovering the active card (mouse or pen) pauses its story the
// same way, and "Paused" appears at the card's corner (CSS: how-pause). That corner pill is also the pause
// button, because hover is the one thing a thumb cannot do: pressing it stops every story (WCAG 2.2.2).
// A scene that has never played shows its final frame. Without JS, or with reduced motion (never data-play),
// every scene simply shows its final frame.
feature("[data-how]", function initHow(how, signal) {
  const steps = [...how.querySelectorAll("[data-how-step]")];
  const cards = [...how.querySelectorAll("[data-how-card]")];
  const scenes = cards.map((card) => card.querySelector("[data-scene]"));
  const HOLD = 2600; // ms the final frame stays before the loop restarts
  const FADE = 400; // ms, matches how-scene's opacity transition
  const elapsed = new Map(); // scene → ms into its loop when it was last paused
  let timers = [];
  let playing = null; // the scene that should be playing (the active, on-screen one)
  let running = null; // the scene whose timers are running
  let startedAt = 0; // performance.now() minus the elapsed time of the running scene
  let held = null; // the card under the pointer: its story pauses while it is there
  let paused = false; // the visitor pressed pause: every story stops until they press play

  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  // jump a scene back to its first beat without transitions
  const reset = (scene) => {
    scene.setAttribute("data-instant", "");
    for (let b = 2; b <= 9; b++) scene.removeAttribute(`data-b${b}`);
    scene.removeAttribute("data-fade");
    scene.setAttribute("data-play", "");
    void scene.offsetWidth; // apply the jump before transitions come back
    scene.removeAttribute("data-instant");
  };
  // play `scene` from `from` ms into its loop; beats already reached stay as they are
  const resume = (scene, from = 0) => {
    clearTimers();
    if (from === 0) reset(scene);
    startedAt = performance.now() - from;
    const beats = scene.dataset.beats.split(" ").map(Number);
    const end = beats[beats.length - 1] + HOLD;
    beats.forEach((t, i) => {
      if (i > 0 && t > from)
        timers.push(
          setTimeout(() => scene.setAttribute(`data-b${i + 1}`, ""), t - from),
        );
    });
    timers.push(
      setTimeout(
        () => {
          scene.setAttribute("data-fade", "");
          timers.push(
            setTimeout(() => {
              elapsed.delete(scene);
              resume(scene, 0);
            }, FADE),
          );
        },
        Math.max(0, end - from),
      ),
    );
  };
  // freeze `scene` on its current beat and remember how far it got
  const hold = (scene) => {
    clearTimers();
    const beats = scene.dataset.beats.split(" ").map(Number);
    const end = beats[beats.length - 1] + HOLD;
    const at = performance.now() - startedAt;
    if (at >= end) {
      // paused while fading out: the loop is over, so the next play starts at the first beat
      scene.removeAttribute("data-fade");
      elapsed.delete(scene);
    } else elapsed.set(scene, at);
  };
  // run the scene that should play (the active one, unless its card is hovered); hold any other
  const sync = () => {
    const card = cards[scenes.indexOf(playing)];
    const want =
      playing && !reduceMotion && card !== held && !paused ? playing : null;
    cards.forEach((c, i) => {
      const on = scenes[i] === playing && !reduceMotion && (c === held || paused);
      c.toggleAttribute("data-held", on);
      const status = c.querySelector("[data-how-status]");
      // The word comes from the markup, where it is translated; a literal here would be English on /vi.
      const text = on ? (status?.dataset.labelPaused ?? "") : "";
      if (status && status.textContent !== text) status.textContent = text; // role=status: announced when it changes
    });
    if (running === want) return;
    if (running) hold(running);
    running = want;
    if (want) resume(want, elapsed.get(want) ?? 0);
  };
  const play = (scene) => {
    if (playing === scene) return;
    playing = scene;
    sync();
  };

  // Hovering a card (mouse and pen) pauses its story while the pointer is on it; the "Paused" sign shows meanwhile.
  cards.forEach((card) => {
    card.addEventListener(
      "pointerenter",
      (e) => {
        if (e.pointerType === "touch") return;
        held = card;
        sync();
      },
      { signal },
    );
    card.addEventListener(
      "pointerleave",
      (e) => {
        if (e.pointerType === "touch" || held !== card) return;
        held = null;
        sync();
      },
      { signal },
    );
  });

  // Touch has no hover, so the pill is also the control. One state across all three buttons: scrolling
  // on to the next card must not restart motion the visitor asked to stop.
  const pauseButtons = [...how.querySelectorAll("[data-how-pause]")];
  pauseButtons.forEach((btn) =>
    btn.addEventListener(
      "click",
      () => {
        paused = !paused;
        for (const b of pauseButtons) {
          b.setAttribute("aria-pressed", String(paused));
          const label = paused ? b.dataset.labelPlay : b.dataset.labelPause;
          if (label) b.setAttribute("aria-label", label);
          b.querySelector("[data-how-pause-icon]")?.setAttribute(
            "href",
            paused ? "#i-play" : "#i-pause",
          );
        }
        sync();
      },
      { signal },
    ),
  );

  // Clicking a step scrolls smoothly to its card (centred) instead of jumping; reduced motion jumps
  how.querySelectorAll("[data-how-link]").forEach((link) =>
    link.addEventListener("click", (event) => {
      const card = document.querySelector(link.getAttribute("href"));
      if (!card) return;
      event.preventDefault();
      card.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
      history.replaceState(null, "", link.getAttribute("href"));
    }),
  );

  let ticking = false;
  const update = () => {
    ticking = false;
    const middle = innerHeight / 2;
    // read every card's position first, then write: no layout is forced between the two
    const rects = cards.map((card) => card.getBoundingClientRect());
    let index = 0;
    rects.forEach((r, i) => {
      if (r.top <= middle) index = i;
    });
    const box = rects[index];
    const p = Math.min(1, Math.max(0, (middle - box.top) / box.height));
    const live =
      box.top < innerHeight * 0.8 && box.bottom > 0 ? scenes[index] : null;
    steps.forEach((step, i) => {
      step.toggleAttribute("data-active", i === index);
      step.style.setProperty("--how-p", i === index ? p.toFixed(3) : "0");
    });
    // the active, on-screen card plays its story; its Missing stripes run only then (CSS missing-flag)
    cards.forEach((card, i) =>
      card.toggleAttribute("data-active", live === scenes[i]),
    );
    play(live);
  };
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true, signal },
  );
  addEventListener("resize", update, { signal });
  update();
});

// DEAL acronym (About page). The HTML is the final, expanded column. Measure it once, pin its width, start each
// initial from its place in a big centred "DEAL" row (FLIP: translate + scale back to the column), then loop:
//   hold 1.1s → stack (letters drop into the column, Ink → Blue) → 2.3s expand (words open) → 2s on the words →
//   collapse (words close, bottom first) → return (letters fly back into the row, Blue → Ink) → hold …
// It runs while 40% of the block is on screen; the Pause button stops it on the final words (WCAG 2.2.2). A
// resize shows the final state with fresh measurements, then the loop goes on. Reduced motion: nothing runs.
if (!reduceMotion)
  document
    .querySelectorAll("[data-deal]")
    .forEach((deal) => deal.closest("[hidden]") || initDeal(deal)); // a hidden block (About page, for now) stays idle

function initDeal(deal) {
  const SCALE = 2.7; // the big row is 2.7× the column size
  // one cycle, in ms from the hold state
  const STACK_AT = 1100;
  const EXPAND_AT = 2300;
  const COLLAPSE_AT = 5600; // ≈ 2.2s on the finished words (they are open by 3350)
  const RETURN_AT = 6350; // words closed: 3 × 100ms stagger + 450ms
  const CYCLE = 7300; // letters back in the row: 3 × 60ms + 700ms, then the next hold starts
  const initials = [...deal.querySelectorAll(".deal-initial")];
  const words = [...deal.querySelectorAll(".deal-word")];
  const pause = deal.parentElement.querySelector("[data-deal-pause]");
  let timers = [];
  let measured = false;
  let visible = false;
  let paused = false;

  const clear = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const state = (name) => deal.setAttribute("data-state", name);
  // still, final words (paused, off screen, resized)
  const finish = () => {
    clear();
    state("done");
  };
  // Measure the final layout once (and after a resize), then put every initial back into the big row
  const measure = () => {
    state("done");
    deal.style.removeProperty("--deal-w");
    const box = deal.getBoundingClientRect();
    const rects = initials.map((el) => el.getBoundingClientRect());
    const widths = words.map((el) => el.scrollWidth);
    const rowWidth = rects.reduce((sum, r) => sum + r.width * SCALE, 0);
    const rowHeight = rects[0].height * SCALE;
    let x = box.left + (box.width - rowWidth) / 2;
    const y = box.top + (box.height - rowHeight) / 2;
    initials.forEach((el, i) => {
      const r = rects[i];
      el.style.setProperty("--i", i);
      el.style.setProperty("--ri", initials.length - 1 - i);
      el.style.setProperty(
        "--deal-from",
        `translate(${(x - r.left).toFixed(1)}px, ${(y - r.top).toFixed(1)}px) scale(${SCALE})`,
      );
      x += r.width * SCALE;
    });
    words.forEach((el, i) => {
      el.style.setProperty("--i", i);
      el.style.setProperty("--ri", words.length - 1 - i);
      el.style.setProperty("--w", `${widths[i]}px`);
    });
    deal.style.setProperty("--deal-w", `${box.width}px`);
    measured = true;
  };
  const cycle = () => {
    clear();
    state("hold"); // the end of "return" looks exactly like "hold", so the jump is invisible
    at(STACK_AT, () => state("stack"));
    at(EXPAND_AT, () => state("expand"));
    at(COLLAPSE_AT, () => state("collapse"));
    at(RETURN_AT, () => state("return"));
    at(CYCLE, cycle);
  };
  const start = () => {
    if (paused || !visible) return;
    if (!measured) measure();
    cycle();
  };

  document.fonts.ready.then(() => {
    measure();
    state(paused ? "done" : "hold");
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else finish();
      },
      { threshold: 0.4 },
    ).observe(deal);
  });

  pause?.addEventListener("click", () => {
    paused = !paused;
    pause.setAttribute("aria-pressed", String(paused));
    pause.querySelector("[data-deal-pause-label]").textContent = paused
      ? "Play animation"
      : "Pause animation";
    pause
      .querySelector("[data-deal-pause-icon]")
      .setAttribute("href", paused ? "#i-play" : "#i-pause");
    if (paused) finish();
    else start();
  });

  let resizeTimer;
  let lastWidth = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === lastWidth) return; // mobile address bar: height-only resizes are not layout changes
    lastWidth = innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      finish();
      measure();
      state("done");
      at(2000, start); // show the final words, then carry on looping
    }, 150);
  });
}

// Background video (product heroes). data-bg-video is the file stem: "<stem>-light|dark.av1.mp4" (AV1, smaller) and
// ".h264.mp4" (fallback) plus "<stem>-light|dark.webp" (poster, the <picture> behind it). The theme follows the OS
// or <html data-theme>. It plays only while on screen and fades in once a frame is playing. The poster is only a
// fallback: reduced motion and no JS (CSS), autoplay blocked, or no frame after 3s. There is no
// pause button (decided 16 Oct 2026): reduced motion is the opt-out.
feature("[data-bg-video]", function initBgVideo(video, signal) {
  if (reduceMotion) return; // the CSS shows the poster instead
  const stem = video.dataset.bgVideo;
  const section = video.closest("section");
  const poster = section.querySelector("[data-bg-poster]");
  const osDark = matchMedia("(prefers-color-scheme: dark)");
  const STALL = 3000; // ms without a playing frame before the poster stands in
  let visible = false;
  let theme = null;
  let stall;

  const currentTheme = () =>
    document.documentElement.dataset.theme ??
    (osDark.matches ? "dark" : "light");
  // the poster is only a fallback: shown when the video cannot play (blocked autoplay, very slow connection)
  const fallback = () => poster.setAttribute("data-fallback", "");
  const load = () => {
    const next = currentTheme();
    if (next === theme) return;
    theme = next;
    video.removeAttribute("data-playing"); // the old theme's video fades out, the new one fades in
    video.replaceChildren(
      Object.assign(document.createElement("source"), {
        src: `${stem}-${theme}.av1.mp4`,
        type: 'video/mp4; codecs="av01.0.08M.08"',
      }),
      Object.assign(document.createElement("source"), {
        src: `${stem}-${theme}.h264.mp4`,
        type: "video/mp4",
      }),
    );
    // the poster <picture> only knows the OS theme; follow a data-theme override too
    if (document.documentElement.dataset.theme) {
      poster.querySelectorAll("source").forEach((s) => s.remove());
      poster.querySelector("img").src = `${stem}-${theme}.webp`;
    }
    video.load();
    clearTimeout(stall);
    stall = setTimeout(
      () => video.hasAttribute("data-playing") || fallback(),
      STALL,
    );
    update();
  };
  video.addEventListener("playing", () => {
    clearTimeout(stall);
    video.setAttribute("data-playing", ""); // fades the video in (hero-video-media)
    // a poster that stood in goes once the video has faded in over it
    setTimeout(() => poster.removeAttribute("data-fallback"), 700);
  });
  const update = () => {
    if (visible)
      video.play().catch((e) => e.name === "NotAllowedError" && fallback()); // autoplay blocked
    else video.pause();
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) load(); // first time on screen: fetch the video
    update();
  });
  io.observe(section);
  onAbort(signal, () => io.disconnect());
  // `osDark` is a MediaQueryList that outlives the page, so this one needs the signal too
  osDark.addEventListener("change", () => theme && load(), { signal });
});

// Ask Pulse chat (shell, every page; UI only, 20 Oct 2026): the corner button opens and closes the panel
// (aria-expanded, data-open), Esc closes it and returns focus to the button, the expand button widens it. Sending
// adds the visitor's message and, after a short pause, the "not connected yet" reply from the <template> (its links
// are already rewritten for the page's folder by sync-shell.py). Enter sends, Shift+Enter starts a new line. The jump
// button shows when the conversation is scrolled away from the latest message.
feature("[data-chat]", function initChat(chat) {
  const toggle = chat.querySelector("[data-chat-toggle]");
  const panel = chat.querySelector("[data-chat-panel]");
  const log = chat.querySelector("[data-chat-log]");
  const form = chat.querySelector("[data-chat-form]");
  const input = chat.querySelector("[data-chat-input]");
  const send = chat.querySelector("[data-chat-send]");
  const latest = chat.querySelector("[data-chat-latest]");
  const expand = chat.querySelector("[data-chat-expand]");
  const reply = chat.querySelector("[data-chat-reply]");

  const setOpen = (open) => {
    panel.toggleAttribute("data-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close Ask Pulse" : "Ask Pulse");
    if (open) setTimeout(() => input.focus(), 50);
  };
  toggle.addEventListener("click", () =>
    setOpen(!panel.hasAttribute("data-open")),
  );
  chat.querySelector("[data-chat-close]").addEventListener("click", () => {
    setOpen(false);
    toggle.focus();
  });
  chat.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.hasAttribute("data-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  expand.addEventListener("click", () => {
    const on = !panel.hasAttribute("data-expanded");
    panel.toggleAttribute("data-expanded", on);
    expand.setAttribute("aria-pressed", String(on));
    expand.setAttribute("aria-label", on ? "Shrink chat" : "Expand chat");
    expand
      .querySelector("use")
      .setAttribute("href", on ? "#i-minimize" : "#i-maximize");
  });

  const nearBottom = () =>
    log.scrollHeight - log.scrollTop - log.clientHeight < 24;
  const toBottom = () =>
    log.scrollTo({
      top: log.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  log.addEventListener("scroll", () =>
    latest.toggleAttribute("data-show", !nearBottom()),
  );
  latest.addEventListener("click", toBottom);

  const grow = () => {
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
    send.disabled = !input.value.trim();
  };
  input.addEventListener("input", grow);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const mine = document.createElement("div");
    mine.className =
      "ml-auto w-fit max-w-5/6 rounded-2xl bg-ink px-4 py-3 text-data text-pretty wrap-anywhere whitespace-pre-line text-card";
    mine.textContent = text;
    log.append(mine);
    input.value = "";
    grow();
    toBottom();
    setTimeout(() => {
      log.append(reply.content.cloneNode(true));
      toBottom();
    }, 600);
  });
});

/* ==================================================================== *
 * The only addition to the designer's file.                            *
 *                                                                      *
 * Everything above is `src/main.js` at afedfc1, byte for byte, so it    *
 * can be re-copied when the designer changes it.                       *
 *                                                                      *
 * The reveal observer is created once and observes the elements present *
 * when the script runs. That is correct for a set of static HTML pages, *
 * where every navigation is a full page load. Here the pages are a Next *
 * app: the first load runs this, and every navigation after it swaps    *
 * the DOM without re-running anything. Without a rescan the second page *
 * a visitor opens has 363 `.reveal` elements stuck at `opacity: 0`.     *
 *                                                                      *
 * `rescan` observes anything not yet shown. Already-shown elements keep *
 * their `[data-shown]`, and `observe` on an element already being       *
 * observed is a no-op, so calling it repeatedly is safe.                *
 * ==================================================================== */
const UNSHOWN =
  ".reveal:not([data-shown]), .reveal-trigger:not([data-shown]), [data-count]:not([data-shown]), [data-type]:not([data-shown]), [data-shelf]:not([data-shown])";

window.__pulseMotionRescan = function rescan() {
  // Features first: a navigation brings new elements that nothing has bound yet, and takes away
  // elements whose timers are still running.
  mountFeatures();
  document.querySelectorAll(UNSHOWN).forEach((el) => revealObserver.observe(el));
  document.querySelectorAll(".reveal-bar").forEach((bar) => {
    const track = bar.parentElement;
    if (!track || barsByTrack.has(track)) return;
    barsByTrack.set(track, [bar]);
    revealObserver.observe(track);
  });
  // A navigation brings a fresh set of hidden elements, and `sweep` removes itself once a page
  // has none left. Re-adding the same function reference is a no-op if it is still attached.
  window.addEventListener("scroll", sweep, { passive: true });
  scanMedia();
};

/*
 * Keep rescanning while anything is still hidden.
 *
 * One rescan per navigation is not enough. The observer above is created once, observes what is
 * in the document at that moment, and `unobserve`s each element as it shows. React then renders,
 * and the nodes it puts on screen are not always the nodes that were observed: on
 * /en/product/decision-audit only 6 of 25 `.reveal` elements ever received `[data-shown]`, so
 * nineteen of them arrived through the CSS failsafe instead of animating. The page looked
 * complete and moved wrongly, which is harder to notice than a blank page.
 *
 * Scroll is the right trigger because it is exactly when a reveal is supposed to happen, and the
 * listener removes itself once nothing is left to show, so a settled page costs nothing.
 */
let queued = false;
function sweep() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    if (document.querySelector(UNSHOWN) === null) {
      window.removeEventListener("scroll", sweep);
      return;
    }
    window.__pulseMotionRescan();
  });
}
window.addEventListener("scroll", sweep, { passive: true });
window.__pulseMotionSweep = sweep;

/* ======================================================================
 * Media placeholders.
 *
 * A picture or a video that has not arrived leaves its box empty, and on a
 * slow connection the section reads as broken rather than as loading. The
 * CSS in globals.css paints a shimmer in that box; this is what takes it
 * away, because only the element knows when its pixels exist.
 *
 * Marked rather than removed: `[data-media-ready]` turns the shimmer off,
 * so the rule is a single selector and the element keeps its own styling.
 *
 * An error marks it ready too. A broken image that shimmers forever claims
 * to be loading something that is never coming, which is worse than a
 * visibly missing picture.
 * ==================================================================== */
function markMedia(el) {
  if (el.hasAttribute("data-media-ready")) return;
  const done = () => el.setAttribute("data-media-ready", "");
  const ready = el.tagName === "IMG" ? el.complete && el.naturalWidth > 0 : el.readyState >= 2;
  if (ready) return done();
  el.addEventListener(el.tagName === "IMG" ? "load" : "loadeddata", done, { once: true });
  el.addEventListener("error", done, { once: true });
}

function scanMedia() {
  document.querySelectorAll("main img, main video").forEach(markMedia);
}

scanMedia();

// The first page is mounted here; every page after it goes through `__pulseMotionRescan`.
mountFeatures();
