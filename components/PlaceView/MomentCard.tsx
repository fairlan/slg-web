import React from 'react';
import { Lock, Video, Pen, Gift as GiftIcon, MapPin } from 'lucide-react';

export type MomentType = 'time-capsule' | 'ar-note' | 'gift';

interface MomentCardProps {
  id: string;
  title: string;
  type: MomentType;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  thumbnail?: string;
  isLocked: boolean;
  distance?: number; // meters
  onClick: () => void;
}

const MomentTypeConfig = {
  'time-capsule': {
    icon: Video,
    label: '时间胶囊',
    color: '#A9B8C4',
  },
  'ar-note': {
    icon: Pen,
    label: 'AR 笔记',
    color: '#C4B5A9',
  },
  'gift': {
    icon: GiftIcon,
    label: '礼物',
    color: '#D4C9BE',
  },
};

export function MomentCard({
  title,
  type,
  author,
  authorAvatar,
  createdAt,
  thumbnail,
  isLocked,
  distance,
  onClick,
}: MomentCardProps) {
  const config = MomentTypeConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:shadow-md transition-all duration-300 active:scale-[0.98]"
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-muted">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${config.color}15` }}>
            <Icon className="w-6 h-6" style={{ color: config.color }} />
          </div>
        )}
        
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center">
            <Lock className="w-5 h-5 text-card" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base text-foreground truncate">{title}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: `${config.color}15`, color: config.color }}>
            {config.label}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {/* Author */}
          <div className="flex items-center gap-1.5">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={author}
                className="w-4 h-4 rounded-full"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-muted" />
            )}
            <span className="truncate max-w-[100px]">{author}</span>
          </div>

          <span>•</span>
          <span>{createdAt}</span>
        </div>
      </div>

      {/* Distance */}
      {distance !== undefined && (
        <div className="flex-shrink-0 px-3 py-1.5 bg-secondary rounded-full">
          <span className="text-xs text-secondary-foreground">
            {distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(1)}km`}
          </span>
        </div>
      )}
    </button>
  );
}