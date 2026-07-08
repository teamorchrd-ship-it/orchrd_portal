# Orchrd MVP V1.1 — Product Refinement

## Context

Orchrd's builder (template picker + live phone preview + "Export App" button) already works end-to-end, but it's framed as a design tool, not a validation instrument. The spec's goal is to make the existing screens read as "your app already exists, shape it" and to replace the vague "Export App" action with a real feedback/waitlist capture step, so early demos to founders/agencies produce usable validation signal (ratings, use-case, price sensitivity, email) instead of just a demo.

Confirmed with user: CTA label = **"Join Early Access"**; the existing 2-step narrative walkthrough in `OutroScreen.jsx` is dropped in favor of going straight from the click into the new Title/Subtitle + question flow.

This is a refinement, not a rebuild: every change below reuses the existing flat `App.jsx` state (`appConfig`/`updateConfig`), the existing `CollapsibleSection`/`chip`/`toggle` CSS conventions in `index.css`, and the existing `OutroScreen.jsx` submit/error/retry pattern. No router, state library, or animation library gets introduced.

---

## 1. Copy renames (approachable language)

In the three `CollapsibleSection` `title` props:
- `src/components/ControlPanel/AppearanceSection.jsx:34` — `"Appearance"` → `"Theme"`
- `src/components/ControlPanel/ContentSection.jsx:17` — `"Content Style"` → `"Demo Content"`
- `src/components/ControlPanel/FeaturesSection.jsx:28` — `"Features"` → `"App Features"`

Template/Brand/Layout labels are already plain language — left as-is.

**Status: done.**

## 2. Progress experience

New component `src/components/ProgressStrip.jsx`: a slim, sticky, non-collapsible row pinned at the top of `.config-panel` (above `TemplateSection`), rendering a checklist:
`✓ Template Selected · ✓ Brand Customized · ✓ Theme Applied · ✓ Layout Selected` → `Ready to Build` once all four are true. Unmet items render dimmed/unchecked, met items get a small check-pop (150–200ms).

State in `App.jsx`: add one `useState` object `const [progress, setProgress] = useState({ template: false, brand: false, theme: false, layout: false })`. Each existing handler flips its flag to `true` the first time it fires (never resets to false):
- `switchTemplate` → `progress.template`
- `BrandSection` callbacks (`onNameChange`/`onLogoChange`) → `progress.brand`
- `AppearanceSection` callback → `progress.theme`
- `LayoutSection` callback → `progress.layout`

This only touches the existing callback wiring in `App.jsx:260-289`, not the section components themselves.

CSS additions in `index.css` (new block near `.config-panel`): `.progress-strip`, `.progress-item`, `.progress-item.done`, `.progress-check-pop` keyframe, `.progress-ready`. Keeps panel width unchanged (`--panel-width: 300px` stays).

## 3. Preview feedback animations

All changes stay inside `index.css` + `App.jsx`, except two small edits per preview file (below). No changes to the 900/600/250-line preview components' internal logic.

**Theme color changes** — add `transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease` to the M3-token-driven elements already in `index.css`: `.pixel-screen`, `.app-body`, `.m3-card`, `.m3-navigation-bar`, `.m3-nav-rail`, `.app-search-bar`, `.phone-status-bar`. Since `applyM3Colors()`/`applyCornerRadius()` (`App.jsx:56-99`) already write these as CSS custom properties on `documentElement`, adding the transition is enough to animate every color/shape change — no JS change needed there.

**Template switch** — already animates via `previewIn`/`.preview-enter` (`index.css:610-615`) on the `previewKey`-remount. Leave the mechanism, just soften the easing curve (`cubic-bezier(0.4,0,0.2,1)`) for a more premium feel; stays within 150–300ms.

**Layout / content style changes ("cards animate into new arrangement")** — currently these props update in place with no remount, so nothing animates. Reuse the exact same `previewKey` remount mechanism already wired for template switches: bump `previewKey` inside `updateConfig` in `App.jsx` whenever the path is `layoutStyle` or `contentStyle` (small `if` added to the existing function), so the same `.preview-enter` animation replays. No new keyframes needed.

**App name → toolbar update**: found the exact render spots via grep —
- `src/components/SocialMedia/SocialMediaPreview.jsx:184-185` (`<span>{appConfig.appName}</span>`)
- `src/components/Ecommerce/EcommercePreview.jsx:422-423`
- `src/components/RideHailing/RideHailingPreview.jsx:436-437` (shared `TopBar`)

Add `className="toolbar-name-fade"` and `key={appConfig.appName}` to each of these three `<span>`s. A new `.toolbar-name-fade` keyframe (opacity+small translateY, ~200ms) in `index.css` plays whenever the key changes. To avoid flicker on every keystroke while typing in `BrandSection`'s name input, this is acceptable as-is since `key`-based remount only replays a subtle fade — it does not blank the text, so rapid typing just reflows smoothly (kept deliberately simple, no debounce, per "don't add complexity that isn't needed").

**Logo → fade transition**: same three files, the `<img src={appConfig.logoUrl}>` at:
- `SocialMediaPreview.jsx:182`, `EcommercePreview.jsx:419`, `RideHailingPreview.jsx:434`

Add `className="toolbar-logo-fade"` and `key={appConfig.logoUrl}` to each. New `.toolbar-logo-fade` keyframe (opacity 0→1, ~200-250ms).

Total footprint: 6 one-line JSX edits across 3 preview files + new CSS keyframes/transition rules — no structural changes to those components.

## 4. Replace "Export App" button

