import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { MinimalStatsCard } from './MinimalStatsCard';
import { SmartFilter } from './SmartFilter';
import { ContentGrid } from './ContentGrid';
import { MapView } from './MapView';
import { MenuView } from './MenuView';
import { MeLoading, MeEmpty, MeError } from './MeStates';
import { CinematicIntro } from '../Onboarding/CinematicIntro';
import { SignInScreen } from '../Onboarding/SignInScreen';
import { PermissionScreen } from '../Onboarding/PermissionScreen';

export interface UserProfile {
  id: string;
  username: string;
  userId: string;
  avatar: string;
  bio: string;
  tags: string[];
  isOwnProfile: boolean;
}

export interface ContentItem {
  id: string;
  placeName: string;
  placeImage: string;
  location: string;
  timestamp: string;
  momentType?: 'redpack' | 'coupon' | 'moment';
}

interface StatsData {
  totalPlaces: number;
  totalCities: number;
  totalInteractions: number;
}

interface LevelData {
  currentLevel: number;
  levelName: string;
  currentExp: number;
  nextLevelExp: number;
  percentage: number;
}

interface MeData {
  profile: UserProfile;
  stats: StatsData;
  level: LevelData;
  items: ContentItem[];
}

type ViewState = 'loading' | 'content' | 'empty' | 'error';
type ViewMode = 'grid' | 'map';

interface MeViewProps {
  onPlaceClick?: (placeId: string) => void;
}

export function MeView({ onPlaceClick }: MeViewProps) {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [data, setData] = useState<MeData | null>(null);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setViewState('loading');
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data
      const mockData: MeData = {
        profile: {
          id: '1',
          username: '旅行者',
          userId: '@traveler_2024',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
          bio: '用心感受每一个瞬间 ✨',
          tags: ['咖啡爱好者', '城市探索'],
          isOwnProfile: true,
        },
        stats: {
          totalPlaces: 28,
          totalCities: 6,
          totalInteractions: 132,
        },
        level: {
          currentLevel: 5,
          levelName: '探索者',
          currentExp: 1250,
          nextLevelExp: 2000,
          percentage: 62.5,
        },
        items: [
          {
            id: '1',
            placeName: '时光咖啡馆',
            placeImage: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=400',
            location: '上海·静安区',
            timestamp: '2小时前',
            momentType: 'moment',
          },
          {
            id: '2',
            placeName: '云端酒吧',
            placeImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400',
            location: '北京·朝阳区',
            timestamp: '1天前',
            momentType: 'redpack',
          },
          {
            id: '3',
            placeName: '艺术书店',
            placeImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
            location: '杭州·西湖区',
            timestamp: '3天前',
          },
          {
            id: '4',
            placeName: '秘境餐厅',
            placeImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
            location: '成都·武侯区',
            timestamp: '5天前',
            momentType: 'coupon',
          },
          {
            id: '5',
            placeName: '天空观景台',
            placeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            location: '深圳·南山区',
            timestamp: '1周前',
          },
          {
            id: '6',
            placeName: '港湾咖啡',
            placeImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
            location: '广州·天河区',
            timestamp: '1周前',
          },
          {
            id: '7',
            placeName: '山顶酒店',
            placeImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
            location: '杭州·西湖区',
            timestamp: '2周前',
          },
          {
            id: '8',
            placeName: '老城市集',
            placeImage: 'https://images.unsplash.com/photo-1567763080747-35963b554bbd?w=400',
            location: '成都·锦江区',
            timestamp: '2周前',
          },
        ],
      };

      setData(mockData);
      setFilteredItems(mockData.items);
      setViewState('content');
    };

    fetchData();
  }, []);

  const handleRetry = () => {
    setViewState('loading');
    setTimeout(() => setViewState('content'), 1000);
  };

  if (viewState === 'loading') {
    return <MeLoading />;
  }

  if (viewState === 'empty') {
    return <MeEmpty />;
  }

  if (viewState === 'error') {
    return <MeError onRetry={handleRetry} />;
  }

  if (!data) {
    return <MeError onRetry={handleRetry} />;
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Menu Button - Fixed Top Right */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-16 right-6 z-40 w-10 h-10 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center shadow-lg"
        aria-label="菜单"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Menu View */}
      {isMenuOpen && (
        <MenuView
          onClose={() => setIsMenuOpen(false)}
          onOpenOnboarding={() => {
            setIsMenuOpen(false);
            setIsOnboardingOpen(true);
          }}
        />
      )}

      {/* Onboarding View */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="h-full w-full">
            {/* Import OnboardingDemo */}
            <OnboardingContent onClose={() => setIsOnboardingOpen(false)} />
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 pb-32">
          {/* Profile Header */}
          <div className="px-6 pt-16">
            <ProfileHeader profile={data.profile} />
          </div>

          {/* Stats & Level */}
          <div className="px-6">
            <MinimalStatsCard stats={data.stats} level={data.level} />
          </div>

          {/* Smart Filter & Content */}
          <div className="px-6 space-y-4">
            <SmartFilter
              items={data.items}
              onFilteredItems={setFilteredItems}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            {viewMode === 'grid' ? (
              <ContentGrid items={filteredItems} onPlaceClick={onPlaceClick} />
            ) : (
              <MapView items={filteredItems} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Onboarding Content Component
function OnboardingContent({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'signin' | 'permission' | 'complete'>('intro');

  const handleComplete = () => {
    onClose();
  };

  return (
    <div className="relative h-full w-full">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-[101] px-4 py-2 bg-background/80 backdrop-blur-sm text-foreground rounded-xl border border-border hover:bg-accent transition-colors text-sm"
      >
        关闭
      </button>

      {/* Onboarding Screens */}
      {currentStep === 'intro' && (
        <CinematicIntro
          onComplete={() => setCurrentStep('signin')}
          onSkip={() => setCurrentStep('signin')}
        />
      )}

      {currentStep === 'signin' && (
        <SignInScreen
          onSignInSuccess={() => setCurrentStep('permission')}
          onSkip={handleComplete}
        />
      )}

      {currentStep === 'permission' && (
        <PermissionScreen
          onAllow={handleComplete}
          onSkip={handleComplete}
        />
      )}
    </div>
  );
}