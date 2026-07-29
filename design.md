# HiDevs Search Engine Design System & UI Guidance

## Context and Goals
The **HiDevs Search Engine** documentation site serves as the single source of truth for developers, platform architects, and design engineers. It defines implementation-ready, token-driven specifications optimized for consistency, WCAG 2.2 AA accessibility compliance, and instant page loading performance.

---

## Design Tokens and Foundations

### 1. Typography Foundations
All components must adhere strictly to standard typography scales. One-off font sizes or custom line-height values are prohibited.

- **Primary Family**: `Inter` (`font.family.primary`)
- **Font Stack**: `Inter, sans-serif` (`font.family.stack`)
- **Default Base Style**: `font.size.base = 12px`, `font.weight.base = 700`, `font.lineHeight.base = 16px`

#### Typography Scale
| Token | Font Size | Line Height | Recommended Usage |
| :--- | :--- | :--- | :--- |
| `font.size.xs` | `10px` | `12px` | Micro-badges, footnotes, metadata tags |
| `font.size.sm` | `11px` | `14px` | Helper texts, input labels, tooltips |
| `font.size.md` | `12px` | `16px` | Default body copy, table cell content |
| `font.size.lg` | `14px` | `20px` | Section sub-headers, button labels |
| `font.size.xl` | `16px` | `24px` | Card titles, modal headers |
| `font.size.2xl` | `18px` | `26px` | Section titles, H2 headings |
| `font.size.3xl` | `30px` | `36px` | Page hero titles, H1 headings |

---

### 2. Color Palette Tokens
All colors must reference semantic tokens. Hardcoding raw hex values in components is prohibited.

#### Text Tokens
- `color.text.primary`: `#374151` — Body copy, primary labels
- `color.text.secondary`: `#7c3aed` — Interactive links, active indicators
- `color.text.tertiary`: `#111827` — Headings, heavy emphasis labels
- `color.text.inverse`: `#ffffff` — Text on dark backgrounds / high contrast surfaces

#### Surface Tokens
- `color.surface.base`: `#000000` — Main viewport backdrop
- `color.surface.muted`: `#f8fafc` — Side panels, table headers, accordion grids
- `color.surface.raised`: `#059669` — Success statuses, primary badges

#### Border Tokens
- `color.border.default`: `#e5e7eb` — Standard separators, inactive input borders
- `color.border.muted`: `#f3f4f6` — Subtle dividers, list item borders
- `color.border.strong`: `#ddd6fe` — Active/focused boundaries, alert borders

---

### 3. Spacing Scale
Layouts and component padding must strictly align with standard steps:

| Token | Size Value | Pixel Value | Typical Application |
| :--- | :--- | :--- | :--- |
| `space.1` | `2px` | `2px` | Icon-to-text micro gaps |
| `space.2` | `6px` | `6px` | Button icon gaps, input label margins |
| `space.3` | `8px` | `8px` | Small button vertical padding, chip gaps |
| `space.4` | `10px` | `10px` | Input vertical padding |
| `space.5` | `12px` | `12px` | Button horizontal padding |
| `space.6` | `14px` | `14px` | Input horizontal padding, sidebar padding |
| `space.7` | `16px` | `16px` | Card padding, container gaps |
| `space.8` | `20px` | `20px` | Major section margins |

---

### 4. Radius, Shadow, and Motion Tokens

#### Border Radius Tokens
- `radius.xs`: `8px`
- `radius.sm`: `12px`
- `radius.md`: `16px`

