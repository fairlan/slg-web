import React, { useState } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';

interface HeroMomentProps {
  imageUrl: string;
  placeName: string;
  location: string;
  onBack: () => void;
  onShare?: () => void;
}

export function HeroMoment({
  imageUrl,
  placeName,
  location,
  onBack,
  onShare,
}: HeroMomentProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden">
      {/* Hero Image */}
      {!imageError ? (
        <img
          src={imageUrl}
          alt={placeName}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-muted-foreground">主视觉暂时缺席</p>
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-card/90 backdrop-blur-md shadow-sm border border-border hover:bg-card transition-colors"
          aria-label="返回"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        
        {onShare && (
          <button
            onClick={onShare}
            className="p-2 rounded-full bg-card/90 backdrop-blur-md shadow-sm border border-border hover:bg-card transition-colors"
            aria-label="分享"
          >
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        )}
      </div>

      {/* Place Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h1 className="text-3xl text-card mb-2 drop-shadow-md">{placeName}</h1>
        <p className="text-sm text-card/90 drop-shadow-sm">{location}</p>
      </div>
    </div>
  );
}
