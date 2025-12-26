import React from 'react';
import { Coffee, Book, Wine, Palette, Mountain, ShoppingBag, Utensils, Music, Camera, Sparkles, Building2, TreePine, Waves } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CATEGORIES = [
  { id: 'all', label: '全部', icon: null },
  { id: 'cafe', label: '咖啡馆', icon: Coffee },
  { id: 'bookstore', label: '书店', icon: Book },
  { id: 'bar', label: '酒吧', icon: Wine },
  { id: 'art', label: '艺术', icon: Palette },
  { id: 'scenic', label: '风景', icon: Mountain },
  { id: 'market', label: '市集', icon: ShoppingBag },
  { id: 'restaurant', label: '餐厅', icon: Utensils },
  { id: 'music', label: '音乐', icon: Music },
  { id: 'photo', label: '摄影', icon: Camera },
  { id: 'special', label: '特色', icon: Sparkles },
  { id: 'architecture', label: '建筑', icon: Building2 },
  { id: 'nature', label: '自然', icon: TreePine },
  { id: 'waterfront', label: '水景', icon: Waves },
];

export function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  return (
    <div className="bg-background relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      
      {/* Scrollable Categories */}
      <div className="flex gap-2 px-6 py-3 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const isSelected = selectedCategory === (id === 'all' ? null : id);
          
          return (
            <button
              key={id}
              onClick={() => onCategorySelect(id === 'all' ? null : id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}