---
name: design-system-docs
description: Create or update design system documentation, structure, and reusable specs for web products. Use when Codex needs to draft or refine a design-system.md, foundations/tokens docs, component specs, pattern/template docs, accessibility or content standards, governance/lifecycle rules, or repository structure for a design system.
---

# Design System Docs

Use this skill to produce practical design system documentation that design, engineering, QA, and content teams can use as a shared source of truth.

## Quick start

- Determine whether the request is for a full system doc, a component spec, a pattern/template doc, or governance/adoption material.
- Default to mature public-system structure instead of inventing a custom outline.
- Keep core reusable system assets separate from product-specific recipes and one-off modules.
- Write complete, production-ready prose unless the user explicitly asks for a blank template.

## Workflow

### 1. Identify the output type

- Create or update `design-system.md` for a source-of-truth system spec.
- Create a component page for a reusable UI object such as `button.md` or `input.md`.
- Create a pattern page for a recurring user task such as sign-in, form validation, or checkout.
- Create a template page for page-level structure such as dashboard, settings, or landing page.
- Update governance, lifecycle, release, adoption, or metrics docs when the request is about operating the system.

### 2. Use the canonical structure

- Start from this order unless the user asks for a narrower deliverable:
  `overview/scope -> principles -> foundations -> tokens -> primitives/utilities -> components -> patterns/templates/recipes -> content -> accessibility -> code assets/tooling -> docs/repository -> governance/lifecycle/releases -> adoption/support/metrics`
- Read [references/design-system-template.md](references/design-system-template.md) when writing a full `design-system.md`.
- Read [references/design-system-common-elements.md](references/design-system-common-elements.md) when you need to justify the structure, trim the outline, or separate core system assets from one-off product work.

### 3. Model the system as layers

- Treat the system as `foundations -> tokens -> primitives/utilities -> components -> patterns/templates`.
- Use stable, role-based naming: base tokens, semantic tokens, component tokens.
- Prefer function-based names over appearance-based names.
- Map component tokens back to semantic tokens whenever possible.

### 4. Write docs at production quality

- Show realistic copy, edge cases, long content, error states, empty states, loading states, and responsive behavior.
- Treat accessibility as part of the main spec, not as an appendix.
- Include code-facing details when relevant: tokens, props/API, theming hooks, implementation notes, test expectations, and release status.

## Required guidance by deliverable

### Full design system doc

- Cover why the system exists, who uses it, what is in scope, and what is excluded.
- Define foundations: color, typography, spacing, sizing, layout/grid, breakpoints, border/radius, elevation/shadow, opacity, motion, iconography, imagery, z-index, and themes.
- Define token architecture, naming rules, component categories, pattern rules, templates, content standards, accessibility baseline, documentation standards, code/tooling expectations, governance, lifecycle, adoption, and metrics.

### Component spec

- Include: overview, purpose, when to use, when not to use, anatomy, variants, sizes, states, behavior, content guidance, accessibility, tokens used, code API, examples, do/don't, and related items.
- Document keyboard behavior, focus behavior, ARIA notes, contrast considerations, and responsive rules.
- Show realistic examples, not only ideal/default states.

### Pattern or template doc

- Frame the document around a user task or page goal, not just layout.
- Define prerequisite components, content guidance, accessibility concerns, edge cases, and realistic examples.
- Keep highly product-specific combinations out of the core system unless the user explicitly wants a recipe layer.

## Decision rules

- Put only repeated, reusable solutions in the core design system.
- Keep one-off campaigns, unstable experiments, and product-specific compositions outside the core unless the user explicitly wants them documented as recipes.
- Treat governance, release phases, and adoption as first-class parts of the system.
- Default to web-first language unless the user names another platform.

## Output conventions

- Use kebab-case file names.
- Prefer explicit section headings and flat lists.
- If the user wants a copy-paste-ready doc, avoid filler placeholders.
- If the user wants a starter template, keep placeholders short and obvious.

## References

- `references/design-system-template.md`
  Use for a copy-paste-ready full `design-system.md`.
- `references/design-system-common-elements.md`
  Use for mature-system common denominators, scope boundaries, and structural rationale.
