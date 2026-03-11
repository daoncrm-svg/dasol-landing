# Common Elements of Mature Design Systems

Use this note when you need to decide what belongs in the core system, explain why the outline is structured a certain way, or trim a sprawling request back to mature-system common denominators.

## Repeated structure across mature systems

Public systems and expert guidance repeatedly converge on these layers:

1. principles, purpose, and scope
2. naming system and information architecture
3. foundations and design tokens
4. primitives and utilities
5. component library
6. component specification format
7. patterns, templates, and recipe layers
8. content standards
9. accessibility
10. searchable documentation and repository structure
11. code assets, tooling, and handoff rules
12. governance, releases, and lifecycle
13. adoption, support, and metrics

When in doubt, bias toward this structure instead of inventing a custom taxonomy.

## Core reasoning for each layer

### Principles, purpose, and scope

Start with why the system exists, what products and platforms it covers, and what is intentionally out of scope. Mature systems lead with decision criteria before components.

### Naming and taxonomy

Define naming before styling. Stable names make systems scalable. Separate raw values, semantic aliases, and component-level decisions.

### Foundations and tokens

The most repeated foundation categories are:

- color
- typography
- spacing
- size
- layout/grid
- breakpoints/responsive rules
- shadow/elevation
- border/radius
- opacity
- z-index
- themes
- icon and motion rules when relevant

### Primitives and utilities

Use a clear layer between tokens and finished components. Common primitives include `Box`, `Stack`, `Grid`, `Flex`, and `Text`.

### Components

Typical reusable groups are:

- actions
- form controls
- navigation
- feedback/status
- overlays
- data/content display

### Component docs

A mature component page usually includes:

- what it is
- when to use it
- when not to use it
- anatomy
- variants
- states
- behavior
- accessibility
- code API
- examples
- do/don't guidance

### Patterns and templates

Treat patterns as reusable solutions to user tasks, not just page mockups. Patterns combine components, content guidance, behavior rules, and accessibility guidance.

Keep highly product-specific combinations outside the core system unless the request explicitly calls for a recipe layer.

### Content standards

Include writing guidance for labels, helper text, errors, empty states, notices, and calls to action. Mature systems treat content as part of the system, not an afterthought.

### Accessibility

Accessibility belongs in both foundations and component specs. Minimum recurring expectations are contrast, focus visibility, semantics, labels, keyboard access, reduced motion, reflow, and accessible state communication.

### Documentation and repository

A mature system needs a searchable reference site or repository, not only a Figma library. Common sections are overview, foundations, tokens, components, patterns, contribution rules, and release notes.

### Code assets and tooling

Expect Figma assets, token outputs, code packages, docs tooling, lint rules, accessibility tests, and handoff conventions to live alongside the design assets.

### Governance and lifecycle

Document who reviews changes, how proposals are approved, what lifecycle states exist, and how releases and deprecations are communicated.

### Adoption and operations

Treat adoption as part of the work. Include audits, migration guidance, communication, support loops, office hours, feedback intake, and success metrics.

## What usually does not belong in the core system

Do not default these into the core layer:

- one-off hero sections
- campaign-specific modules
- hypothesis-stage components
- product-specific compositions with no reuse signal
- tokens that have not been validated in real product use

A good default rule is: if it is not repeated, reusable, and governable, it probably does not belong in the core design system.

## Compact default outline

Use this outline when the user wants a shorter structure:

1. Overview / Scope
2. Principles / Standards
3. Foundations
4. Tokens
5. Primitives / Utilities
6. Components
7. Component Specs
8. Patterns / Templates / Recipes
9. Content Standards
10. Accessibility
11. Code Assets / Tooling / Specs
12. Documentation / Repository
13. Governance / Lifecycle / Releases
14. Adoption / Support / Metrics
