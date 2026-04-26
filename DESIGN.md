# Design System Strategy: Clinical Precision & Editorial Elegance

This document outlines the visual language for the Zhejiang Zhangxu Animal Hospital digital ecosystem. It is designed to move beyond the "utilitarian medical template" into a high-end, editorial experience that reflects authority, clinical excellence, and sophisticated care.

---

## 1. Overview & Creative North Star: "The Clinical Curator"

The Creative North Star for this system is **"The Clinical Curator."** 

Unlike traditional veterinary platforms that rely on soft imagery and crowded grids, this system treats medical data and animal care as a high-end editorial subject. We achieve this through **intentional asymmetry**, where large headings are offset by generous white space, and **tonal layering**, where depth is created through background shifts rather than harsh lines. The goal is a "breathable" interface that feels as sterile and premium as a modern surgical suite, yet as intuitive as a luxury concierge service.

---

## 2. Color Theory & Spatial Depth

The palette is rooted in a vibrant "Medical Green" (`primary`) and a deep "Teal-Blue" (`secondary`). However, the soul of the system lies in how we treat white space and surfaces.

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders are prohibited for sectioning or containment. 
Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` (#f3f4f5) section should sit directly on a `background` (#f8f9fa) to create a soft, sophisticated transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine medical-grade paper.
- **Base Layer:** `surface` (#f8f9fa)
- **Content Blocks:** `surface_container_low` (#f3f4f5)
- **Interactive Cards:** `surface_container_lowest` (#ffffff) to provide a "pop" of clean white against the grey base.
- **Emphasis Areas:** `surface_container_high` (#e7e8e9) for sidebars or secondary navigation.

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" feel:
- **Hero Elements:** Use subtle linear gradients transitioning from `primary` (#006b32) to `primary_container` (#008740) at a 135-degree angle. This adds "visual soul" and movement.
- **Floating Overlays:** Use Glassmorphism for modals and floating navigation. Apply `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur to allow brand colors to bleed through softly.

---

## 3. Typography: The Editorial Voice

We pair the geometric precision of **Manrope** with the clean legibility of **Noto Sans SC** (referenced as `inter` in the scale for technical alignment).

*   **Display & Headlines (Manrope):** Use `display-lg` (3.5rem) for hero statements. These should be set with tight letter-spacing (-0.02em) to feel authoritative and "editorial."
*   **Body Text (Noto Sans SC):** Use `body-md` (0.875rem) for the majority of clinical data. Ensure a line-height of 1.6 to maintain a high-end, readable feel.
*   **The Hierarchy of Trust:** Large `headline-lg` titles provide the "What," while secondary `label-md` elements in `secondary` (#096969) provide the technical "How."

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional drop shadows in favor of **Ambient Light.**

### The Layering Principle
Depth is achieved by "stacking" surface tiers. Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a soft, natural lift without the "dirty" look of standard shadows.

### Ambient Shadows
When a "floating" effect is mandatory (e.g., a primary CTA button or a floating action button):
- **Shadow:** Use `on_surface` (#191c1d) at 4% to 6% opacity.
- **Blur:** Large values (24px to 40px) with 0 offset. This mimics natural, diffuse surgical lighting.

### The "Ghost Border" Fallback
If a border is required for accessibility in input fields, use `outline_variant` (#bccabb) at **20% opacity**. Never use a 100% opaque border; it breaks the "clean clinical" aesthetic.

---

## 5. Components & Interaction Patterns

### Buttons (High-Contrast Precision)
- **Primary:** Background `primary` (#006b32), text `on_primary` (#ffffff). Shape: `DEFAULT` (8px). 
- **Secondary:** Background `secondary_container` (#a2f0ef), text `on_secondary_container` (#166f6f). No border.
- **Interactive State:** On hover, shift background to `primary_container` (#008740) and apply a subtle "Ambient Shadow."

### Input Fields (Clinical Cleanliness)
- **Style:** Use `surface_container_lowest` (#ffffff) with a 2px bottom-only accent in `outline_variant` (#bccabb). 
- **Focus State:** The bottom accent transitions to `primary` (#006b32) with a subtle `2px` glow.

### Medical Cards & Lists
- **The No-Divider Rule:** Forbid the use of horizontal divider lines. 
- **Separation:** Use `spacing-8` (2rem) of vertical white space or a subtle shift to `surface_container_low` to separate patient records or lab results.
- **Data Visualization:** Use `tertiary` (#465d81) for neutral data points and `secondary` (#096969) for specialized medical metrics to create professional depth.

### Context-Specific Component: "The Health Pulse"
A custom component for animal vitals. Use a `surface_container_lowest` card with a `6px` left-border (accent) using the `primary` color. Use `display-sm` for the value and `label-sm` for the unit, creating a clear, high-contrast data point.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use intentional asymmetry. Align text to the left and leave the right 30% of a container empty to create a premium "breathing" effect.
- **Do** use `primary_fixed_dim` (#5adf82) for success states and background accents to maintain the green brand identity without overwhelming the user.
- **Do** treat every page as a printed medical journal. Use a 12-column grid but allow imagery or hero text to break the grid occasionally.

### Don't:
- **Don’t** use 100% black. Use `on_surface` (#191c1d) for all "black" text to keep the interface feeling soft and sophisticated.
- **Don’t** use any roundedness above `xl` (1.5rem) or below `sm` (0.25rem). Our signature "moderate" roundness is `DEFAULT` (0.5rem/8px).
- **Don’t** use cartoonish icons. Use thin-stroke (1.5px) medical iconography in `on_surface_variant` (#3d4a3e).