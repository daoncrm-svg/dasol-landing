# Design System Template

Use this as the default shape for a copy-paste-ready `design-system.md`. Replace placeholders with product-specific details when they are known.

# DESIGN SYSTEM

Version: 1.0.0  
Status: Working Draft  
Owner: Design System Team  
Last Updated: YYYY-MM-DD

---

## 0. What this document is

Define the shared visual language, reusable UI rules, component standards, accessibility baseline, and governance process for the product ecosystem.

Treat the design system as the combination of:

- design principles
- visual foundations
- design tokens
- primitives and utilities
- reusable components
- patterns and templates
- accessibility standards
- content rules
- code implementation rules
- documentation
- governance and release process

## 1. Goals

### 1.1 Primary goals

- create consistency across products and pages
- reduce design and development rework
- improve usability and accessibility
- speed up implementation with reusable assets
- make design decisions explicit and scalable

### 1.2 Secondary goals

- support theming and future product expansion
- improve handoff quality between design and engineering
- reduce visual drift over time
- standardize content and interaction behavior

### 1.3 Non-goals

- one-off campaign visuals
- dumping every historical component into the system
- full product strategy
- unstable experiments without explicit status

## 2. Principles

Use concise decision principles such as:

- clarity over decoration
- consistency over novelty
- accessibility by default
- performance-aware design
- content-first design
- composability
- human readability

## 3. Scope

### 3.1 In scope

- web products
- responsive marketing pages
- responsive application UI
- Figma libraries
- front-end component implementation
- design tokens and theming
- interaction, accessibility, and content guidance

### 3.2 Out of scope

- print design
- 3D assets
- motion graphics for brand campaigns
- product-specific experiments unless formally adopted

## 4. Users of the system

### 4.1 Primary users

- product designers
- brand/web designers
- front-end engineers
- design engineers
- QA
- content designers

### 4.2 Secondary users

- product managers
- marketing teams
- external partners
- agencies
- new hires

## 5. Taxonomy and naming

### 5.1 Naming principles

- use plain language
- prefer function over appearance
- avoid names like `blue-button-2`
- separate global, semantic, and component token names
- keep names stable even when values change

### 5.2 Naming layers

- base tokens: raw values such as `color.blue.500`, `space.16`
- semantic tokens: meaning-based aliases such as `color.text.default`
- component tokens: local component decisions such as `button.primary.bg.default`

### 5.3 Component naming

Use a stable pattern such as:
`category / component / variant / size / state`

### 5.4 File naming

Use kebab-case for files.

## 6. Foundations

Document the system-level rules that everything else builds on.

### 6.1 Color

Include:

- brand, secondary, neutral, success, warning, error, info, overlay, focus, disabled groups
- semantic roles such as `text.default`, `bg.surface`, `border.default`, `link.default`, `focus.ring`
- approved contrast pairs
- light and dark theme tokens

Rules:

- never communicate UI meaning only by hue
- keep focus styles visible on every relevant surface
- do not let brand colors replace semantic meanings

### 6.2 Typography

Define:

- font families by role
- font sizes, weights, line heights, letter spacing
- text roles such as display, heading, body, label, caption, code
- responsive typography mapping

Rules:

- define text styles by role, not by page
- keep body sizes limited and predictable
- use tokenized line heights

### 6.3 Spacing

Define a stable spacing scale and usage categories:

- component-internal spacing
- stack spacing
- inline spacing
- section spacing
- page gutter
- container padding

### 6.4 Sizing

Include tokens for:

- control heights
- icon sizes
- avatar sizes
- input sizes
- button sizes
- container widths
- minimum target sizes

### 6.5 Layout and grid

Define:

- page max width
- content width
- app shell behavior
- column count
- gutters and margins
- breakpoint system
- responsive collapse rules

### 6.6 Border and radius

Include:

- border widths
- divider widths
- radius tokens
- pill radius
- full radius if used

### 6.7 Elevation and shadow

