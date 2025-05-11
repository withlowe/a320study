import type { Note, Folder } from "./types"
import { extractTagsFromMarkdown } from "./utils"

export const foldersData: Folder[] = [
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
  {
    id: "reference",
    name: "Reference",
  },
]

// Process markdown content to extract tags but use consistent color
const processMarkdownContent = (note: Note): Note => {
  const tags = extractTagsFromMarkdown(note.content)
  return {
    ...note,
    tags: tags.length > 0 ? tags : undefined,
    color: "blue", // All notes now use blue
  }
}

// Base note data
const baseNotesData: Note[] = [
  {
    id: "peak-end-rule",
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
* Test with users to identify any negative peaks

## Tags
* psychology
* user-experience
* memory
* cognitive-bias`,
    color: "blue",
    patternType: "dots",
    takeaways: [
      "Touch targets should be large enough for users to accurately select them.",
      "Touch targets should have ample spacing between them.",
      "Touch targets should be placed in areas of an interface that allow them to be easily acquired.",
    ],
    folderId: "psychology",
  },
  {
    id: "law-of-proximity",
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
| Closure | Completing shapes | Simplifying complex visuals |

## Tags
* design
* gestalt
* visual-perception
* grouping`,
    color: "blue",
    patternType: "dots",
    folderId: "design-principles",
  },
  {
    id: "law-of-pragnanz",
    title: "Law of Prägnanz",
    content: `# Law of Prägnanz

People will perceive and interpret ambiguous or complex images as the simplest form possible, because it requires the least cognitive effort.

## Overview

The Law of Prägnanz (also known as the Law of Good Figure or Law of Simplicity) is the fundamental principle of Gestalt psychology. It states that when presented with a set of ambiguous or complex elements, people will tend to interpret them in the simplest way possible.

This principle explains why we often see simple shapes in complex patterns and why minimalist designs are often more effective.

## Key Aspects

* The brain prefers simple, orderly, symmetrical designs
* Complex information is mentally reduced to the simplest form
* Influences how we perceive and remember visual information

## Design Applications

1. Simplify complex information
2. Use clear, recognizable shapes and icons
3. Remove unnecessary visual elements
4. Create balanced, symmetrical layouts when possible

## Examples

| Design Element | Complex Version | Simplified Version |
| -------------- | --------------- | ------------------ |
| Logo | Detailed illustration | Simple geometric shape |
| Navigation | Deep nested menus | Flat, organized structure |
| Data Visualization | Raw data tables | Charts and graphs |
| Instructions | Lengthy text | Step-by-step visuals |

## Tags
* design
* gestalt
* simplicity
* cognitive-load`,
    color: "blue",
    patternType: "shapes",
    folderId: "design-principles",
  },
  {
    id: "pareto-principle",
    title: "Pareto Principle",
    content: `# Pareto Principle

The Pareto principle states that, for many outcomes, roughly 80% of the effects come from 20% of the causes.

## Overview

The Pareto Principle, also known as the 80/20 rule, is named after Italian economist Vilfredo Pareto. It suggests that 80% of consequences come from 20% of causes.

In business and design, this principle helps prioritize efforts by focusing on the vital few factors that produce the majority of results.

## Applications

* **Product Design**: 80% of users use 20% of features
* **Business**: 80% of profits come from 20% of customers
* **Project Management**: 80% of results come from 20% of effort
* **User Experience**: 80% of user interactions occur in 20% of the interface

## Implementation Strategy

1. Identify the vital 20% through data analysis
2. Prioritize resources toward these high-impact areas
3. Optimize the most-used features or touchpoints
4. Consider removing or simplifying the rarely-used 80%

## Examples

| Domain | The Critical 20% | The Other 80% |
| ------ | ---------------- | ------------- |
| E-commerce | Top-selling products | Long-tail inventory |
| Content | Most-viewed pages | Rarely accessed content |
| Features | Core functionality | Nice-to-have options |
| Navigation | Primary pathways | Secondary routes |

## Tags
* business
* efficiency
* prioritization
* economics`,
    color: "blue",
    patternType: "dots",
    folderId: "psychology",
  },
  {
    id: "occams-razor",
    title: "Occam's Razor",
    content: `# Occam's Razor

Among competing hypotheses that predict equally well, the one with the fewest assumptions should be selected.

## Overview

Occam's Razor is a problem-solving principle that suggests when presented with competing hypotheses about the same prediction, one should select the solution with the fewest assumptions.

In design and development, this translates to keeping solutions as simple as possible and avoiding unnecessary complexity.

## Key Principles

* Simpler explanations are more likely to be correct
* Unnecessary complexity should be eliminated
* Additional features should justify their complexity

## Application in Design

1. Start with the simplest possible solution
2. Add complexity only when necessary
3. Question every element and feature
4. Eliminate redundant or unnecessary components

## Decision Framework

| Consideration | Questions to Ask |
| ------------- | ---------------- |
| Necessity | Is this element/feature essential? |
| Redundancy | Does this duplicate functionality elsewhere? |
| Complexity Cost | Does the value outweigh the added complexity? |
| Assumptions | How many assumptions does this solution require? |
| Maintenance | How difficult will this be to maintain? |

## Tags
* philosophy
* problem-solving
* simplicity
* decision-making`,
    color: "blue",
    patternType: "dots",
    folderId: "reference",
  },
  {
    id: "fitts-law",
    title: "Fitt's Law",
    content: `# Fitt's Law

The time required to move to a target depends on the distance to and size of the target.

## Overview

Fitt's Law is a predictive model of human movement that states that the time required to rapidly move to a target area is a function of the distance to the target and the size of the target.

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

## Tags
* ux
* interaction-design
* accessibility
* usability`,
    color: "blue",
    patternType: "concentric",
    folderId: "ux-laws",
  },
  {
    id: "hicks-law",
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

## Tags
* ux
* cognitive-load
* decision-making
* usability`,
    color: "blue",
    patternType: "grid",
    folderId: "ux-laws",
  },
  {
    id: "jakobs-law",
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

## Tags
* ux
* conventions
* usability
* mental-models`,
    color: "blue",
    patternType: "shapes",
    folderId: "ux-laws",
  },
  {
    id: "law-of-common-region",
    title: "Law of Common Region",
    content: `# Law of Common Region

Elements tend to be perceived into groups if they are sharing an area with a clearly defined boundary.

## Overview

The Law of Common Region is another Gestalt principle that states that elements tend to be perceived as grouped together if they are located within the same bounded area.

This principle is commonly applied in interface design through the use of cards, panels, and other containers to group related information.

## Design Applications

* Group related content in cards or panels
* Use borders, backgrounds, or white space to define regions
* Create visual hierarchy through nested regions
* Separate unrelated content into distinct regions

## Implementation Techniques

1. Use subtle backgrounds to define regions
2. Apply consistent spacing within and between regions
3. Consider using borders or shadows to reinforce boundaries
4. Ensure sufficient contrast between regions

## Examples

| UI Component | Implementation | Effect |
| ------------ | -------------- | ------ |
| Dashboard | Cards for different data sets | Clear separation of information |
| Form | Fieldsets with related inputs | Logical grouping of form fields |
| Navigation | Dropdown menus with boundaries | Distinction between navigation levels |
| Content | Sidebars vs. main content area | Clear functional separation |

## Tags
* design
* gestalt
* grouping
* visual-hierarchy`,
    color: "blue",
    patternType: "dots",
    folderId: "design-principles",
  },
]

// Process all notes to extract tags and assign consistent blue color
export const notesData: Note[] = baseNotesData.map(processMarkdownContent)
