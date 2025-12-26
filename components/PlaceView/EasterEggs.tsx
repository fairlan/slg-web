import React from 'react';
import { Gift, Lock, Sparkles } from 'lucide-react';

export type EasterEggType = 'redpack' | 'coupon' | 'surprise';

export interface EasterEgg {
  id: string;
  type: EasterEggType;
  title: string;
  description: string;
  author: string;
  isLocked: boolean;
  distance?: number;
  value?: string; // For redpack amount or coupon code
}

interface EasterEggsProps {
  eggs: EasterEgg[];
  onEggClick: (egg: EasterEgg) => void;
}

export function EasterEggs({ eggs, onEggClick }: EasterEggsProps) {
  if (eggs.length === 0) return null;

  return (
    <div className="px-4 py-6 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl text-foreground">彩蛋</h2>
        <span className="text-sm text-muted-foreground">{eggs.length} 个</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {eggs.map((egg) => (
          <EasterEggCard
            key={egg.id}
            egg={egg}
            onClick={() => onEggClick(egg)}
          />
        ))}
      </div>
    </div>
  );
}

interface EasterEggCardProps {
  egg: EasterEgg;
  onClick: () => void;
}

function EasterEggCard({ egg, onClick }: EasterEggCardProps) {
  const getIcon = () => {
    switch (egg.type) {
      case 'redpack':
        return Gift;
      case 'coupon':
        return Gift;
      case 'surprise':
        return Sparkles;
    }
  };

  const getGradient = () => {
    switch (egg.type) {
      case 'redpack':
        return 'from-red-500/10 to-orange-500/10';
      case 'coupon':
        return 'from-blue-500/10 to-purple-500/10';
      case 'surprise':
        return 'from-yellow-500/10 to-pink-500/10';
    }
  };

  const Icon = getIcon();

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl bg-gradient-to-br ${getGradient()} border border-border/50 hover:border-primary/30 transition-all duration-300 active:scale-98 text-left relative overflow-hidden group`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl transform -translate-x-16 translate-y-16" />
      </div>

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center ${
          egg.isLocked ? 'opacity-60' : ''
        }`}>
          {egg.isLocked ? (
            <Lock className="w-6 h-6 text-muted-foreground" />
          ) : (
            <Icon className="w-6 h-6 text-primary" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base text-foreground truncate">{egg.title}</h3>
            {egg.value && !egg.isLocked && (
              <span className="text-sm text-primary font-medium whitespace-nowrap">
                {egg.value}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {egg.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>来自 {egg.author}</span>
            {egg.isLocked && egg.distance !== undefined && (
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {egg.distance}m 可解锁
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Shimmer Effect */}
      {!egg.isLocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  );
}
