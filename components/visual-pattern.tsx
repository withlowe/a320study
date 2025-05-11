"use client"

import { useEffect, useRef } from "react"

interface VisualPatternProps {
  type: "dots" | "shapes" | "triangles" | "lines" | "circles" | "grid" | "concentric"
  color: string
}

export function VisualPattern({ type, color }: VisualPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match its display size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2 // Use higher resolution for crisp rendering
    canvas.height = rect.height * 2
    ctx.scale(2, 2) // Scale the context to match the higher resolution

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get color values based on the color prop - always white for minimalist design
    const fillColor = "#FFFFFF"
    const bgColor = "rgba(255, 255, 255, 0.2)" // Slightly more visible

    // Draw pattern based on type
    switch (type) {
      case "dots":
        drawDots(ctx, rect.width, rect.height, fillColor, bgColor)
        break
      case "shapes":
        drawShapes(ctx, rect.width, rect.height, fillColor)
        break
      case "triangles":
        drawTriangles(ctx, rect.width, rect.height, fillColor)
        break
      case "lines":
        drawLines(ctx, rect.width, rect.height, fillColor)
        break
      case "circles":
        drawCircles(ctx, rect.width, rect.height, fillColor)
        break
      case "grid":
        drawGrid(ctx, rect.width, rect.height, fillColor)
        break
      case "concentric":
        drawConcentric(ctx, rect.width, rect.height, fillColor)
        break
    }
  }, [type, color])

  // Draw a grid of dots with some highlighted
  function drawDots(ctx: CanvasRenderingContext2D, width: number, height: number, fillColor: string, bgColor: string) {
    const rows = 5
    const cols = 5
    const dotRadius = Math.min(width, height) / (Math.max(rows, cols) * 3)
    const spacingX = width / (cols + 1)
    const spacingY = height / (rows + 1)

    // Draw background dots
    ctx.fillStyle = bgColor
    for (let y = 1; y <= rows; y++) {
      for (let x = 1; x <= cols; x++) {
        ctx.beginPath()
        ctx.arc(x * spacingX, y * spacingY, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Draw highlighted dots (random pattern)
    ctx.fillStyle = fillColor
    const highlightedDots = [
      { x: 2, y: 2 },
      { x: 4, y: 4 },
      { x: 3, y: 1 },
    ]

    highlightedDots.forEach((dot) => {
      ctx.beginPath()
      ctx.arc(dot.x * spacingX, dot.y * spacingY, dotRadius, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  // Draw geometric shapes
  function drawShapes(ctx: CanvasRenderingContext2D, width: number, height: number, fillColor: string) {
    ctx.strokeStyle = fillColor
    ctx.lineWidth = 2

    // Draw hexagon
    const hexRadius = width / 6
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = width / 2 + hexRadius * Math.cos(angle)
      const y = height / 2 + hexRadius * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()

    // Draw circle
    ctx.beginPath()
    ctx.arc(width / 2, height * 0.7, width / 8, 0, Math.PI * 2)
    ctx.stroke()

    // Draw diamond
    const diamondSize = width / 5
    ctx.beginPath()
    ctx.moveTo(width / 2, height * 0.25 - diamondSize)
    ctx.lineTo(width / 2 + diamondSize, height * 0.25)
    ctx.lineTo(width / 2, height * 0.25 + diamondSize)
    ctx.lineTo(width / 2 - diamondSize, height * 0.25)
    ctx.closePath()
    ctx.stroke()
  }

  // Draw triangles pattern
  function drawTriangles(ctx: CanvasRenderingContext2D, width: number, height: number, fillColor: string) {
    ctx.fillStyle = fillColor
    const triangleSize = width / 12
    const rows = 5
    const cols = 6
    const startX = width / 2 - (cols * triangleSize) / 2
    const startY = height / 2 - (rows * triangleSize) / 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - row; col++) {
        const x = startX + (col + row / 2) * triangleSize
        const y = startY + row * triangleSize

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + triangleSize, y)
        ctx.lineTo(x + triangleSize / 2, y + triangleSize)
        ctx.closePath()
        ctx.fill()
      }
    }
  }

  // Draw lines pattern
  function drawLines(ctx: CanvasRenderingContext2D, width: number, height: number, fillColor: string) {
    ctx.strokeStyle = fillColor
    ctx.lineWidth = 3

    // Draw arrow
    ctx.beginPath()
    ctx.moveTo(width * 0.2, height * 0.7)
    ctx.lineTo(width * 0.5, height * 0.3)
    ctx.lineTo(width * 0.8, height * 0.7)
    ctx.stroke()
  }

  // Draw concentric circles
  function drawCircles(ctx: CanvasRenderingContext2D, width: number, height: number, fillColor: string) {
    ctx.strokeStyle = fillColor
    ctx.lineWidth = 2
    const centerX = width / 2
    const centerY = height / 2
    const maxRadius = Math.min(width, height) / 2 - 10

    for (let i = 1; i <= 4; i++) {
      const radius = (maxRadius * i) / 4
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Add a dot in the center
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw grid pattern
  function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, fillColor: string) {
    ctx.strokeStyle = fillColor
    ctx.lineWidth = 2
    const gridSize = 4
    const cellSize = Math.min(width, height) / gridSize

    // Draw grid
    for (let i = 0; i <= gridSize; i++) {
      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, height)
      ctx.stroke()

      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(width, i * cellSize)
      ctx.stroke()
    }

    // Add a highlighted cell
    ctx.fillStyle = fillColor
    ctx.fillRect(cellSize * 2, cellSize * 2, cellSize, cellSize)
  }

  // Draw concentric shapes
  function drawConcentric(ctx: CanvasRenderingContext2D, width: number, height: number, fillColor: string) {
    ctx.strokeStyle = fillColor
    ctx.lineWidth = 2
    const centerX = width / 2
    const centerY = height / 2
    const maxRadius = Math.min(width, height) / 2 - 10

    // Draw concentric circles
    for (let i = 1; i <= 3; i++) {
      const radius = (maxRadius * i) / 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw a dot in the center
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
