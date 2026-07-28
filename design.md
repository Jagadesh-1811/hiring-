# HiDevs Search Engine Design System & UI Guidance

## Context and Goals
The **HiDevs Search Engine** documentation site must serve as the single source of truth for developers, platform architects, and design engineers. The goal is to provide implementation-ready, token-driven specifications optimized for consistency, WCAG 2.2 AA accessibility compliance, and instant page loading performance.

---

## Design Tokens and Foundations

### 1. Typography Foundations
All components must adhere to the standardized typography scales. One-off font sizes or custom line-height values are strictly prohibited.
- **Main Font**: `font.family.primary = Inter`, `font.family.stack = Inter, sans-serif`
- **Default Base Styles**: `font.size.base = 12px`, `font.weight.base = 700`, `font.lineHeight.base = 16px`
- **Typography Scale**:
  - `font.size.xs = 10px` (Line height: 12px)
  - `font.size.sm = 11px` (Line height: 14px)
  - `font.size.md = 12px` (Line height: 16px)
  - `font.size.lg = 14px` (Line height: 20px)
  - `font.size.xl = 16px` (Line height: 24px)
  - `font.size.2xl = 18px` (Line height: 26px)
  - `font.size.3xl = 30px` (Line height: 36px)

### 2. Color Palette Tokens
All colors must be referenced using the following semantic tokens. Hardcoding raw hex values in components is strictly prohibited.
- **Text Tokens**:
  - `color.text.primary = #374151` (Body copy, primary labels)
  - `color.text.secondary = #7c3aed` (Interactive links, active indicators)
  - `color.text.tertiary = #111827` (Headings, heavy emphasis labels)
  - `color.text.inverse = #ffffff` (Text on dark backgrounds)
- **Surface Tokens**:
  - `color.surface.base = #000000` (Main viewport backdrop)
  - `color.surface.muted = #f8fafc` (Side panels, table headers, accordion grids)
  - `color.surface.raised = #059669` (Success statuses, primary badges)
- **Border Tokens**:
  - `color.border.default = #e5e7eb` (Standard separators, inactive inputs)
  - `color.border.muted = #f3f4f6` (Subtle dividers, list borders)
  - `color.border.strong = #ddd6fe` (Active/focused boundaries, alert borders)

### 3. Spacing Scale
Layouts must use standard steps from the spacing scale.
- `space.1 = 2px`
- `space.2 = 6px`
- `space.3 = 8px`
- `space.4 = 10px`
- `space.5 = 12px`
- `space.6 = 14px`
- `space.7 = 16px`
- `space.8 = 20px`

### 4. Radius, Shadow, and Motion Tokens
- **Border Radius**:
  - `radius.xs = 8px`
  - `radius.sm = 12px`
  - `radius.md = 16px`
- **Box Shadows**:
  - `shadow.1 = rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px`
  - `shadow.2 = rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`
  - `shadow.3 = rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(124, 58, 237, 0.2) 0px 4px 6px -1px, rgba(124, 58, 237, 0.2) 0px 2px 4px -2px`
- **Motion Durations**:
  - `motion.duration.instant = 150ms` (Global transition curve: `cubic-bezier(0.4, 0, 0.2, 1)`)

---

## Component-Level Rules

### 1. Buttons (Expected Density: 77 items)
*   **Anatomy**: Text Label (Required), Left/Right Icon (Optional), Container.
*   **Spacing**: Padding: `space.3 space.5`. Gap between icon and label: `space.2`.
*   **State Matrix**:
    *   **Default**: `color.surface.muted`, Border: `color.border.default`, Text: `color.text.primary`.
    *   **Hover**: Background lightens by 5%, Cursor: `pointer`, shadow: `shadow.2`.
    *   **Focus-Visible**: Border: `color.border.strong`, Outline: `2px solid color.text.secondary`, Outline Offset: `2px`.
    *   **Active**: Background scale shifts down to `97%` scale, transition: `motion.duration.instant`.
    *   **Disabled**: Background: `color.border.muted`, Opacity: `50%`, Cursor: `not-allowed`, Pointer Events: `none`.
    *   **Loading**: Spinner replaces left icon. Text label remains visible but text color opacity shifts to 40%.
    *   **Error**: Border: `#ef4444`, Text: `#b91c1c`, Background: `#fef2f2`.
*   **Keyboard, Pointer, and Touch**:
    *   `Space` or `Enter` keys must activate the button.
    *   Pointer hover must trigger hover transitions instantly.
    *   Touch hit targets must be at least `44px x 44px`.

### 2. TextInput (Expected Density: 3 items)
*   **Anatomy**: Input Label (Required), Text Field, Helper Text / Error Message Container.
*   **Spacing**: Padding: `space.4 space.6`, Margin Bottom (label to input): `space.2`.
*   **State Matrix**:
    *   **Default**: Background: `color.surface.muted`, Border: `color.border.default`.
    *   **Hover**: Border: `color.border.strong`.
    *   **Focus-Visible**: Border: `color.border.strong`, shadow: `shadow.3`, outline: `none`.
    *   **Disabled**: Background: `color.border.muted`, Text Color: Opacity 40%, cursor: `not-allowed`.
    *   **Error**: Border: `#ef4444`, Helper text renders with color token `#b91c1c`.

### 3. Sidebar Navigation (Expected Density: 1 item)
*   **Anatomy**: Header Logo, Link Container, Active/Inactive Tab Indicators.
*   **Spacing**: Width: `w-64`, Padding: `space.6`, Link Gap: `space.2`.
*   **Responsive Behavior**: Collapses to bottom sheets or a drawer menu on screen widths below `1024px` (`lg` tailwind breakpoint).
*   **Content Overflow**: Long navigation names must truncate with ellipses (`text-overflow: ellipsis`) and display full text on hover/focus.

---

## Accessibility Requirements (WCAG 2.2 AA)

1.  **Contrast Constraints**:
    *   Normal text (`font.size.base`) must maintain a minimum contrast ratio of `4.5:1` against its background surface.
    *   Large text (`font.size.2xl` and above) must maintain a minimum contrast ratio of `3.0:1`.
2.  **Focus Indicator**:
    *   A persistent, visible focus ring must render on all interactive elements. Removing the focus ring using CSS rules like `outline: none` without providing a distinct custom focus style is strictly prohibited.
3.  **ARIA Landmark Regions**:
    *   The sidebar navigation container must use the semantic `<nav>` tag with an `aria-label="Sidebar Navigation"`.
    *   The main content area must use `<main>`.

---

## Content and Tone Standards

*   **Tone**: Implementation-focused, concise, confident. Use active voice and imperative mood.
*   **Standard Example (Pass)**:
    > "Configure the `color.surface.base` token in your layout module to set the background canvas."
*   **Non-Standard Example (Fail)**:
    > "Maybe you could try using a different color hex code to fix layout aesthetics."

---

## Anti-Patterns
- **No Inline Styles**: Using custom, non-token hex colors or ad-hoc margins is strictly prohibited.
- **No Unlabeled Icons**: Button actions with only icons must provide an `aria-label` or description.
- **No Focus Neglect**: Do not hide default browser outlines without replacing them with focus-visible indicators.

---

## QA Checklist
- [ ] Every color references a semantic token from the color palette.
- [ ] All spacing steps correspond to `space.1` through `space.8`.
- [ ] Touch hit targets for interactive elements are &ge; `44px`.
- [ ] Contrast ratio is verified using WCAG 2.2 AA verification tooling.
- [ ] Keyboard navigation is verified using only the `Tab` and `Enter` key inputs.
