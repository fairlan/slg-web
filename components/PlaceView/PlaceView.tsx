import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { HeroMoment } from './HeroMoment';
import { PlaceInfo, PlaceInfoData } from './PlaceInfo';
import { EasterEggs, EasterEgg } from './EasterEggs';
import { ReviewSection } from './ReviewSection';
import { Review } from './ReviewCard';
import { CreateMomentModal } from '../CreateMomentModal';
import {
  PlaceViewLoading,
  PlaceViewEmpty,
  PlaceViewError,
} from './PlaceViewStates';
import { toast } from 'sonner@2.0.3';

export interface PlaceData {
  id: string;
  name: string;
  location: string;
  heroImage: string;
  placeInfo: PlaceInfoData;
  easterEggs: EasterEgg[];
  reviews: Review[];
}

interface PlaceViewProps {
  placeId: string;
  onBack: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
}

type ViewState = 'loading' | 'content' | 'empty' | 'error';

export function PlaceView({ placeId, onBack, onModalStateChange }: PlaceViewProps) {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleModalChange = (isOpen: boolean) => {
    setIsCreateModalOpen(isOpen);
    onModalStateChange?.(isOpen);
  };

  // Simulate data fetching
  useEffect(() => {
    const fetchPlaceData = async () => {
      setViewState('loading');

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data - in production this would be an API call
      const mockData: PlaceData = {
        id: placeId,
        name: '时光咖啡馆',
        location: '上海·静安区',
        heroImage:
          'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjYWZlfGVufDF8fHx8MTc2NjY2ODk4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        placeInfo: {
          name: '时光咖啡馆',
          address: '静安区南京西路 1788 号',
          type: 'cafe',
          hours: '09:00 - 22:00',
          priceRange: '¥30 - ¥60',
          hasWifi: true,
          seats: 40,
        },
        easterEggs: [
          {
            id: '1',
            title: '新用户专享红包',
            type: 'redpack',
            description: '恭喜你发现了这个地点的专属红包',
            author: '时光咖啡馆',
            isLocked: false,
            value: '¥8.88',
          },
          {
            id: '2',
            title: '打卡优惠券',
            type: 'coupon',
            description: '到店出示可享受任意饮品8折优惠',
            author: '老板',
            isLocked: true,
            distance: 5,
            value: '8折',
          },
          {
            id: '3',
            title: '神秘惊喜',
            type: 'surprise',
            description: '走进咖啡馆才能知道的秘密...',
            author: '常客',
            isLocked: true,
            distance: 12,
          },
        ],
        reviews: [
          {
            id: '1',
            author: '咖啡评论家',
            authorAvatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            type: 'kol',
            content:
              '这家咖啡馆的手冲咖啡非常出色,咖啡师对豆子的理解很深。环境安静，适合工作和阅读。推荐他们的埃塞俄比亚日晒。',
            createdAt: '2天前',
            likes: 156,
            replies: 23,
            isLiked: false,
          },
          {
            id: '2',
            author: '小林',
            authorAvatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            type: 'friend',
            content:
              '周末和朋友来这里聊天，氛围很棒！老板很热情，咖啡味道也不错。下次还会再来。',
            createdAt: '3天前',
            likes: 42,
            replies: 5,
            isLiked: true,
          },
          {
            id: '3',
            author: '路人甲',
            type: 'user',
            content: '路过进来喝了杯美式，味道中规中矩，价格合理。',
            createdAt: '1周前',
            likes: 18,
            replies: 2,
            isLiked: false,
          },
        ],
      };

      setPlaceData(mockData);
      setViewState('content');
    };

    fetchPlaceData();
  }, [placeId]);

  const handleMomentClick = (moment: typeof MOCK_MOMENTS[0]) => {
    if (moment.isLocked) {
      toast.info('解锁 Moment', {
        description: `需要前往 ${moment.distance}m 处才能解锁`,
      });
    }
    // Removed toast notification for unlocked moments
  };

  const handleReviewLike = (id: string) => {
    // Handle review like
  };

  const handleReviewReply = (id: string) => {
    toast.info('回复评论', {
      description: '此功能正在开发中...',
    });
  };

  const handleShare = () => {
    toast.success('分享', {
      description: '分享链接已复制',
    });
  };

  const handleExploreNearby = () => {
    toast.success('探索附近', {
      description: '正在查找附近的地点...',
    });
  };

  const handleRetry = () => {
    setViewState('loading');
    setTimeout(() => {
      setViewState('content');
    }, 1000);
  };

  // Render different states
  if (viewState === 'loading') {
    return <PlaceViewLoading />;
  }

  if (viewState === 'empty') {
    return (
      <PlaceViewEmpty onExploreNearby={handleExploreNearby} onBack={onBack} />
    );
  }

  if (viewState === 'error') {
    return <PlaceViewError onRetry={handleRetry} onBack={onBack} />;
  }

  if (!placeData) {
    return <PlaceViewError onRetry={handleRetry} onBack={onBack} />;
  }

  return (
    <div className="fixed inset-0 bg-background z-40 overflow-y-auto overscroll-contain">
      <div className="min-h-full pb-32">
        {/* Hero Moment */}
        <HeroMoment
          imageUrl={placeData.heroImage}
          placeName={placeData.name}
          location={placeData.location}
          onBack={onBack}
          onShare={handleShare}
        />

        {/* Place Info */}
        <PlaceInfo data={placeData.placeInfo} />

        {/* Easter Eggs Section */}
        <EasterEggs
          eggs={placeData.easterEggs}
          onEggClick={handleMomentClick}
        />

        {/* Review Section */}
        <ReviewSection
          reviews={placeData.reviews}
          onLike={handleReviewLike}
          onReply={handleReviewReply}
        />
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => handleModalChange(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center z-20"
        aria-label="创建 Moment"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Create Moment Modal */}
      <CreateMomentModal
        isOpen={isCreateModalOpen}
        onClose={() => handleModalChange(false)}
        placeName={placeData.name}
      />
    </div>
  );
}