---
name: The Builder's Atlas
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daed'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#e1e8fb'
  surface-container-highest: '#dce2f5'
  on-surface: '#151c29'
  on-surface-variant: '#504534'
  inverse-surface: '#29303f'
  inverse-on-surface: '#ecf0ff'
  outline: '#827562'
  outline-variant: '#d4c4ae'
  surface-tint: '#7c5800'
  primary: '#7c5800'
  on-primary: '#ffffff'
  primary-container: '#f6b832'
  on-primary-container: '#694a00'
  inverse-primary: '#fbbc36'
  secondary: '#006971'
  on-secondary: '#ffffff'
  secondary-container: '#92eef9'
  on-secondary-container: '#006d76'
  tertiary: '#b02d26'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffaea4'
  on-tertiary-container: '#9b1e19'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea6'
  primary-fixed-dim: '#fbbc36'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#95f1fc'
  secondary-fixed-dim: '#78d5df'
  on-secondary-fixed: '#002023'
  on-secondary-fixed-variant: '#004f55'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4aa'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#8e1311'
  background: '#f9f9ff'
  on-background: '#151c29'
  surface-variant: '#dce2f5'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-craft fusion between a tactile, isometric fantasy cartography and a rigorous, high-credibility engineering portfolio. It rejects sterile corporate minimalism in favor of an exploratory, game-inspired interface that retains professional structure and crisp architectural rhythm.

The personality is adventurous, master-crafted, tactile, and intellectually curious. It speaks to engineering leaders, visionary founders, and elite product teams who value playful ingenuity backed by deep technical competence. The emotional goal is delight and immersion: visitors do not simply read a resumé; they traverse an expedition log across territories of technical craft.

### Visual Style
- **Tactile Neo-Cartography / Neo-Brutalism**: Clean, structured interfaces reinforced with solid ink borders, flat offset hard shadows (`#202735`), and printed-paper textures.
- **Micro-Isometric Tropes**: Regional discovery pins, compass indices, blueprint grid underlays, and physical badge metaphors.
- **Physicality & Weight**: Interactive elements behave like tangible paperboard tokens and enamel expedition pins, pressing downward onto their shadow offsets upon interaction.

## Colors

The palette balances warm organic parchment tones with maritime expedition pigments and game-interface accents.

### Color Roles & Semantics
- **Canvas & Primary Surfaces (`#FFF5E6`)**: Warm Cream. Acts as the base paperboard surface for all standard screens, cards, and modal sheets.
- **Ink & Outlines (`#202735`)**: Deep Ink. Used for structural 2px/3px borders, high-contrast headings, hard drop-shadows, and critical micro-copy. Never use pure `#000000`.
- **Primary Action (`#F6B832`)**: Mustard Yellow. High-energy trigger reserved strictly for primary interactive states, quest CTA buttons, active exploration milestones, and primary badges.
- **Map & Regional Terrain (`#2C929C`)**: Vibrant Bright Teal. Used for interactive map biomes, navigational capsules, active territory highlights, and high-energy secondary containers.
- **Deep Chapter Background (`#123F49`)**: Rich Deep Teal. An inverted dark canvas tier used for deep dive technical chapters, nocturnal game views, terminal overlays, and footer realms. When using this background, text shifts to `#FFF5E6` and border accents remain `#202735` or light teal.
- **Critical Micro-Accents (`#EF5B4E`)**: Coral Red. Applied sparingly for active coordinates, live status pings, quest markers, danger tags, and critical tooltips.
- **Subdued Structural Neutral (`#85858A`)**: Slate Grey. Strictly for non-interactive grid lines, muted metadata, and secondary monospaced coordinate keys.

## Typography

The typographic hierarchy juxtaposes brutalist geometric display weights with ultra-readable humanist running copy and technical cartographic monospaced annotations.

- **Headlines & Milestones (`Space Grotesk`)**: Confident, mechanical, and impactful. Tight tracking creates punchy banners reminiscent of classic game titles and engineering blueprints.
- **Narrative & Case Studies (`Plus Jakarta Sans`)**: Provides welcoming, humanistic clarity for long-form case study reading, project narratives, and contextual descriptions.
- **Atlas Metadata & Coordinates (`JetBrains Mono`)**: Strict, utilitarian, and technical. Rendered in uppercase with generous tracking to emulate survey equipment readouts, commit logs, chapter numbers, and coordinate systems.

## Layout & Spacing

The layout is structured around an architectural 12-column grid system with fixed gutters, layered over a subtle 16px isometric dot-matrix coordinate grid that anchors floating game-world elements.

### Breakpoints & Adaptability
- **Desktop (1200px+)**: 12 columns, 2.5rem outer canvas margins, 1.5rem gutters. Accommodates split exploration panels (interactive map region on one side, modular case cards on the other).
- **Tablet (768px – 1199px)**: 8 columns, 2rem margins, 1rem gutters. Side navigation condenses into floating pill capsules docked at the bottom center.
- **Mobile (< 768px)**: 4 columns, 1rem margins, 1rem gutters. Isometric canvases switch to horizontally scrollable expedition zones or tap-to-focus overview cards.

