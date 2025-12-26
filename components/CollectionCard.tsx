import React from 'react';
import { MapPin, Star } from 'lucide-react';

interface CollectionCardProps {
  id: string;
  title: string;
  curator: string;
  coverImage: string;
  location: string;
  rating?: number;
  momentsCount?: number;
  onClick: () => void;
}

export function CollectionCard({
  title,
  curator,
  coverImage,
  location,
  rating,
  momentsCount,
  onClick,
}: CollectionCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer mb-4 overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <span className="text-sm text-gray-600">策展人 · {curator}</span>
          </div>
          {momentsCount && (
            <span className="text-sm text-gray-500">{momentsCount} 个时刻</span>
          )}
        </div>
      </div>
    </div>
  );
}
