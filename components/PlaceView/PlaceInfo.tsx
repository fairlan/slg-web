import React from 'react';
import { MapPin, Clock, DollarSign, Wifi, Users, Utensils, Music, BookOpen, Image as ImageIcon, Mountain, Hotel, ShoppingBag } from 'lucide-react';

export type PlaceType = 'cafe' | 'restaurant' | 'bar' | 'bookstore' | 'art' | 'scenic' | 'hotel' | 'market';

interface BasePlaceInfo {
  name: string;
  address: string;
  type: PlaceType;
}

interface CafeInfo extends BasePlaceInfo {
  type: 'cafe';
  hours: string;
  priceRange: string;
  hasWifi: boolean;
  seats: number;
}

interface RestaurantInfo extends BasePlaceInfo {
  type: 'restaurant';
  hours: string;
  priceRange: string;
  cuisine: string;
  signature: string[];
}

interface BarInfo extends BasePlaceInfo {
  type: 'bar';
  hours: string;
  priceRange: string;
  vibe: string;
  musicType: string;
}

interface BookstoreInfo extends BasePlaceInfo {
  type: 'bookstore';
  hours: string;
  specialty: string;
  hasReadingArea: boolean;
  events: string[];
}

interface ArtInfo extends BasePlaceInfo {
  type: 'art';
  hours: string;
  exhibition: string;
  ticketPrice: string;
}

interface ScenicInfo extends BasePlaceInfo {
  type: 'scenic';
  bestTime: string;
  difficulty: string;
  equipment: string[];
}

interface HotelInfo extends BasePlaceInfo {
  type: 'hotel';
  priceRange: string;
  facilities: string[];
  rooms: number;
  rating: number;
}

interface MarketInfo extends BasePlaceInfo {
  type: 'market';
  hours: string;
  stalls: number;
  specialty: string[];
}

export type PlaceInfoData = CafeInfo | RestaurantInfo | BarInfo | BookstoreInfo | ArtInfo | ScenicInfo | HotelInfo | MarketInfo;

interface PlaceInfoProps {
  data: PlaceInfoData;
}

export function PlaceInfo({ data: info }: PlaceInfoProps) {
  const renderTypeSpecificInfo = () => {
    switch (info.type) {
      case 'cafe':
        return (
          <>
            <InfoItem icon={Clock} label="营业时间" value={info.hours} />
            <InfoItem icon={DollarSign} label="价格区间" value={info.priceRange} />
            <InfoItem icon={Wifi} label="WiFi" value={info.hasWifi ? '可用' : '不可用'} />
            <InfoItem icon={Users} label="座位数" value={`约 ${info.seats} 个`} />
          </>
        );

      case 'restaurant':
        return (
          <>
            <InfoItem icon={Clock} label="营业时间" value={info.hours} />
            <InfoItem icon={DollarSign} label="价格区间" value={info.priceRange} />
            <InfoItem icon={Utensils} label="菜系" value={info.cuisine} />
            {info.signature.length > 0 && (
              <InfoItem icon={Utensils} label="推荐菜品" value={info.signature.join('、')} />
            )}
          </>
        );

      case 'bar':
        return (
          <>
            <InfoItem icon={Clock} label="营业时间" value={info.hours} />
            <InfoItem icon={DollarSign} label="价格区间" value={info.priceRange} />
            <InfoItem icon={Music} label="音乐类型" value={info.musicType} />
            <InfoItem icon={Users} label="氛围" value={info.vibe} />
          </>
        );

      case 'bookstore':
        return (
          <>
            <InfoItem icon={Clock} label="营业时间" value={info.hours} />
            <InfoItem icon={BookOpen} label="特色书籍" value={info.specialty} />
            <InfoItem icon={Users} label="阅读区" value={info.hasReadingArea ? '有' : '无'} />
            {info.events.length > 0 && (
              <InfoItem icon={BookOpen} label="活动" value={info.events.join('、')} />
            )}
          </>
        );

      case 'art':
        return (
          <>
            <InfoItem icon={Clock} label="开放时间" value={info.hours} />
            <InfoItem icon={ImageIcon} label="展览信息" value={info.exhibition} />
            <InfoItem icon={DollarSign} label="门票价格" value={info.ticketPrice} />
          </>
        );

      case 'scenic':
        return (
          <>
            <InfoItem icon={Clock} label="最佳观赏" value={info.bestTime} />
            <InfoItem icon={Mountain} label="难度" value={info.difficulty} />
            {info.equipment.length > 0 && (
              <InfoItem icon={Mountain} label="建议装备" value={info.equipment.join('、')} />
            )}
          </>
        );

      case 'hotel':
        return (
          <>
            <InfoItem icon={DollarSign} label="价格区间" value={info.priceRange} />
            <InfoItem icon={Users} label="房间数" value={`${info.rooms} 间`} />
            <InfoItem icon={Hotel} label="设施" value={info.facilities.join('、')} />
          </>
        );

      case 'market':
        return (
          <>
            <InfoItem icon={Clock} label="开放时间" value={info.hours} />
            <InfoItem icon={ShoppingBag} label="摊位数" value={`约 ${info.stalls} 个`} />
            <InfoItem icon={ShoppingBag} label="特色商品" value={info.specialty.join('、')} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl text-foreground mb-4">地点信息</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <InfoItem icon={MapPin} label="地址" value={info.address} fullWidth />
        {renderTypeSpecificInfo()}
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  fullWidth?: boolean;
}

function InfoItem({ icon: Icon, label, value, fullWidth }: InfoItemProps) {
  return (
    <div className={`flex items-start gap-2 p-3 bg-muted/30 rounded-xl ${fullWidth ? 'col-span-2' : ''}`}>
      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}