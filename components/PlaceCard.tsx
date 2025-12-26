import React from 'react';
import { MapPin, Star, Users, UserCheck, Sparkles } from 'lucide-react';

interface PlaceCardProps {
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
  onClick: () => void;
}

export function PlaceCard({
  name,
  category,
  coverImage,
  location,
  rating,
  kolCount,
  friendCount,
  visitorCount,
  size = 'medium',
  onClick,
}: PlaceCardProps) {
  // Different aspect ratios for different sizes - Fixed layout issue
  const aspectRatioClass = {
    small: 'aspect-[3/4]',
    medium: 'aspect-[3/4]',
    large: 'aspect-[4/5]',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-lg transition-all duration-500 active:scale-[0.98] ${aspectRatioClass}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative w-full h-full">
        {/* Cover Image */}
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay - Softer, more ethereal */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-card/95 backdrop-blur-md rounded-full text-xs text-muted-foreground shadow-sm border border-border">
          {category}
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-card/95 backdrop-blur-md rounded-full flex items-center gap-1.5 shadow-sm border border-border">
            <Star className="w-3.5 h-3.5 fill-[#D4C9BE] text-[#D4C9BE]" />
            <span className="text-xs text-card-foreground">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`text-card mb-1.5 ${size === 'large' ? 'text-lg' : 'text-base'} drop-shadow-sm`}>
            {name}
          </h3>
          
          <div className="flex items-center gap-1.5 text-sm text-card/90 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs drop-shadow-sm">{location}</span>
          </div>

          {/* Social Stats */}
          <div className="flex items-center gap-2.5 text-card/90 flex-wrap">
            {/* KOL Count */}
            {kolCount > 0 && (
              <div className="flex items-center gap-1.5 bg-card/25 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-card/20">
                <Sparkles className="w-3.5 h-3.5 text-[#D4C9BE]" />
                <span className="text-xs">{kolCount}</span>
              </div>
            )}

            {/* Friend Count */}
            {friendCount > 0 && (
              <div className="flex items-center gap-1.5 bg-card/25 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-card/20">
                <UserCheck className="w-3.5 h-3.5 text-[#A9B8C4]" />
                <span className="text-xs">{friendCount}</span>
              </div>
            )}

            {/* Visitor Count */}
            {visitorCount > 0 && (
              <div className="flex items-center gap-1.5 bg-card/25 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-card/20">
                <Users className="w-3.5 h-3.5 text-card/80" />
                <span className="text-xs">{visitorCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}