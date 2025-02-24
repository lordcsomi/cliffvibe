"use client"

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [13.4, 47.5], // Central Europe coordinates
      zoom: 5
    })

    const navigationControl = new mapboxgl.NavigationControl()
    map.current.addControl(navigationControl, 'top-right')

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div ref={mapContainer} className="w-full h-[calc(100vh-4rem)]" />
  )
}
