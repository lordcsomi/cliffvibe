"use client"

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from 'next-themes'
import { Card, CardContent } from './ui/card'

interface MarkerLocation {
  id: string
  lat: number
  lng: number
  title: string
  description?: string
}

const sampleLocations: MarkerLocation[] = [
  {
    id: '1',
    lat: 47.497913,
    lng: 19.040236,
    title: 'Budapest',
    description: 'Capital of Hungary'
  },
  {
    id: '2',
    lat: 48.208176,
    lng: 16.373819,
    title: 'Vienna',
    description: 'Capital of Austria'
  },
  {
    id: '3',
    lat: 50.075538,
    lng: 14.437800,
    title: 'Prague',
    description: 'Capital of Czech Republic'
  }
]

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Add CSS to hide Mapbox logo and attribution
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .mapboxgl-ctrl-bottom-left,
      .mapboxgl-ctrl-bottom-right { display: none !important; }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mapContainer.current || !mounted) return

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: resolvedTheme === 'dark' 
        ? 'mapbox://styles/mapbox/dark-v11' 
        : 'mapbox://styles/mapbox/outdoors-v12',
      center: [17.5, 48.5], // Adjusted to better center the sample locations
      zoom: 5,
      attributionControl: false
    })

    map.current = newMap

    const navigationControl = new mapboxgl.NavigationControl()
    newMap.addControl(navigationControl, 'top-right')

    // Add markers for each location
    sampleLocations.forEach(location => {
      const popupContent = document.createElement('div')
      popupContent.innerHTML = `
        <div class="p-4 bg-background rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold mb-1 text-foreground">${location.title}</h3>
          ${location.description ? `<p class="text-sm text-muted-foreground">${location.description}</p>` : ''}
        </div>
      `

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupContent)

      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(newMap)
    })

    return () => {
      map.current?.remove()
    }
  }, [resolvedTheme, mounted])

  if (!mounted) return null

  return (
    <div ref={mapContainer} className="w-full h-[calc(100vh-4rem)]" />
  )
}
