import type { Note, Folder } from "@/lib/types"

// Fallback folders for when file system operations fail
export const fallbackFolders: Folder[] = [
  {
    id: "design-principles",
    name: "Design Principles",
  },
  {
    id: "psychology",
    name: "Psychology",
  },
  {
    id: "ux-laws",
    name: "UX Laws",
  },
]

// Fallback notes for when file system operations fail
export const fallbackNotes: Note[] = [
  {
    id: "design-principles-proximity",
    title: "Law of Proximity",
    content: `# Law of Proximity

Objects that are near each other tend to be perceived as a group.

## Overview

The Law of Proximity is one of the Gestalt principles of perception. It states that elements that are close together tend to be perceived as a single group or pattern, even if the elements differ in shape, color, or size.

This principle is widely used in user interface design to create visual hierarchies and organize information.

## Examples

* Navigation menus with items grouped by function
* Form fields with labels positioned close to their inputs
* Related content grouped in cards or panels

## Implementation Guidelines

1. Group related items closer together
2. Separate unrelated items with more space
3. Use consistent spacing within groups
4. Consider proximity in relation to other visual principles

## Comparison with Other Principles

| Principle | Main Focus | When to Use |
| --------- | ---------- | ----------- |
| Proximity | Spatial relationships | Grouping related items |
| Similarity | Visual appearance | Creating patterns and categories |
| Continuity | Visual flow | Guiding attention along a path |
| Closure | Completing shapes | Simplifying complex visuals |`,
    color: "blue",
    patternType: "dots",
    tags: ["design", "gestalt", "visual-perception", "grouping"],
    folderId: "design-principles",
  },
  {
    id: "psychology-peak-end-rule",
    title: "Peak-End Rule",
    content: `# Peak-End Rule

People judge an experience largely based on how they felt at its peak and at its end, rather than the total sum or average of every moment of the experience.

## Overview

The Peak-End Rule is a psychological heuristic that suggests people's judgments of past experiences depend predominantly on how they felt at the most intense point (the peak) and at the end, rather than on the sum or average of every moment of the experience.

This cognitive bias affects how we remember events and make decisions about future experiences.

## Takeaways

1. Design experiences with strong positive peaks
2. Ensure the end of the experience is positive
3. Minimize negative moments, even if brief

## Examples

| Experience Type | Peak Moment | End Moment | Overall Perception |
| -------------- | ----------- | ---------- | ------------------ |
| Website Visit | Finding exactly what you need | Easy checkout process | Positive, likely to return |
| App Usage | Achieving a goal | Confirmation of success | Satisfying, likely to continue |
| Video Game | Defeating a boss | Story resolution | Memorable, likely to recommend |

## Implementation

* Identify the most important moments in your user journey
* Design these moments to be especially positive
* Pay particular attention to the final interaction
* Test with users to identify any negative peaks`,
    color: "blue",
    patternType: "circles",
    tags: ["psychology", "user-experience", "memory", "cognitive-bias"],
    folderId: "psychology",
    takeaways: [
      "People remember experiences based on peaks and endings",
      "Design for positive emotional peaks",
      "Create satisfying conclusions to experiences",
    ],
  },
  {
    id: "ux-laws-fitts-law",
    title: "Fitts's Law",
    content: `# Fitts's Law

The time required to move to a target depends on the distance to and size of the target.

## Overview

Fitts's Law is a predictive model of human movement that states that the time required to rapidly move to a target area is a function of the distance to the target and the size of the target.

This principle is fundamental in user interface design, particularly for interactive elements like buttons and controls.

## Mathematical Formula

T = a + b log₂(1 + D/W)

Where:
* T is the time to move to a target
* a and b are empirical constants
* D is the distance to the target
* W is the width (size) of the target

## Design Implications

1. Important or frequently used controls should be larger
2. Edge and corner positions are easier to target (infinite width)
3. Group related controls to minimize mouse movement
4. Consider touch targets for mobile (minimum 44×44 pixels)

## Examples by Platform

| Platform | Recommended Target Size | Common Applications |
| -------- | ----------------------- | ------------------- |
| Desktop | 24-32px minimum | Buttons, menu items, links |
| Mobile | 44-48px minimum | Nav buttons, form controls |
| Touch Kiosks | 60-80px minimum | Large buttons, simplified UI |
| Accessibility | 44px minimum | Larger targets for motor impairments |

## Code Example

\`\`\`javascript
// Calculate target acquisition time based on Fitts's Law
function calculateAcquisitionTime(distance, targetSize) {
  const a = 0.2; // Empirical constant
  const b = 0.1; // Empirical constant
  return a + b * Math.log2(1 + distance / targetSize);
}
\`\`\``,
    color: "blue",
    patternType: "grid",
    tags: ["ux", "interaction-design", "accessibility", "usability"],
    folderId: "ux-laws",
    takeaways: [
      "Larger targets are easier to hit",
      "Distance to targets affects interaction time",
      "Screen edges and corners are effectively infinite in size",
      "Mobile interfaces need larger touch targets",
    ],
  },
  {
    id: "design-principles-contrast",
    title: "Principle of Contrast",
    content: `# Principle of Contrast

Elements that are different from their surroundings are more noticeable and memorable.

## Overview

The Principle of Contrast is a fundamental design concept that states that elements which stand out from their surroundings are more likely to capture attention and be remembered.

This principle is essential for creating visual hierarchy, guiding user attention, and emphasizing important elements in a design.

## Applications in Design

* Creating clear call-to-action buttons
* Highlighting important information
* Establishing visual hierarchy
* Improving readability and accessibility

## Types of Contrast

| Type | Description | Example |
| ---- | ----------- | ------- |
| Color | Differences in hue, saturation, or value | Red button on a blue background |
| Size | Variations in dimensions | Large headline with smaller body text |
| Shape | Different forms or outlines | Circular element among squares |
| Texture | Varying surface qualities | Smooth button on a textured background |
| Direction | Different orientations | Horizontal element in a vertical layout |

## Implementation Tips

1. Use contrast purposefully to guide attention
2. Ensure sufficient contrast for accessibility (WCAG guidelines)
3. Don't overuse contrast - too many contrasting elements create visual noise
4. Test contrast in different viewing conditions

## Code Example

\`\`\`css
/* Example of color contrast for accessibility */
.button {
  background-color: #0070f3;
  color: white;
  /* WCAG AA requires 4.5:1 contrast ratio for normal text */
  /* WCAG AAA requires 7:1 contrast ratio for normal text */
}
\`\`\``,
    color: "blue",
    patternType: "triangles",
    tags: ["design", "visual-design", "accessibility", "attention"],
    folderId: "design-principles",
    takeaways: [
      "Contrast helps guide user attention",
      "Different types of contrast can be combined for greater effect",
      "Sufficient contrast is essential for accessibility",
      "Contrast creates visual hierarchy",
    ],
  },
  {
    id: "psychology-hicks-law",
    title: "Hick's Law",
    content: `# Hick's Law

The time it takes to make a decision increases with the number and complexity of choices.

## Overview

Hick's Law (or the Hick-Hyman Law) describes the time it takes for a person to make a decision as a function of the number of possible choices they have.

This principle is crucial in user interface design, suggesting that reducing the number of options can lead to faster decision-making and better user experiences.

## Mathematical Formula

T = b log₂(n + 1)

Where:
* T is the decision time
* b is an empirical constant
* n is the number of choices

## Design Applications

1. Limit the number of navigation options
2. Break complex processes into steps
3. Use progressive disclosure to reveal options as needed
4. Group similar options into categories

## Examples

| UI Element | Poor Implementation | Better Implementation |
| ---------- | ------------------- | --------------------- |
| Navigation | 15+ top-level items | 5-7 main categories |
| Settings | All options at once | Categorized settings |
| Product Selection | Overwhelming grid | Filtered/faceted browsing |
| Forms | All fields visible | Progressive disclosure |

## Code Example

\`\`\`javascript
// Example of progressive disclosure in a form
function showAdditionalFields(showFields) {
  const additionalFields = document.getElementById('additional-fields');
  additionalFields.style.display = showFields ? 'block' : 'none';
}
\`\`\``,
    color: "blue",
    patternType: "shapes",
    tags: ["psychology", "cognitive-load", "decision-making", "ux"],
    folderId: "psychology",
    takeaways: [
      "More choices increase decision time",
      "Simplify interfaces by limiting options",
      "Use progressive disclosure for complex interfaces",
      "Group related options to reduce cognitive load",
    ],
  },
  {
    id: "ux-laws-jakobs-law",
    title: "Jakob's Law",
    content: `# Jakob's Law

Users spend most of their time on other sites, so they prefer your site to work the same way as all the other sites they already know.

## Overview

Jakob's Law, named after usability expert Jakob Nielsen, states that users develop expectations for how interfaces should work based on their cumulative experiences with other interfaces.

This principle suggests that following established design patterns can lead to better usability and user satisfaction.

## Key Implications

* Users transfer expectations from one digital product to another
* Familiar patterns reduce cognitive load
* Innovation should be balanced with convention

## Implementation Guidelines

1. Research common patterns in your industry
2. Follow established conventions for core functionality
3. Innovate primarily in your unique value proposition
4. Test deviations from conventions with users

## Common Design Patterns

| Element | Conventional Pattern | Why It Works |
| ------- | -------------------- | ------------ |
| Navigation | Horizontal menu at top | Users expect to find navigation here |
| Search | Right-aligned field with magnifying glass icon | Widely recognized pattern |
| Shopping Cart | Top right with cart icon | Consistent across e-commerce |
| Form Submission | Primary button at bottom right | Follows reading/task flow |

## Code Example

\`\`\`html
<!-- Example of conventional navigation pattern -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  <div class="search">
    <input type="text" placeholder="Search...">
    <button aria-label="Search"><i class="search-icon"></i></button>
  </div>
</header>
\`\`\``,
    color: "blue",
    patternType: "lines",
    tags: ["ux", "conventions", "usability", "mental-models"],
    folderId: "ux-laws",
    takeaways: [
      "Follow established conventions for better usability",
      "Users expect consistency with their previous experiences",
      "Familiar patterns reduce learning curve",
      "Innovate only where it adds unique value",
    ],
  },
  {
    id: "design-principles-whitespace",
    title: "The Power of Whitespace",
    content: `# The Power of Whitespace

Whitespace is not empty space; it's a powerful design element that improves readability, focus, and perceived elegance.

## Overview

Whitespace (or negative space) refers to the empty space between and around elements in a design. Despite its name, it doesn't have to be white - it's simply the absence of content.

Effective use of whitespace can dramatically improve user experience by making content more readable, focusing attention, and creating a sense of elegance.

## Benefits of Whitespace

* Improves readability and comprehension
* Creates visual hierarchy and organization
* Enhances focus on key elements
* Conveys a sense of sophistication and quality
* Reduces cognitive load

## Types of Whitespace

| Type | Description | Application |
| ---- | ----------- | ----------- |
| Macro | Large spaces between major elements | Page margins, section separators |
| Micro | Small spaces between minor elements | Line spacing, letter spacing, padding |
| Active | Intentionally shaped to guide attention | Asymmetrical layouts, strategic emptiness |
| Passive | Standard spacing for readability | Paragraph margins, grid gutters |

## Implementation Guidelines

1. Use consistent spacing with a defined scale
2. Increase whitespace for higher-end brands/products
3. Balance whitespace with information density needs
4. Consider whitespace as a design element, not an afterthought

## Code Example

\`\`\`css
/* Example of a whitespace scale using CSS variables */
:root {
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 4rem;     /* 64px */
}

.card {
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
}

.card-title {
  margin-bottom: var(--space-sm);
  letter-spacing: 0.05em; /* Micro whitespace */
  line-height: 1.5;       /* Micro whitespace */
}
\`\`\``,
    color: "blue",
    patternType: "concentric",
    tags: ["design", "whitespace", "layout", "typography"],
    folderId: "design-principles",
    takeaways: [
      "Whitespace improves readability and comprehension",
      "Strategic whitespace creates visual hierarchy",
      "Consistent spacing creates rhythm and harmony",
      "Whitespace can convey brand positioning and quality",
    ],
  },
]