### Spacing Rhythm
Vertical cadence relies strictly on dynamic multiples of 8px. Component containers use internal padding matching `space-md` or `space-lg`, ensuring borders and shadows never cause typographic crowding.

## Elevation & Depth

This system avoids soft, blurred, or ambient shadows entirely. Visual depth is strictly tactile and mechanical, achieved through solid ink offset planes and hard strokes.

### The Offset Elevation Scale
- **Flat Surface (Level 0)**: 2px border `#202735`, no shadow. Used for embedded input fields, background coordinate panels, and inactive grid cells.
- **Resting Container (Level 1)**: 2px border `#202735`, solid hard drop-shadow `3px 3px 0px #202735`. Used for standard content cards, badges, and chips.
- **Interactive Trigger / Island (Level 2)**: 2.5px or 3px border `#202735`, solid hard drop-shadow `4px 4px 0px #202735`. Used for primary CTA buttons, floating navigation capsules, and highlighted case cards.
- **Active / Pressed State (Level 0)**: Upon hover or active focus, elements translate `+3px, +3px` (or `+4px, +4px`) along the X/Y axes while their shadow collapses to `0px 0px 0px #202735`, creating an authentic mechanical button-click feel.
- **Overlay & Modal Pin (Level 3)**: 3px border `#202735`, solid hard drop-shadow `6px 6px 0px #202735`. Used for region inspectors, dialogue prompts, and floating detail panels.

## Shapes

The shape hierarchy combines playful rounded tokens with pill capsules to soften the aggressive edge of brutalist drop-shadows.

- **Standard Cards & Modules (`rounded-md` / 0.5rem)**: Applied to all cards, dialogue frames, and structural containers to maintain structured architectural discipline.
- **Floating Controls & Action Buttons (`rounded-lg` / 1rem to Pill-shaped)**: Used for buttons, chips, and navigational capsules.
- **Isometric Pins & Mini Tokens**: Diamond coordinates and 45-degree angled badges for milestone tags and status flags, balancing curves with game-cartography sharpness.

## Components

### Buttons
- **Primary Quest Button**: Mustard Yellow (`#F6B832`) background, 2.5px Deep Ink (`#202735`) border, `4px 4px 0 #202735` shadow. `Space Grotesk` bold text in `#202735`. Hover/press translates down-right by 4px with zeroed shadow.
- **Secondary Scout Button**: Warm Cream (`#FFF5E6`) background, 2px `#202735` border, `3px 3px 0 #202735` shadow. Hover reveals Vibrant Teal (`#2C929C`) background tint.
- **Danger / Reset Button**: Coral Red (`#EF5B4E`) background, 2px `#202735` border, white or `#202735` text, `3px 3px 0 #202735` shadow.

### Navigation Pill Capsules
- Floating navigation components styled as dual-ended capsules (`border-radius: 9999px`), 2px Deep Ink borders, with a `#FFF5E6` or `#123F49` fill. Active states within the capsule use `#F6B832` pill fills with individual 2px borders.

### Cards & Project Artifacts
- Built with a `#FFF5E6` surface, enclosed in a 2px `#202735` outline, sitting over a `4px 4px 0 #202735` shadow. 
- Top headers feature a distinct metadata bar separated by a 2px horizontal rule, displaying monospaced coordinates (`JetBrains Mono`, e.g., `LOC: 0x7A // REGION: CORE_ENGINE`) along with a Coral Red (`#EF5B4E`) activity indicator dot.

### Chips & Badges
- **Skill & Stack Badges**: Pill-shaped or soft-cornered (`rounded-md`), 1.5px `#202735` stroke, `2px 2px 0 #202735` shadow. Monospaced uppercase text. Background defaults to `#FFF5E6`; category highlights utilize `#2C929C` or `#F6B832`.

### Form Fields & Inputs
- Warm Cream background inset, 2px `#202735` border, with an inner flat shadow simulation (`inset 2px 2px 0 #202735` at 10% opacity) or flat zero-offset state. Focus state: border color changes to `#2C929C` with a solid `2px 2px 0 #202735` drop shadow.

### Checkboxes & Radios
- **Checkbox**: Square (`rounded-sm`), 2px `#202735` border, `#FFF5E6` fill. Checked state fills with `#F6B832` featuring a heavy `#202735` checkmark icon.
- **Radio**: Perfect circle, 2px `#202735` border. Checked state fills with an internal `#EF5B4E` or `#202735` bullseye dot.

### Isometric Map Pins & Waypoints
- Custom UI pins composed of a circular avatar or diamond frame, 2px `#202735` border, floating with an animated hover cycle over a decoupled oval drop-shadow ground mark.