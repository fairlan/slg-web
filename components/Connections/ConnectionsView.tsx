import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { CircleModal } from './CircleModal';
import { Echoes } from './Echoes';
import { FriendsListView } from './FriendsListView';
import { ConnectionsLoading, ConnectionsEmpty, ConnectionsError } from './ConnectionsStates';

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isGhost: boolean;
  lastActive?: string;
}

export interface Echo {
  id: string;
  friend: Friend;
  placeName: string;
  placeImages: string[]; // 改为数组，支持多图
  placeCategory?: string;
  location: string;
  timestamp: string;
  timeAgo: string; // 如 "2小时前"
  momentType?: 'redpack' | 'coupon' | 'moment';
  comment?: string; // 朋友的评论
  likes: number;
  comments: number;
  mutualFriends?: string[]; // 共同好友名字
  tags?: string[]; // 地点标签
}

interface ConnectionsData {
  friends: Friend[];
  echoes: Echo[];
}

type ViewState = 'loading' | 'content' | 'empty' | 'error';

export function ConnectionsView() {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [data, setData] = useState<ConnectionsData | null>(null);
  const [isCircleModalOpen, setIsCircleModalOpen] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setViewState('loading');
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data
      const mockData: ConnectionsData = {
        friends: [
          {
            id: '1',
            name: '小林',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            isGhost: false,
            lastActive: '2小时前',
          },
          {
            id: '2',
            name: '设计师Amy',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            isGhost: false,
            lastActive: '5小时前',
          },
          {
            id: '3',
            name: 'Coffee Lover',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            isGhost: true,
          },
          {
            id: '4',
            name: '旅行者Jack',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
            isGhost: false,
            lastActive: '1天前',
          },
          {
            id: '5',
            name: '摄影师Lisa',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            isGhost: false,
            lastActive: '刚刚',
          },
        ],
        echoes: [
          {
            id: '1',
            friend: {
              id: '1',
              name: '小林',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
              isGhost: false,
            },
            placeName: '时光咖啡馆',
            placeImages: [
              'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=800',
              'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
            ],
            placeCategory: '咖啡馆',
            location: '上海·静安区',
            timestamp: '2024-12-25 14:30',
            timeAgo: '2小时前',
            comment: '下午的阳光正好，配上手冲咖啡，这才是周末该有的样子 ☕️✨',
            likes: 23,
            comments: 5,
            mutualFriends: ['设计师Amy', '旅行者Jack'],
            tags: ['咖啡', '下午茶', '放松'],
          },
          {
            id: '2',
            friend: {
              id: '2',
              name: '设计师Amy',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              isGhost: false,
            },
            placeName: '云端酒吧',
            placeImages: [
              'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
            ],
            placeCategory: '酒吧',
            location: '北京·朝阳区',
            timestamp: '2024-12-25 11:20',
            timeAgo: '5小时前',
            comment: '52楼的夜景真的绝了！和团队庆功，今天是个好日子 🍾',
            likes: 45,
            comments: 12,
            mutualFriends: ['小林', 'Coffee Lover', '摄影师Lisa'],
            tags: ['酒吧', '夜景', '庆祝'],
          },
          {
            id: '3',
            friend: {
              id: '5',
              name: '摄影师Lisa',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
              isGhost: false,
            },
            placeName: '艺术空间美术馆',
            placeImages: [
              'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800',
              'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800',
              'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
            ],
            placeCategory: '艺术',
            location: '深圳·南山区',
            timestamp: '2024-12-25 10:00',
            timeAgo: '6小时前',
            comment: '新展"光影之间"太震撼了！拍了三个小时还不够 📸',
            likes: 67,
            comments: 18,
            mutualFriends: ['旅行者Jack'],
            tags: ['艺术', '摄影', '展览'],
          },
          {
            id: '4',
            friend: {
              id: '4',
              name: '旅行者Jack',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              isGhost: false,
            },
            placeName: '山顶观景台',
            placeImages: [
              'https://images.unsplash.com/photo-1517398825998-780ca786555f?w=800',
            ],
            placeCategory: '风景',
            location: '杭州·西湖区',
            timestamp: '2024-12-24 17:45',
            timeAgo: '昨天',
            comment: '爬了2小时终于到山顶，这日落值了！🌄',
            likes: 89,
            comments: 24,
            mutualFriends: ['小林', '摄影师Lisa'],
            tags: ['风景', '徒步', '日落'],
          },
          {
            id: '5',
            friend: {
              id: '3',
              name: 'Coffee Lover',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
              isGhost: true,
            },
            placeName: '独立咖啡工作室',
            placeImages: [
              'https://images.unsplash.com/photo-1736230991313-ebf59110ea8c?w=800',
              'https://images.unsplash.com/photo-1559305616-3e42e5d4d151?w=800',
            ],
            placeCategory: '咖啡馆',
            location: '北京·海淀区',
            timestamp: '2024-12-24 15:30',
            timeAgo: '昨天',
            comment: '发现了宝藏咖啡店！豆子是店主自己烘的，手冲技术一流 👌',
            likes: 34,
            comments: 8,
            mutualFriends: ['设计师Amy'],
            tags: ['咖啡', '手冲', '独立店'],
          },
        ],
      };

      setData(mockData);
      setViewState('content');
    };

    fetchData();
  }, []);

  const handleRetry = () => {
    setViewState('loading');
    setTimeout(() => setViewState('content'), 1000);
  };

  if (viewState === 'loading') {
    return <ConnectionsLoading />;
  }

  if (viewState === 'empty') {
    return <ConnectionsEmpty />;
  }

  if (viewState === 'error') {
    return <ConnectionsError onRetry={handleRetry} />;
  }

  if (!data) {
    return <ConnectionsError onRetry={handleRetry} />;
  }

  // Show Friends List View
  if (showFriendsList) {
    return (
      <FriendsListView
        isOpen={showFriendsList}
        onClose={() => setShowFriendsList(false)}
        friends={data.friends}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-6 pt-16 pb-6 flex items-center justify-between">
        <h1 className="text-2xl text-foreground">Moments</h1>
        <button
          onClick={() => setShowFriendsList(true)}
          className="px-4 py-2 rounded-xl bg-secondary hover:bg-accent transition-colors flex items-center gap-2"
          aria-label="朋友"
        >
          <Users className="w-5 h-5 text-foreground" />
          <span className="text-sm text-foreground">朋友</span>
          {data.friends.length > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
              {data.friends.length}
            </span>
          )}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Echoes - Activity Feed */}
        <Echoes echoes={data.echoes} />
      </div>
    </div>
  );
}