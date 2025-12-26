import React, { useState } from 'react';
import { X, MapPin, Navigation, ChevronRight } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
}

const CITIES = [
  {
    name: '当前位置',
    districts: ['自动定位'],
    icon: Navigation,
  },
  {
    name: '上海',
    districts: ['静安区', '徐汇区', '黄浦区', '长宁区', '浦东新区', '杨浦区'],
  },
  {
    name: '北京',
    districts: ['朝阳区', '海淀区', '东城区', '西城区', '丰台区', '通州区'],
  },
  {
    name: '杭州',
    districts: ['西湖区', '滨江区', '上城区', '拱墅区', '余杭区', '萧山区'],
  },
  {
    name: '成都',
    districts: ['武侯区', '锦江区', '青羊区', '金牛区', '成华区', '高新区'],
  },
  {
    name: '深圳',
    districts: ['南山区', '福田区', '罗湖区', '宝安区', '龙华区', '龙岗区'],
  },
  {
    name: '广州',
    districts: ['天河区', '越秀区', '海珠区', '荔湾区', '白云区', '番禺区'],
  },
];

export function LocationModal({ isOpen, onClose, selectedLocation, onLocationSelect }: LocationModalProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLocationSelect = (city: string, district: string) => {
    if (city === '当前位置') {
      onLocationSelect('当前位置');
    } else {
      onLocationSelect(`${city}·${district}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full sm:max-w-lg bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/50">
          <h2 className="text-xl text-foreground">选择位置</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedCity ? (
            // District List
            <div className="p-6 space-y-2">
              <button
                onClick={() => setSelectedCity(null)}
                className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>返回城市列表</span>
              </button>
              
              {CITIES.find(c => c.name === selectedCity)?.districts.map((district) => {
                const fullLocation = selectedCity === '当前位置' ? '当前位置' : `${selectedCity}·${district}`;
                const isSelected = selectedLocation === fullLocation;
                
                return (
                  <button
                    key={district}
                    onClick={() => handleLocationSelect(selectedCity, district)}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-accent'
                    }`}
                  >
                    {district}
                  </button>
                );
              })}
            </div>
          ) : (
            // City List
            <div className="p-6 space-y-2">
              {CITIES.map((city) => {
                const Icon = city.icon || MapPin;
                
                return (
                  <button
                    key={city.name}
                    onClick={() => setSelectedCity(city.name)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-secondary text-foreground hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span>{city.name}</span>
                      {city.name !== '当前位置' && (
                        <span className="text-xs text-muted-foreground">
                          {city.districts.length} 个区域
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
