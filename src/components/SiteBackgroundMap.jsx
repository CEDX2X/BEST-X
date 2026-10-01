import React from 'react'
import { DottedMap } from './ui/dotted-map'

export default function SiteBackgroundMap({
  className = '',
  opacity = 'opacity-30 dark:opacity-20',
  pulse = true,
}) {
  // Key mobility corridors: Douala (Cameroon) -> Montreal & Toronto & Vancouver (Canada), Rome/Paris (Europe)
  const markers = [
    { lat: 4.0511, lng: 9.7679, size: 0.9, pulse: true }, // Douala, Cameroun
    { lat: 45.5017, lng: -73.5673, size: 0.8, pulse: true }, // Montréal, Canada
    { lat: 43.6532, lng: -79.3832, size: 0.7, pulse: true }, // Toronto, Canada
    { lat: 49.2827, lng: -123.1207, size: 0.6, pulse: false }, // Vancouver, Canada
    { lat: 41.9028, lng: 12.4964, size: 0.6, pulse: false }, // Rome, Italie
    { lat: 48.8566, lng: 2.3522, size: 0.6, pulse: false }, // Paris, France
  ]

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${opacity} ${className}`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <DottedMap
          width={180}
          height={90}
          mapSamples={5000}
          dotRadius={0.24}
          markerColor="#D92228"
          dotColor="currentColor"
          markers={markers}
          pulse={pulse}
          className="w-full h-full object-cover text-slate-400 dark:text-slate-600"
        />
      </div>
    </div>
  )
}
