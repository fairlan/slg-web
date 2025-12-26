import React from 'react';
import { Compass, Users, User } from 'lucide-react';

interface FloatingDockProps {
  activeTab: 'discover' | 'connections' | 'me';
  onTabChange: (tab: 'discover' | 'connections' | 'me') => void;
}

export function FloatingDock({ activeTab, onTabChange }: FloatingDockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {/* Liquid Glass Capsule - Smaller Size */}
      <div className="relative">
        {/* Glass effect background */}
        <div className="bg-card/70 backdrop-blur-2xl rounded-full px-6 py-2.5 shadow-2xl border border-border/30 ring-1 ring-white/10">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onTabChange('discover')}
              className="relative flex flex-col items-center gap-1 transition-all duration-300"
              aria-label="Discover"
            >
              <div className={`transition-all duration-300 ${
                activeTab === 'discover' 
                  ? 'text-primary scale-110' 
                  : 'text-muted-foreground scale-100 hover:scale-105'
              }`}>
                <Compass className={`w-5 h-5 ${activeTab === 'discover' ? 'fill-primary' : ''}`} />
              </div>
              <span className={`text-[10px] transition-all duration-300 ${
                activeTab === 'discover' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                发现
              </span>
              
              {/* Active indicator */}
              {activeTab === 'discover' && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
            </button>

            <button
              onClick={() => onTabChange('connections')}
              className="relative flex flex-col items-center gap-1 transition-all duration-300"
              aria-label="Moments"
            >
              <div className={`transition-all duration-300 ${
                activeTab === 'connections' 
                  ? 'text-primary scale-110' 
                  : 'text-muted-foreground scale-100 hover:scale-105'
              }`}>
                <Users className={`w-5 h-5 ${activeTab === 'connections' ? 'fill-primary' : ''}`} />
              </div>
              <span className={`text-[10px] transition-all duration-300 ${
                activeTab === 'connections' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                朋友
              </span>
              
              {/* Active indicator */}
              {activeTab === 'connections' && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
            </button>

            <button
              onClick={() => onTabChange('me')}
              className="relative flex flex-col items-center gap-1 transition-all duration-300"
              aria-label="Me"
            >
              <div className={`transition-all duration-300 ${
                activeTab === 'me' 
                  ? 'text-primary scale-110' 
                  : 'text-muted-foreground scale-100 hover:scale-105'
              }`}>
                <User className={`w-5 h-5 ${activeTab === 'me' ? 'fill-primary' : ''}`} />
              </div>
              <span className={`text-[10px] transition-all duration-300 ${
                activeTab === 'me' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                我
              </span>
              
              {/* Active indicator */}
              {activeTab === 'me' && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/5 to-transparent -z-10 blur-xl" />
      </div>
    </div>
  );
}