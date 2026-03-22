'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default function MoodMap({ moods = [] }) {
  const createEmojiIcon = (emoji) => {
    return L.divIcon({
      html: `<div style="font-size: 30px; filter: drop-shadow(0 0 10px rgba(74, 222, 128, 0.6)); cursor: pointer;">${emoji}</div>`,
      className: 'custom-emoji-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })
  }

  return (
    <MapContainer center={[34.0522, -118.2437]} zoom={9} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {moods.map((m, i) => (
        <Marker key={i} position={[m.latitude, m.longitude]} icon={createEmojiIcon(m.emoji)}>
          <Popup>{m.message}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}