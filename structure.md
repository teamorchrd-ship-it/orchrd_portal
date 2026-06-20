# Orchrd Portal - Architecture & Layout Structure

## 1. Project Overview
Orchrd Portal is a real-time app builder that allows users to design and prototype Material 3-based e-commerce applications. It features a dual-panel setup: a **Configuration Panel** (Wizard) on the left and a **Live Device Preview** on the right.

---

## 2. Component Hierarchy
- **App.jsx**: Root component managing global state (theme, config, navigation).
- **Theme Engine**: 
  - `applyM3Colors`: Generates a full M3 tonal palette (Primary, Secondary, Surface, Containers) from a single hex seed color.
  - Supports **Light/Dark** modes.
  - Implements **Surface Tonal** background logic (low-saturation primary hue) consistent with Android 12+.

### Preview Components:
- `HomeScreen`: Main entry point with Brand Header, Search, Banner, Categories, and Products.
- `ProductDetailScreen`: Detailed view with quantity selector and adaptive "Supporting Pane" behavior.
- `CartScreen`: List of added items and total calculation.
- `ProfileScreen`: Detailed user profile with dummy data (Alex Johnson).
- `BottomNav` / `NavigationRail`: Adaptive navigation components for mobile and large screens.

---

## 3. Adaptive Layout Logic (Material 3 Supporting Pane)
The app implements adaptive design patterns for different device form factors:

### Mobile (Portrait / Landscape):
- **Single Pane**: Only one screen visible at a time.
- **Navigation**: Uses `BottomNav`.
- **Grid**: 2 columns for products.

### Foldable / Large Screen:
- **Navigation**: Persistent `NavigationRail` on the far left.
- **Dual Pane Layout**:
  - Uses the **Supporting Pane** pattern.
  - **Left Pane (Main)**: `HomeScreen` list. Flex weight: `1.4`.
  - **Right Pane (Supporting)**: `ProductDetailScreen`. Flex weight: `1`.
- **Conditional Visibility**:
  - The side panel *only* appears when a product is selected.
  - If no product is selected, the `HomeScreen` occupies the full width with a **3-column grid**.
  - When the side panel opens, the `HomeScreen` shrinks to fit and adjusts to a **2-column grid** to optimize space.
- **Detail Refinements**:
  - Side panel image is fixed at **220px height** to maintain a square aspect ratio.
  - Side panel has independent vertical scrolling with `flex-shrink: 0` on images to prevent squeezing.

---

## 4. Configuration Wizard (The Builder)
The wizard guides the user through three distinct stages:
1. **Brand & Identity**: 
   - App Name and Logo (URL or local file upload).
   - Back button to return to the Intro Screen.
2. **Product Inventory**: 
   - List of items with Delete functionality.
   - "Add Product" modal with URL/File upload and description.
3. **Design System**: 
   - Light/Dark mode toggle.
   - Preset M3 Seed Colors and a Custom Color Picker.

---

## 5. Technical Specifications
- **Styling**: `index.css` for structural layout + Inline styles for dynamic Material 3 tokens.
- **Icons**: `lucide-react`.
- **Framework**: React (Vite).
- **Responsive Shell**: Pixel phone mock with Portrait, Landscape, and Foldable orientations.
