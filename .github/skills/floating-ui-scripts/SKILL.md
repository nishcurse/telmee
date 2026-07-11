---
name: floating-ui-scripts
description: "Design and implement floating windows, overlays, popovers, popups, modals, and related frontend scripts. Use for building or refactoring UI that appears above the page, needs portal-style positioning, dismissal behavior, or coordinated event scripts."
argument-hint: "What floating UI should be built or improved?"
---

# Floating UI and Scripts

## When to Use
- Build floating windows, overlay panels, popups, drawers, tooltips, or modals
- Add the scripts that control open, close, positioning, focus, escape, and outside-click behavior
- Refactor an existing floating UI so it is easier to reuse across the app
- Validate that a floating surface behaves correctly on desktop and mobile

## Workflow
1. Identify the floating surface type and its trigger, anchor, and dismissal rules.
2. Inspect nearby UI primitives, hooks, and utilities before adding anything new.
3. Decide whether the surface should render inline, in a portal, or as an overlay layer.
4. Implement the minimal structure first: trigger, container, content, and close behavior.
5. Add the scripts that coordinate visibility, positioning, keyboard handling, and outside interaction.
6. Style for depth and separation, then verify layout, stacking, and responsive behavior.
7. Check the interaction details: escape key, focus return, scroll locking if needed, and cleanup on unmount.

## Decision Points
- If the UI must stay attached to an anchor, use positioning logic tied to the trigger element.
- If the UI must sit above the whole app, use an overlay or portal-based surface.
- If multiple floating surfaces share behavior, extract a reusable hook or utility instead of duplicating logic.
- If the behavior depends on timing or event coordination, keep the script small and explicit rather than hiding it in the component tree.

## Quality Checks
- The floating surface opens and closes predictably.
- Outside clicks do not break nested interactions or text selection.
- Keyboard interaction works, including escape and tab order where relevant.
- The surface does not clip, overlap incorrectly, or lose stacking order.
- The implementation stays small, reusable, and aligned with existing code patterns.

## Output Standard
- Prefer the smallest useful component and script surface.
- Reuse existing hooks, utilities, and style tokens before adding new ones.
- Keep the final implementation easy to adapt for other floating surfaces.