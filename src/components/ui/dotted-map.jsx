import * as React from 'react'
import { createMap } from 'svg-dotted-map'
import { cn } from '@/lib/utils'

export function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 4500,
  markers = [],
  dotColor = 'currentColor',
  markerColor = '#D92228',
  dotRadius = 0.22,
  stagger = true,
  pulse = true,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}) {
  const { points, processedMarkers } = React.useMemo(() => {
    const map = createMap({
      width,
      height,
      mapSamples,
    })
    const markersWithCoords = map.addMarkers(markers)
    return { points: map.points, processedMarkers: markersWithCoords }
  }, [width, height, mapSamples, markers])

  // Compute stagger helpers
  const { xStep, yToRowIndex } = React.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
    const rowMap = new Map()
    let step = 0
    let prevY = Number.NaN
    let prevXInRow = Number.NaN

    for (const p of sorted) {
      if (p.y !== prevY) {
        prevY = p.y
        prevXInRow = Number.NaN
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
      }
      if (!Number.isNaN(prevXInRow)) {
        const delta = p.x - prevXInRow
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
      }
      prevXInRow = p.x
    }

    return { xStep: step || 1, yToRowIndex: rowMap }
  }, [points])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('text-slate-400/40 dark:text-slate-600/35', className)}
      style={{ width: '100%', height: '100%', ...style }}
      {...svgProps}
    >
      {points.map((point, index) => {
        const rowIndex = yToRowIndex.get(point.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
        return (
          <circle
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill={dotColor}
            key={`${point.x}-${point.y}-${index}`}
          />
        )
      })}

      {processedMarkers.map((marker, index) => {
        const rowIndex = yToRowIndex.get(marker.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0

        const x = marker.x + offsetX
        const y = marker.y
        const r = marker.size ?? dotRadius * 2.8
        const shouldPulse = pulse ? marker.pulse !== false : marker.pulse === true
        const pulseTo = r * 2.6

        return (
          <g key={`${marker.x}-${marker.y}-${index}`}>
            <circle cx={x} cy={y} r={r} fill={markerColor} />

            {shouldPulse ? (
              <g pointerEvents="none">
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={0.8}
                  strokeWidth={0.35}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ) : null}

            {renderMarkerOverlay?.({
              marker: { ...marker, x, y },
              index,
              x,
              y,
              r,
            })}
          </g>
        )
      })}
    </svg>
  )
}

export default DottedMap