Define a small number of stable elevation levels and backdrop tokens.

### 6.8 Opacity

Document usage for disabled states, overlays, loading states, and subtle emphasis changes.

### 6.9 Motion

Define:

- duration tokens
- easing tokens
- hover, focus, expand/collapse, reveal, modal, loading categories

Rules:

- motion must be purposeful
- support reduced motion
- avoid expensive decorative effects

### 6.10 Iconography

Define one icon family, size tokens, styling rules, and icon-only accessibility guidance.

### 6.11 Imagery and illustration

Define photography style, screenshot treatment, illustration style, aspect ratios, corner radius, and crop rules.

### 6.12 Z-index

Use named layers such as:

- base
- sticky
- dropdown
- popover
- overlay
- modal
- toast
- tooltip

## 7. Design tokens

### 7.1 Token architecture

- base tokens
- semantic tokens
- component tokens

### 7.2 Token principles

- portable
- meaning-based naming
- semantic tokens absorb theme changes
- component tokens map back to semantics

### 7.3 Token categories

- color
- spacing
- sizing
- radius
- border width
- shadow
- opacity
- typography
- motion
- z-index
- breakpoints

### 7.4 Theme support

List supported modes such as:

- light
- dark
- high contrast
- partner theme

### 7.5 Token examples

```json
{
  "color": {
    "blue": {
      "500": { "value": "#2563EB" }
    },
    "text": {
      "default": { "value": "{color.neutral.900}" },
      "muted": { "value": "{color.neutral.600}" }
    }
  }
}
```

```css
:root {
  --color-text-default: #111827;
  --color-bg-surface: #ffffff;
  --space-8: 8px;
  --radius-md: 8px;
}
```

## 8. Accessibility baseline

Apply accessibility requirements across foundations, components, patterns, and content.

### 8.1 Minimum expectations

- keyboard-accessible interactive elements
- visible focus states
- meaningful labels
- appropriate semantics
- sufficient contrast
- screen reader support
- reduced motion support
- clear error recovery guidance
- responsive reflow support

### 8.2 Required accessibility content in docs

For each component or pattern, include:

- keyboard behavior
- focus behavior
- screen reader notes
- ARIA guidance when needed
- error state behavior
- motion considerations

### 8.3 Governance rule

No component reaches stable status without accessibility review.

## 9. Content system

Include UI writing guidance for:

- button labels
- field labels
- helper text
- placeholders
- errors
- empty states
- success and warning messages
- confirmations
- system notices

Rules:

- explain what went wrong
- explain how to recover
- avoid blameful language
- provide next actions where possible

## 10. Primitives and utilities

List the low-level building blocks, for example:

- Box
- Stack
- Inline
- Cluster
- Grid
- Container
- Divider
- Text
- Heading
- Icon
- VisuallyHidden

Rules:

- composable
- token-backed
- small and predictable
- no business logic

## 11. Components

Group reusable UI objects by category.

### 11.1 Typical categories

- actions: button, icon button, link
- forms: input, textarea, select, combobox, checkbox, radio, switch, date picker, file upload
- navigation: tabs, breadcrumb, menu, pagination, side nav, top nav
- feedback: alert, banner, toast, progress, spinner, skeleton, empty state
- overlays: dialog, modal, drawer, tooltip, popover
- data/content: table, card, list, badge, tag, chip, avatar, metric, accordion

### 11.2 Component maturity

Use explicit lifecycle labels such as:

- Experimental
- Alpha
- Beta
- Stable
- Deprecated
- Removed

## 12. Component specification template

Every component page should include:

- overview: name, status, owner, last updated, definition
- purpose: problem solved and why it exists
- when to use
- when not to use
- anatomy
- variants
- sizes
- states
- behavior
- content guidance
- accessibility
- design tokens used
- code API
- examples
- do/don't guidance
- related components and patterns

## 13. Patterns

Define reusable task-level solutions such as:

