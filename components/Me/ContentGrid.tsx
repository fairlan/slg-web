import React from 'react';
import { MapPin } from 'lucide-react';
import type { ContentItem } from './MeView';

interface ContentGridProps {
  items: ContentItem[];
  onPlaceClick?: (placeId: string) => void;
}

export function ContentGrid({ items, onPlaceClick }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
          <MapPin className="w-10 h-10 text-muted-foreground" />
        </div>
        <p className="text-foreground mb-2">没有找到符合条件的内容</p>
        <p className="text-sm text-muted-foreground">尝试调整筛选条件</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} onPlaceClick={onPlaceClick} />
      ))}
    </div>
  );
}

interface ContentCardProps {
  item: ContentItem;
  onPlaceClick?: (placeId: string) => void;
}

function ContentCard({ item, onPlaceClick }: ContentCardProps) {
  const handleClick = () => {
    if (onPlaceClick) {
      onPlaceClick(item.id);
    }
  };

  const getMomentIcon = () => {
    if (!item.momentType) return null;
    
    switch (item.momentType) {
      case 'redpack':
        return '🎁';
      case 'coupon':
        return '🎫';
      case 'moment':
        return '✨';
      default:
        return null;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative aspect-square rounded-2xl overflow-hidden group"
    >
      {/* Image */}
      <img
        src={item.placeImage}
        alt={item.placeName}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Moment Icon */}
      {getMomentIcon() && (
        <div className="absolute top-3 right-3 text-2xl drop-shadow-lg">
          {getMomentIcon()}
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-sm text-white font-medium mb-1 truncate">
          {item.placeName}
        </h3>
        <p className="text-xs text-white/80 truncate">{item.location}</p>
        <p className="text-xs text-white/60 mt-1">{item.timestamp}</p>
      </div>
    </button>
  );
}