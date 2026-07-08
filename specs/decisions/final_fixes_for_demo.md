# Final Fixes for Demo — Product Head Review

## Context

We're putting Orchrd in front of prospective customers. Nobody is going to
read a spec sheet — they're going to watch someone click through this tool
for 90 seconds and decide, on gut feel, whether this is a toy or a product.
That means the bar isn't "does it work," it's "does it feel inevitable" —
every click should look faster and more polished than the audience expects,
with at least one moment that makes someone in the room go "wait, do that
again."

North star for every item below: **time-to-wow, momentum, no visible
seams.** A demo that makes the *presenter* wait on their own tool is a
demo that's actively working against us.

---

## The 90-second narrative we're actually selling

1. **0–10s** — Land on a real, opinionated app already running (not a blank
   canvas). Confidence signal: "this already exists."
2. **10–40s** — Presenter changes 3–4 things fast (template, theme, brand)
   and the phone updates believably, like a real app rebuilding itself.
3. **40–60s** — One single "watch this" moment that no competitor demo has
   — something that reframes the tool from "form builder" to "magic."
4. **60–90s** — Close on "Join Early Access" without the pitch stalling on
   a 7-question form while the room watches.

Every fix below maps to making one of these four beats land harder or
removing something that currently drags on it.

---

## P0 — Fix before anyone sees this (active bugs, not opinions)

### 1. Magic overlay fires on every keystroke
`App.jsx`'s `updateConfig` calls `triggerMagicLoading()` unconditionally,
and `BrandSection.jsx:20`'s name input calls `onNameChange` — and therefore
`updateConfig('appName', …)` — on every character typed. Typing "Acme"
blurs and shimmers the preview four times in under a second. This is the
opposite of magic: it's visible lag on the one field a presenter is most
likely to type live, in front of the room.

**Fix:** only trigger the overlay on discrete, deliberate selections
(chips, toggles, template switches, sliders) — not on free-text input
(`appName`, `logoUrl` via typing). Text fields keep their existing
`toolbar-name-fade` / `toolbar-logo-fade` micro-animation, which was
already designed to handle rapid typing gracefully.

### 2. Magic overlay pacing will read as slow by the third click
Great on click one. By click five in a live demo, the presenter is
visibly waiting on their own tool while narrating. A pitch has zero
tolerance for that.

**Fix:** scope the full sparkle-overlay treatment to **template
switches only** — the one moment that genuinely benefits from a
"rebuilding your app" beat. For minor tweaks (a single color, a toggle),
drop to the existing lightweight transitions (color fade, card
re-animate) with no overlay at all. If we keep it for all changes,
shorten to ~350ms and only show it once per debounced burst, never
re-triggering on the 2nd/3rd change within the same 350ms window.

### 3. Every control is a click-to-open accordion
`AppearanceSection.jsx:34`, `LayoutSection.jsx:26`, `ContentSection.jsx:17`,
`FeaturesSection.jsx:28` all default closed (`CollapsibleSection.jsx:4-5`).
A live demo needs "watch me flip five things," not "watch me open five
accordions, then flip five things." `TemplateSection` and `BrandSection`
already default open — the rest should too, or the panel should become a
tab strip instead of stacked collapsibles so switching between Theme and
Layout is one click, not two.

**Fix:** default Theme and Layout open (the two most-demoed controls).
Leave Features/Demo Content collapsed — they're supporting detail, not
headline material.

---

## P1 — The wow moment (this is what gets talked about after the meeting)

### 4. "Remix" button — one click, the whole app changes
Right now, impressiveness is additive: the presenter clicks through six
separate controls to prove the tool has range, and the audience has to
extrapolate. A single **"Remix"** button (sparkle icon, sits next to the
progress strip or in the header) that swaps template + theme color +
corner radius + layout + content style together, in one gesture, animated
by the same `previewKey` remount mechanism (`App.jsx:196`) that already
drives the preview-enter animation — that's the moment. It's the single
highest-leverage thing we can add: it turns "let me show you the range of
options" (slow, narrated) into "look" (fast, visceral).

This is the beat 40–60s in the narrative above is built around. Everything
else in this doc is in service of not stepping on this moment.

### 5. "Ready to Build" deserves a bigger payoff
Right now hitting 100% on the progress bar (`ProgressStrip.jsx`) just
changes a label color. That's the natural climax of the "this already
feels like a real app" arc — it should feel like one. A short confetti
burst or a one-time accent-colored pulse across the phone bezel when
`allDone` flips true costs little and gives the room a second reason to
react, independent of the Remix moment.

### 6. Intro screen should promise the wow, not just explain the product
`IntroScreen.jsx`'s five narrative steps are exposition ("Orchrd changes
the game...", "Take complete control..."). None of it previews *what's
about to happen*. Consider trimming to 2–3 steps max and closing the last
one on something concrete and demo-specific — e.g., a line that primes
the Remix moment ("Watch your app rebuild itself in real time") — so the
audience is anticipating beat #4 instead of being surprised by it.

---

## P2 — Polish (do these if there's time, not before)

### 7. Progress strip messaging should feel like a game, not a compliance bar
"Template Selected · Brand Customized · Theme Applied · Layout Selected"
reads like a checklist, not a hook. Reframe the copy to sound like
completion is rewarding (e.g. "3/4 — almost a real app") rather than
administrative. Low cost, marginal but free engagement lift.

### 8. Presenter escape hatch on the feedback form
The 7-question form (`OutroScreen.jsx`) is correct for real traffic —
wrong for a live pitch, where nobody wants to watch the presenter fill out
a survey. Add a way to jump straight to the success state during a live
demo (e.g. a query param or a quiet keyboard shortcut) so beat #4 (close
on "Join Early Access") doesn't stall on 7 chip-selections in front of an
audience.

### 9. Hover/press micro-interactions on template & theme chips
Small scale/lift on hover for `.template-chip`, color swatches, and layout
options — cheap, and it's the kind of detail that makes a tool feel
expensive without anyone consciously noticing why.

---

## Explicitly not doing (guardrails)

- No router, no new state library, no animation library — same constraint
  as the original spec. Everything above is CSS + existing React state.
- Not rebuilding the feedback form's question set — that's a data
  collection decision, not a demo-polish one.
- Not touching the backend/Sheets integration — out of scope for "make the
  demo land."

---

## How we'll know it worked

- A presenter can go through the full flow — template swap, theme swap,
  Remix, Join Early Access — in under 90 seconds without ever visibly
  waiting on the app.
- The Remix moment gets a reaction (laugh, "wait what," lean-in) in at
  least informal internal dry-runs before it goes in front of a customer.
- Typing an app name live no longer visibly blurs or stutters the preview.

## Suggested build order

1. P0 #1 (keystroke bug) — it's actively broken, fix regardless of
   direction on anything else.
2. P0 #3 (default-open sections) — five-minute change, immediate friction
   removal.
3. P0 #2 (overlay scoping/pacing) — depends on #1 being fixed first.
4. P1 #4 (Remix button) — the centerpiece; do this once the above stops
   fighting it.
5. P1 #5 and #6, then P2, as time allows.