- sign in / sign up
- forgot password
- form validation
- multi-step form
- filtering and sorting
- search results
- checkout or payment flow
- onboarding
- settings management
- upload flow

Each pattern doc should cover:

- goal
- user task
- when to use
- when not to use
- prerequisite components
- layout guidance
- behavior guidance
- accessibility guidance
- content guidance
- edge cases
- examples

## 14. Templates

Define page-level arrangements such as:

- landing page
- pricing page
- dashboard page
- settings page
- account page
- list/detail page
- search page
- auth page

For each template, include:

- purpose
- content regions
- required patterns
- optional modules
- responsive behavior
- accessibility concerns
- content constraints

## 15. Documentation

The system documentation should be living, searchable, example-led, versioned, and easy to scan.

Recommended sections:

- overview
- principles
- foundations
- tokens
- primitives
- components
- patterns
- templates
- accessibility
- content
- contribution
- release notes
- FAQ
- support/contact

## 16. Design library structure

Recommended split:

- foundations library
- components library
- pattern library when needed
- product-specific libraries only when necessary

## 17. Code implementation

Required assets usually include:

- token source files
- token transforms
- CSS variables or platform equivalents
- component library
- documentation site or Storybook
- tests
- accessibility helpers
- linting or validation rules

Implementation goals:

- parity with design
- stable API
- accessible defaults
- theme support
- composability
- clear upgrade paths

## 18. Tooling

Track the actual tooling categories in use:

- design tool
- token management
- package registry
- documentation system
- visual regression testing
- accessibility testing
- linting
- release automation

## 19. Governance

Treat the system like a product.

Define:

- roles and reviewers
- change process
- approval criteria
- contribution rules
- deprecation communication

Approval criteria should include:

- recurring need
- non-duplicative
- token-backed
- accessible
- documented
- testable
- scalable

## 20. Lifecycle and releases

Typical stages:

- Proposed
- Experimental
- Alpha
- Beta
- Stable
- Deprecated
- Removed

Release expectations:

- semantic versioning
- changelog required
- migration notes for breaking changes
- release notes for every release

## 21. Adoption and enablement

Define how teams use the system in practice:

- onboarding guide
- starter templates
- boilerplate repositories
- design file templates
- sample pages
- migration guides
- support channel or office hours

## 22. Metrics

Track signals such as:

- adoption rate by product or team
- component reuse rate
- duplicated component count
- documentation usage
- design/development cycle time
- accessibility issue trends
- bug rate in shared components
- migration progress

## 23. Definition of done

A foundation, token set, component, or pattern is done only when all are complete:

- design complete
- states complete
- accessibility reviewed
- content reviewed
- code implemented
- tests added
- docs published
- examples added
- tokens mapped
- lifecycle status assigned

## 24. Anti-patterns

Avoid:

- duplicate components for minor stylistic changes
- page-specific or campaign-specific token names
- design-only assets without code alignment
- hiding accessibility notes outside component docs
- arbitrary production values that bypass tokens
- screenshot-only patterns without reusable guidance
- unstable assets without lifecycle status
- docs drifting away from code

## 25. Suggested repository structure

```text
design-system/
|-- design-system.md
|-- foundations/
|-- tokens/
|-- primitives/
|-- components/
|-- patterns/
|-- templates/
|-- accessibility/
|-- content/
|-- governance/
`-- changelog.md
```

## 26. Initial rollout plan

### Phase 1

- audit existing UI
- define principles
- define foundations
- define token architecture

### Phase 2

- build primitives
- build top components
- publish initial docs

### Phase 3

- define top patterns
- ship docs site or Storybook
- start migration on new work

### Phase 4

- add governance
- add lifecycle states
- measure adoption
- refine based on real usage

## 27. Operating rule

If a decision is not documented here, it is not yet systemized.  
If a component is not documented, accessible, and code-aligned, it is not ready for stable use.  
If a pattern is not grounded in a repeatable user task, it does not belong in the core design system.
