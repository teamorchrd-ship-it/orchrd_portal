# Orchrd Portal AI Agent Context

## 🧠 About Orchrd Portal

Orchrd is a web-based platform that allows users to visually create and preview mobile apps (Ecommerce, Ride-Hailing, Social Media) in real-time.

The portal does NOT build real apps at this stage.

Its purpose is to:

* Simulate realistic mobile app UI
* Allow users to configure app design and features
* Provide instant visual feedback
* Create a "this is my app" experience

---

## 🎯 Core Objective

Build a web-based portal UI that simulates mobile apps inside a device frame.

Focus on:

* Realistic mobile UI rendering
* Smooth interactions
* Real-time updates from configuration panel

---

## ⚙️ Tech Requirements

* Use React (or modern web framework)
* Use Material 3 design system (web equivalent)
* Component-based architecture
* State-driven UI (React state or equivalent)
* Clean modular structure

---

## 🧩 Portal Layout Structure

Main Screen Layout:

[ Configuration Panel ] | [ App Preview Area ]

### Left Side (Config Panel):

* App Name input
* Logo upload placeholder
* Color picker
* Feature toggles
* Layout toggles

### Right Side (Preview Area):

* Mobile device frame
* Render simulated app UI inside frame
* Support switching:

    * Phone (portrait)
    * Landscape
    * Tablet / Foldable

---

## 🛒 Ecommerce Preview (Simulation Only)

Follow patterns inspired by Amazon/Daraz.

### Visual Elements:

* Top search bar
* Banner carousel
* Product grid
* Product detail modal
* Cart UI (simulated)

### Interactions:

* Toggle grid/list layout
* Change theme color dynamically
* Simulate "Add to Cart" animation
* Switch product categories

### Important:

* No real checkout logic
* All data is mock/sample

---

## 🚗 Ride-Hailing Preview (Simulation Only)

Follow patterns inspired by Uber/Careem.

### Visual Elements:

* Map placeholder (static or animated)
* Pickup/drop UI
* Ride selection cards
* Driver assigned UI

### Interactions:

* Simulate ride movement (fake animation)
* Toggle ride types
* Change pricing style
* Expand/collapse bottom sheet

### Important:

* No real map API required
* Use placeholder visuals

---

## 🌐 Social Media Preview (Simulation Only)

Follow patterns inspired by Instagram/WhatsApp.

### Visual Elements:

* Feed (scrollable posts)
* Profile UI
* Chat screen
* Stories/Reels section

### Interactions:

* Like/comment animations
* Toggle chat on/off
* Toggle reels/stories
* Switch themes

---

## 📱 Device Simulation

Preview must support:

* Phone (portrait)
* Phone (landscape)
* Tablet / Foldable

### Behavior:

* Layout adapts visually
* Not true native rendering, but realistic simulation

---

## 🔁 Real-Time Update System

* Any change in config panel updates preview instantly
* No page reload
* Use reactive state system

---

## 🎨 UI/UX Guidelines

* Clean Material 3 style
* Smooth animations
* Realistic spacing and hierarchy
* Modern UI patterns

---

## ⚠️ Constraints

Do NOT:

* Build real backend systems
* Integrate APIs
* Overcomplicate logic
* Try to replicate native behavior exactly

Focus on:

* Visual realism
* Speed
* Smooth UX

---

## 🎯 Goal Experience

User should feel:

"This looks like a real app I can launch"

---

## 📦 Output Requirements

* Clean component structure
* Reusable UI components
* Separate:

    * Config Panel
    * Preview Renderer
* Mock data for all previews

---

## 🚀 Final Instruction

Build the system as a scalable preview engine that can later connect to server-driven UI.

Prioritize:

* Modularity
* Real-time updates
* Clean UI rendering