`App.jsx:246-253`: label → **"Join Early Access"**, icon swap `Download` → `Rocket` (already available from `lucide-react`, used elsewhere in the codebase pattern via `OutroScreen.jsx`). Keep the exact same `onClick` behavior (`track(...)` + `setStep('outro')`), just rename the tracked event from `'export_clicked'` to `'join_early_access_clicked'` for clarity going forward.

## 5. Feedback experience — rebuild `OutroScreen.jsx`

Remove: `OUTRO_STEPS`, `currentStep`, `showForm`, `handleNext`, the dot navigation, and "Skip to feedback" link (per confirmed decision — go straight from click to the form). Keep and reuse: the `ThreeBackground` wrapper, the `.intro-content-wrapper`/`.outro-form-wrapper` shell, the `submitState` idle/submitting/success/error machine, the honeypot field, the retry button, and the mailto fallback — all of `submitLead()`'s error-handling shape stays, only the payload and fields change.

New header (replaces the old walkthrough): `🎉 Thanks for trying Orchrd!` / `You're helping shape the future of mobile app development. We'd love your honest feedback.`

New fields (single scrolling form, matches existing `.outro-question`/`.outro-chip-row` pattern):
1. **Star rating** (required) — small local component inside `OutroScreen.jsx` (5 `lucide-react` `Star` buttons, filled up to selected value using `var(--portal-accent)`; plain `<button>`s so keyboard/focus works for free). Not extracted to its own file — only used once.
2. **Primary use** — chip single-select, options: MVP validation / Client presentations / Startup idea / Internal business app / Agency work / UI exploration / Other.
3. **Favorite feature** — chip single-select: Live Preview / Templates / Theme Customization / Layout Switching / App Features / Overall Experience.
4. **What confused you** — `<textarea className="input-field outro-textarea">`, placeholder "Tell us what felt missing or confusing.", optional.
5. **Likelihood to use** — chip single-select: Definitely / Probably / Maybe / Not likely.
6. **Expected price** — chip single-select: Free / Under $10 / $10–25 / $25–50 / $50–100 / $100+.
7. **Email** — existing `input-field` pattern + a new checkbox "Notify me when Orchrd launches" (default checked).
8. **Optional checkbox** — "I'd love to join a 15-minute feedback interview" (default unchecked).
9. Submit button label → **"Submit Feedback"**.

Required fields kept minimal per spec (only Q1 is explicitly marked required): star rating + email. Everything else optional but encouraged — matches the given spec literally instead of over-gating the form.

Success screen copy replaced with: `🎉 Thank you!` / `Your feedback will directly influence the first public version of Orchrd. We'll notify you when early access becomes available.` Keep the existing "Build Another App" reload button — no conflict with the new copy.

## 6. Data model

New tiny file `src/lib/feedback.js`: a JSDoc `@typedef Feedback` documenting `{ rating, primaryUse, favoriteFeature, missingFeature, likelihoodToUse, expectedPrice, email, wantsInterview, wantsNotify, createdAt }` (the two extra fields — `wantsInterview`'s sibling `wantsNotify` and `createdAt` — needed because the UI has a "notify me" checkbox not named in the example interface) plus one small factory `buildFeedback(fields)` that stamps `createdAt: new Date().toISOString()`. `OutroScreen.jsx` calls this to build the payload, then wraps it the same way `submitLead()` already does today (`{ type: 'lead', sessionId, ...feedback, ...getAttribution() }`) before POSTing — keeping the core `Feedback` shape itself backend-agnostic while still fitting the existing Google Sheets envelope.

## 7. Backend script update

`scripts/google-apps-script.gs:23` — `LEAD_HEADERS` currently lists the old 3-question shape (`wouldUse`, `priceBucket`, `feedback`). Update it to the new field names (`rating`, `primaryUse`, `favoriteFeature`, `missingFeature`, `likelihoodToUse`, `expectedPrice`, `email`, `wantsInterview`, `wantsNotify`, `createdAt`) so the live spreadsheet actually captures the richer data — otherwise the new fields would silently be dropped by `sheet.appendRow(headers.map(key => data[key] ?? ''))` at line 54. This is a required follow-on, not scope creep, since this backend is already wired and live.

## 8. Accessibility / animation guardrails

- Add one `@media (prefers-reduced-motion: reduce)` block in `index.css` disabling the new decorative keyframes (`toolbar-name-fade`, `toolbar-logo-fade`, `progress-check-pop`) — color/shape `transition`s stay (they're not purely decorative, and instant snaps would look broken).
- All new interactive elements (star buttons, chips, checkboxes) are native `<button>`/`<input>` — no `outline: none` overrides exist today, so keyboard focus rings keep working without extra work.
- No panel width change; mobile responsive behavior (`@media (max-width: 900px)` in `index.css:758-819`) already keeps the preview visible above the panel via `column-reverse` — unaffected by these changes.

---

## Verification

1. `npm run dev`, walk the golden path: pick a template → rename app → change logo → change theme/color/corner radius → change layout — confirm the progress checklist fills in, colors/logo/name/layout all animate smoothly (no snap/flash), and nothing shifts the panel width.
2. Click "Join Early Access" → confirm it lands directly on the new title/subtitle + 7-question form (no intermediate walkthrough steps).
3. Submit with only rating + email filled → success screen shows the new copy. Submit with `VITE_GOOGLE_SHEETS_URL` unset (dev default) → check console warning still logs the full payload shape so the new fields are visible for manual inspection.
4. Tab through the whole feedback form with keyboard only — confirm every star, chip, checkbox, and the submit button are reachable and show a visible focus state.
5. Resize to <900px width — confirm preview stays visible above the (now slightly taller, due to progress strip) control panel, and confirm the progress strip doesn't force a horizontal scrollbar.
