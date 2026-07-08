# 06_SCREEN_BLUEPRINTS.md

# Orchrd Screen Blueprints v1.0

---

# Purpose

This document defines the exact layout, structure, hierarchy, spacing and placement of every screen in Orchrd.

These are implementation blueprints.

Do NOT redesign.

Do NOT rearrange.

Do NOT reinterpret.

Implement exactly as specified.

---

# DESIGN PRINCIPLE

The Live Preview is always the hero.

Every other UI element exists to support the preview.

A user should immediately understand:

"I am customizing an app."

Not

"I am filling out settings."

---

# DESKTOP (1440px+)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ LOGO      Orchrd          ● Live Preview             Theme   Help   Waitlist │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ ┌──────────────┐    ┌────────────────────────────┐    ┌────────────────────┐ │
│ │              │    │                            │    │                    │ │
│ │              │    │                            │    │                    │ │
│ │              │    │                            │    │                    │ │
│ │   Studio     │    │                            │    │     Progress       │ │
│ │              │    │                            │    │                    │ │
│ │              │    │      Live Phone Preview    │    │                    │ │
│ │              │    │                            │    │                    │ │
│ │              │    │                            │    │                    │ │
│ │              │    │                            │    │                    │ │
│ │              │    │                            │    │                    │ │
│ │              │    │                            │    │                    │ │
│ └──────────────┘    └────────────────────────────┘    └────────────────────┘ │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                     Plant → Shape → Grow → Harvest                           │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## COLUMN WIDTHS

Left Studio

320px

Center Preview

Flexible

720–960px

Right Sidebar

320px

Gap between columns

32px

Outer page padding

32px

---

## TOP NAVIGATION

Height

72px

Left

Logo

Product Name

Center

Live Preview Indicator

Green pulsing dot

Subtitle

"Changes appear instantly"

Right

Theme Toggle

Help

Join Early Access

Primary Button

---

# STUDIO (LEFT)

Width

320px

Scrollable

White background

Sections appear as stacked premium cards.

Order

1.

🌱 Plant

Blueprint

---

2.

🎨 Shape

Brand

---

3.

🍎 Grow

Features

---

4.

✨ Style

Theme

---

5.

📐 Layout

Structure

---

6.

🌿 Content

Demo Data

---

Each section

Card Radius

24px

Padding

24px

Gap

24px

Cards separated by

24px

---

# PHONE PREVIEW

Hero Element

Always centered.

Maximum Width

420px

Floating

Large shadow

No border touching screen edges.

Top margin

48px

Bottom margin

64px

Preview Controls

Located directly below phone.

Segmented Control

Portrait

Landscape

Foldable

Gap

24px

---

# RIGHT SIDEBAR

Width

320px

Cards

Progress

↓

Health

↓

Tips

↓

Ready to Harvest

Each card

24px Radius

24px Padding

24px Gap

---

# FOOTER

Simple storytelling section.

Four icons

🌱 Plant

↓

🎨 Shape

↓

🍎 Grow

↓

🚀 Harvest

Minimal.

Large spacing.

---

# TABLET (1024–1439)

```
┌────────────────────────────────────────────────────────────┐
│ LOGO         Live Preview            Waitlist              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ ┌────────────┐      ┌────────────────────────────┐          │
│ │            │      │                            │          │
│ │            │      │                            │          │
│ │  Studio    │      │      Phone Preview         │          │
│ │            │      │                            │          │
│ │            │      │                            │          │
│ └────────────┘      └────────────────────────────┘          │
│                                                            │
│          Progress Cards below Preview                      │
├────────────────────────────────────────────────────────────┤
│ Plant → Shape → Grow → Harvest                             │
└────────────────────────────────────────────────────────────┘
```

---

Rules

Right sidebar disappears.

Progress cards move below preview.

Preview remains largest element.

Studio width

300px

---

# MOBILE WEB (<1024)

This is a mobile browser experience.

NOT a native application.

The website itself must feel premium.

---

```
┌──────────────────────────────┐
│ 🍎 Orchrd          ☰         │
├──────────────────────────────┤
│                              │
│     Live Phone Preview       │
│                              │
├──────────────────────────────┤
│ Portrait Landscape Foldable  │
├──────────────────────────────┤
│                              │
│ 🌱 Plant                     │
│ Accordion                    │
├──────────────────────────────┤
│ 🎨 Shape                     │
├──────────────────────────────┤
│ 🍎 Grow                      │
├──────────────────────────────┤
│ ✨ Style                     │
├──────────────────────────────┤
│ 📐 Layout                    │
├──────────────────────────────┤
│ 🌿 Content                   │
├──────────────────────────────┤
│ Progress                     │
├──────────────────────────────┤
│ Join Early Access            │
├──────────────────────────────┤
│ Plant → Shape → Grow         │
└──────────────────────────────┘
```

---

# MOBILE RULES

The preview must always appear before any controls.

The user should immediately see what they are customizing.

Never place the customization controls above the preview.

All customization sections become accordions.

Only one accordion is open at a time.

Buttons become full width.

Cards use

16px page margins.

Phone preview occupies approximately

90% screen width.

Phone shadow remains visible.

---

# VISUAL HIERARCHY

Priority 1

Phone Preview

Largest object

Priority 2

Studio Cards

Priority 3

Top Navigation

Priority 4

Progress

Priority 5

Footer

No element should compete visually with the phone.

---

# SPACING

Outer Page Padding

Desktop

32px

Tablet

24px

Mobile

16px

Card Gap

24px

Section Gap

40px

Preview to Controls

24px

Controls to Studio

32px

Cards to Footer

48px

---

# ANIMATIONS

Theme Change

200ms fade

Template Change

250ms morph

Logo Upload

Fade in

Progress

Animated checkmark

Accordion

220ms expand

Buttons

150ms hover

Everything should feel calm and organic.

Never flashy.

---

# FINAL EXPERIENCE

Within 5 seconds users should understand:

"This is a platform for creating and customizing apps."

Within 30 seconds they should interact with at least one customization option.

Within 2 minutes they should complete the feedback form or join the waitlist.

The interface should consistently communicate Orchrd's story:

🌱 Plant an idea

🎨 Shape your brand

🍎 Grow your experience

🚀 Harvest your app
