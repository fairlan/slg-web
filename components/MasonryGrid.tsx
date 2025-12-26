import React from 'react';
import { PlaceCard } from './PlaceCard';

interface Place {
  id: string;
  name: string;
  category: string;
  coverImage: string;
  location: string;
  rating?: number;
  kolCount: number;
  friendCount: number;
  visitorCount: number;
  size?: 'small' | 'medium' | 'large';
}

interface MasonryGridProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
}

export function MasonryGrid({ places, onPlaceClick }: MasonryGridProps) {
  return (
    <div className="px-6 py-4 pb-32">
      {/* Grid Layout with varying columns */}
      <div className="grid grid-cols-2 gap-3">
        {places.map((place, index) => {
          // Create visual rhythm with different sizes
          const isLarge = index % 7 === 0; // Every 7th item is large
          const isFullWidth = isLarge;
          
          return (
            <div
              key={place.id}
              className={isFullWidth ? 'col-span-2' : 'col-span-1'}
            >
              <PlaceCard
                {...place}
                size={isLarge ? 'large' : place.size || 'medium'}
                onClick={() => onPlaceClick(place)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}