#### Box Shadow Tokens
- `shadow.1`: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px`
- `shadow.2`: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`
- `shadow.3`: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(124, 58, 237, 0.2) 0px 4px 6px -1px, rgba(124, 58, 237, 0.2) 0px 2px 4px -2px`

#### Motion Tokens
- `motion.duration.instant`: `150ms` (`cubic-bezier(0.4, 0, 0.2, 1)`)

---

## Component-Level Specifications

### 1. Buttons (Density: 77 items)
- **Anatomy**: Text Label (Required), Left/Right Icon (Optional), Container.
- **Spacing**: Padding `space.3 space.5` (`8px 12px`). Gap: `space.2` (`6px`).
- **State Matrix**:
  - **Default**: Background `color.surface.muted`, Border `color.border.default`, Text `color.text.primary`.
  - **Hover**: Background lightens by 5%, Cursor `pointer`, Shadow `shadow.2`.
  - **Focus-Visible**: Border `color.border.strong`, Outline `2px solid color.text.secondary`, Outline Offset `2px`.
  - **Active**: Scale shifts down to `97%`, Transition `motion.duration.instant`.
  - **Disabled**: Background `color.border.muted`, Opacity `50%`, Cursor `not-allowed`, `pointer-events: none`.
  - **Loading**: Spinner replaces left icon. Text label remains visible at 40% opacity.
  - **Error**: Border `#ef4444`, Text `#b91c1c`, Background `#fef2f2`.
- **Keyboard, Pointer, and Touch**:
  - `Space` or `Enter` keys activate the button.
  - Touch hit target must be &ge; `44px x 44px`.

### 2. TextInput (Density: 3 items)
- **Anatomy**: Input Label (Required), Text Field, Helper Text / Error Message Container.
- **Spacing**: Padding `space.4 space.6` (`10px 14px`). Label bottom margin: `space.2` (`6px`).
- **State Matrix**:
  - **Default**: Background `color.surface.muted`, Border `color.border.default`.
  - **Hover**: Border `color.border.strong`.
  - **Focus-Visible**: Border `color.border.strong`, Shadow `shadow.3`, Outline `none`.
  - **Disabled**: Background `color.border.muted`, Text opacity 40%, Cursor `not-allowed`.
  - **Error**: Border `#ef4444`, Helper text color token `#b91c1c`.

### 3. Sidebar Navigation (Density: 1 item)
- **Anatomy**: Header Logo, Link Container, Active/Inactive Tab Indicators.
- **Spacing**: Width `w-64` (`256px`), Padding `space.6` (`14px`), Link Gap `space.2` (`6px`).
- **Responsive Behavior**: Collapses to bottom sheets or a drawer menu on screen widths below `1024px` (`lg` breakpoint).
- **Content Overflow**: Navigation text truncates with ellipsis (`text-overflow: ellipsis`) and shows full title on hover/focus.

---

## Accessibility Requirements (WCAG 2.2 AA)

1. **Contrast Ratio**:
   - Normal text (`font.size.base`) maintains minimum contrast ratio of `4.5:1` against surface.
   - Large text (`font.size.2xl` and above) maintains minimum contrast ratio of `3.0:1`.
2. **Focus Indicators**:
   - Visible persistent focus ring on all interactive elements. `outline: none` without custom focus-visible ring is prohibited.
3. **Semantic Landmarks**:
   - Navigation container uses `<nav aria-label="Sidebar Navigation">`.
   - Main workspace container uses `<main>`.

---

## Content and Tone Standards

- **Tone**: Implementation-focused, concise, confident. Use active voice and imperative mood.
- **Standard Example (Pass)**:
  > "Configure the `color.surface.base` token in your layout module to set the background canvas."
- **Non-Standard Example (Fail)**:
  > "Maybe you could try using a different color hex code to fix layout aesthetics."

---

## Anti-Patterns
- **No Inline Styles**: Hardcoded non-token hex colors or arbitrary margins are prohibited.
- **No Unlabeled Icons**: Icon-only buttons must provide an `aria-label` or screen-reader description.
- **No Focus Neglect**: Never disable browser focus outlines without substituting focus-visible indicators.

---

## QA Checklist
- [ ] Every color references a semantic token from the palette.
- [ ] All spacing values correspond to `space.1` through `space.8`.
- [ ] Touch hit targets for interactive elements are &ge; `44px x 44px`.
- [ ] Contrast ratio is verified using WCAG 2.2 AA verification tooling.
- [ ] Keyboard navigation is verified using `Tab`, `Shift+Tab`, `Space`, and `Enter` keys.
