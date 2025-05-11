# Fitt's Law

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
