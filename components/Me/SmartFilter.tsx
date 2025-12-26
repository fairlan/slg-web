import React, { useState } from 'react';
import { MapPin, Hotel, UtensilsCrossed, Landmark, ShoppingBag, Coffee, LayoutGrid, Map } from 'lucide-react';
import type { ContentItem } from './MeView';

type PlaceType = 'all' | 'hotel' | 'restaurant' | 'attraction' | 'shopping' | 'cafe';
type ViewMode = 'grid' | 'map';

interface SmartFilterProps {
  items: ContentItem[];
  onFilteredItems: (items: ContentItem[]) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

const CITIES = ['全部', '上海', '北京', '杭州', '成都', '深圳', '广州'];

const PLACE_TYPES = [
  { id: 'all' as const, label: '全部类型', icon: MapPin },
  { id: 'hotel' as const, label: '酒店', icon: Hotel },
  { id: 'restaurant' as const, label: '餐厅', icon: UtensilsCrossed },
  { id: 'attraction' as const, label: '景点', icon: Landmark },
  { id: 'shopping' as const, label: '商场', icon: ShoppingBag },
  { id: 'cafe' as const, label: '咖啡', icon: Coffee },
];

export function SmartFilter({ items, onFilteredItems, viewMode, onViewModeChange }: SmartFilterProps) {
  const [selectedCity, setSelectedCity] = useState('全部');
  const [selectedType, setSelectedType] = useState<PlaceType>('all');

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    applyFilters(city, selectedType);
  };

  const handleTypeSelect = (type: PlaceType) => {
    setSelectedType(type);
    applyFilters(selectedCity, type);
  };

  const applyFilters = (city: string, type: PlaceType) => {
    let filtered = [...items];

    // Filter by city
    if (city !== '全部') {
      filtered = filtered.filter(item => item.location.includes(city));
    }

    // Filter by type
    if (type !== 'all') {
      filtered = filtered.filter(item => {
        const name = item.placeName.toLowerCase();
        switch (type) {
          case 'hotel':
            return name.includes('酒店') || name.includes('hotel');
          case 'restaurant':
            return name.includes('餐厅') || name.includes('restaurant') || name.includes('厨房');
          case 'attraction':
            return name.includes('公园') || name.includes('博物馆') || name.includes('景区') || name.includes('观景');
          case 'shopping':
            return name.includes('商场') || name.includes('广场') || name.includes('mall') || name.includes('市集');
          case 'cafe':
            return name.includes('咖啡') || name.includes('cafe') || name.includes('coffee');
          default:
            return true;
        }
      });
    }

    onFilteredItems(filtered);
  };

  return (
    <div className="space-y-3">
      {/* Title with View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-foreground">我的足迹</h3>
        {onViewModeChange && (
          <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                viewMode === 'grid'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>网格</span>
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                viewMode === 'map'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>地图</span>
            </button>
          </div>
        )}
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">城市</div>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCity === city
                  ? 'bg-foreground text-background'
                  : 'bg-card text-card-foreground border border-border hover:border-foreground/30'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">类型</div>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {PLACE_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedType === type.id
                    ? 'bg-foreground text-background'
                    : 'bg-card text-card-foreground border border-border hover:border-foreground/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}