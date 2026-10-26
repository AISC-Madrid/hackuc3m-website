---
name: HackUC3M
description: A restrained, precise hackathon interface in the original HackUC3M palette.
colors:
  paper: "#140f16"
  surface: "#1c141e"
  raised: "#251b28"
  ink: "#f9f4e9"
  muted: "#ad9eac"
  line: "#342637"
  plum: "#9f2576"
  rose: "#e34f87"
  sky: "#99bfcd"
typography:
  display:
    fontFamily: "Cinzel, serif"
    fontSize: "clamp(2.6rem, 5.3vw, 4.8rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 2.8rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "16px"
    lineHeight: 1.75
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "12px"
rounded:
  input: "6px"
  header-action: "8px"
  button: "9px"
  panel: "12px"
spacing:
  control-gap: "12px"
  panel-padding: "30px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "#fff4ed"
    rounded: "{rounded.button}"
    padding: "15px 23px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "#b43186"
  button-secondary:
    backgroundColor: "#251a28"
    textColor: "#e4d5e2"
    rounded: "{rounded.button}"
    padding: "15px 23px"
  input:
    backgroundColor: "#160f19"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    padding: "11px 12px"
  signup-panel:
    backgroundColor: "#201623"
    rounded: "{rounded.panel}"
    padding: "30px"
---

# Design System: HackUC3M

## Overview

**Creative North Star: "HackUC3M, precisely expressed"**

A precise, restrained dark interface carries HackUC3M’s original plum, rose and cream identity. Thin dividers, generous breathing room and small functional details establish a Linear-like clarity; the Cinzel hero wordmark supplies the distinct brand voice.

Motion is quiet and local: the hero title settles once and a diffuse plum light breathes behind it. The navigation symbol is the supplied cropped mark, without lettering; the rejected floating hero emblem is absent.

**Key Characteristics:**

- Dark aubergine tonal surfaces with selective brand accents.
- Geist for the interface; Cinzel reserved for the hero brand.
- Fine borders, calm spacing and smooth interactive states.

## Colors

The original brand accents sit within a warm, dark aubergine environment. Frontmatter contains the normative values.

### Primary

- **HackUC3M Plum:** primary actions and diffuse hero light.
- **HackUC3M Rose:** hero year, footer year and consent selection.

### Secondary

- **Sky:** event icons and small availability dots.

### Neutral

- **Paper:** page background.
- **Surface / Raised:** tonal layers for supporting UI.
- **Ink:** cream primary text.
- **Muted:** secondary copy.
- **Line:** quiet section and component boundaries.

## Typography

Geist is the interface family; Cinzel is reserved for the hero brand. Headlines use medium weight and tight tracking. Body copy is relaxed, while navigation, metadata and form labels are compact.

The hero display scales down to `clamp(2rem, 8.5vw, 3.5rem)` on mobile. Introductory copy uses the body role; smaller supporting paragraphs range from 12–14px. Hero description is 16px desktop and 14px mobile. Buttons use 14px text. Mobile form inputs use 16px to support comfortable entry.

**The Single Display Voice Rule.** Use Cinzel only for the hero brand; the rest of the interface speaks in Geist.

## Layout

A centered container caps at 1100px. Desktop gutters are 40px, decreasing to 28px at 900px and 20px at 650px. Sections use 96px vertical space, then 76px and 62px at those breakpoints. Supporting sections pair headings and content in two columns, collapsing to one below 650px.

The header remains an understated horizontal row. Its symbol is 64px desktop and 58px mobile; navigation links disappear on mobile while the pre-registration action remains. Hero actions stack on mobile within a 290px column. Event metadata becomes a centered vertical strip. The hero has no floating emblem.

## Elevation & Depth

Depth comes mainly from aubergine tonal layering and one-pixel borders. The primary button alone has a small dark shadow (`0 3px 12px #09040d40`). The hero’s broad, low-opacity plum radial light is atmospheric, not an object or card. Avoid large floating surfaces and heavy shadows.

## Shapes

Controls have gentle corners: inputs, header actions, buttons and panels use the frontmatter radii. Dividers and content rows stay square and flat. Icons are small, thin-stroked outlines. Availability indicators are tiny circular dots.

## Components

- **Primary action:** plum fill, pale text, fine brighter plum border and a small shadow. Hover brightens to a warmer plum. Main actions have a 52px minimum height and render around 53px with current line metrics; header actions have a 44px minimum.
- **Secondary action:** dark plum fill, restrained plum stroke and light lavender text. Hover lightens the fill and border.
- **Navigation:** compact muted links with a left-to-right thin rose underline on hover or keyboard focus. Color and underline transition over 280ms.
- **Inputs:** recessed dark fill, muted plum border, persistent labels and clear placeholders. Focus changes the border and retains the shared visible outline. Consent uses a rose checkbox. Pending submission dims the button; errors retain text, and success replaces the form with a status panel.
- **Panels and rows:** the signup panel uses a thin plum border and rounded corners. Challenge announcements use a subtle tonal gradient; FAQ uses native disclosure rows separated by fine rules.
- **Motion:** button and header hover states transition over 280ms. The hero title settles from an 8px downward offset and 5px blur over 900ms; the ambient light breathes over 12 seconds. Reduced-motion preferences disable animation, transitions and smooth scrolling.

## Do's and Don'ts

### Do:

- Do preserve the supplied HackUC3M symbol and original brand palette.
- Do keep Cinzel confined to the hero brand and use Geist for interface text.
- Do retain visible keyboard focus and disable motion for reduced-motion preferences.

### Don't:

- Don’t restore the floating hero emblem or poster treatment.
- Don’t turn the restrained interface into a field of decorative cards or accent fills.
- Don’t communicate success or errors through color alone.
