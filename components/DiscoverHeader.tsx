import React from 'react';
import { Search, ScanLine, MapPin, ChevronDown } from 'lucide-react';

interface DiscoverHeaderProps {
  onSearchClick: () => void;
  onScanClick: () => void;
  selectedLocation?: string;
  onLocationClick?: () => void;
}

export function DiscoverHeader({ 
  onSearchClick, 
  onScanClick,
  selectedLocation = '上海·静安区',
  onLocationClick 
}: DiscoverHeaderProps) {
  return (
    <header className="bg-background">
      <div className="px-6 pt-16 pb-4 space-y-3">
        {/* Title */}
        <h1 className="text-2xl text-foreground">发现</h1>
        
        {/* Location & Search */}
        <div className="flex items-center gap-2">
          {/* Location Button */}
          <button
            onClick={onLocationClick}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-secondary hover:bg-accent rounded-2xl transition-colors flex-shrink-0"
          >
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{selectedLocation}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-secondary hover:bg-accent transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">搜索地点</span>
          </button>
          
          {/* Scan Button */}
          <button
            onClick={onScanClick}
            className="p-2.5 rounded-2xl bg-secondary hover:bg-accent transition-colors flex-shrink-0"
            aria-label="Scan"
          >
            <ScanLine className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}