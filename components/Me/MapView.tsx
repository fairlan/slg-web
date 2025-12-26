import React from 'react';
import { MapPin } from 'lucide-react';
import type { ContentItem } from './MeView';

interface MapViewProps {
  items: ContentItem[];
}

export function MapView({ items }: MapViewProps) {
  // Mock coordinates for demonstration
  const markers = items.map((item, index) => ({
    ...item,
    lat: 31.2 + (Math.random() - 0.5) * 0.3, // Shanghai area
    lng: 121.4 + (Math.random() - 0.5) * 0.3,
  }));

  return (
    <div className="relative w-full h-[500px] bg-card rounded-3xl overflow-hidden border border-border">
      {/* Map Background (Mock) */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-secondary/30">
        {/* Grid Pattern for Map Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* City Label */}
        <div className="absolute top-6 left-6 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full border border-border shadow-lg">
          <div className="text-sm text-foreground">上海市 · {items.length} 个足迹</div>
        </div>

        {/* Markers */}
        {markers.map((marker, index) => {
          const x = ((marker.lng - 121.25) / 0.3) * 100;
          const y = ((marker.lat - 31.05) / 0.3) * 100;
          
          return (
            <div
              key={marker.id}
              className="absolute group cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pin */}
              <div className="relative">
                <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-background" fill="currentColor" />
                </div>
                
                {/* Pulse Animation */}
                <div className="absolute inset-0 bg-foreground/30 rounded-full animate-ping" />
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-background border border-border rounded-2xl shadow-xl overflow-hidden min-w-[200px]">
                  <img 
                    src={marker.placeImage} 
                    alt={marker.placeName}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <div className="text-sm text-foreground mb-1">{marker.placeName}</div>
                    <div className="text-xs text-muted-foreground">{marker.location}</div>
                    <div className="text-xs text-muted-foreground mt-1">{marker.timestamp}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button 
          className="w-10 h-10 bg-background hover:bg-accent border border-border rounded-xl shadow-lg flex items-center justify-center transition-colors"
          aria-label="放大"
        >
          <span className="text-lg">+</span>
        </button>
        <button 
          className="w-10 h-10 bg-background hover:bg-accent border border-border rounded-xl shadow-lg flex items-center justify-center transition-colors"
          aria-label="缩小"
        >
          <span className="text-lg">−</span>
        </button>
      </div>

      {/* Location Info */}
      <div className="absolute bottom-6 left-6 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full border border-border shadow-lg">
        <div className="text-xs text-muted-foreground">
          探索范围：31.2°N, 121.4°E
        </div>
      </div>
    </div>
  );
}
