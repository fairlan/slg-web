import React, { useState, useEffect, useRef } from 'react';
import { FloatingDock } from './components/FloatingDock';
import { DiscoverHeader } from './components/DiscoverHeader';
import { MasonryGrid } from './components/MasonryGrid';
import { CategoryFilter } from './components/CategoryFilter';
import { EmptyState, LoadingState, ErrorState } from './components/DiscoverStates';
import { SearchModal } from './components/SearchModal';
import { ScannerModal } from './components/ScannerModal';
import { LocationModal } from './components/LocationModal';
import { PlaceView } from './components/PlaceView/PlaceView';
import { ConnectionsView } from './components/Connections/ConnectionsView';
import { MeView } from './components/Me/MeView';
import { OnboardingDemo } from './components/Onboarding/OnboardingDemo';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

interface Place {
  id: string;
  name: string;
  category: string;
  coverImage: string;
  location: string;
  rating: number;
  kolCount: number;
  friendCount: number;
  visitorCount: number;
  size?: 'small' | 'medium' | 'large';
}

// Mock data - Rich variety of places
const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: '时光咖啡馆',
    category: '咖啡馆',
    coverImage: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjYWZlfGVufDF8fHx8MTc2NjY2ODk4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: '上海·静安区',
    rating: 4.8,
    kolCount: 5,
    friendCount: 3,
    visitorCount: 127,
    size: 'medium',
  },
  {
    id: '2',
    name: '云端酒吧',
    category: '酒吧',
    coverImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMGJhcnxlbnwxfHx8fDE3NjY2Njg5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '北京·朝阳区',
    rating: 4.9,
    kolCount: 12,
    friendCount: 8,
    visitorCount: 453,
    size: 'small',
  },
  {
    id: '3',
    name: '艺术空间美术馆',
    category: '艺术',
    coverImage: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2NjU3ODQyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    location: '深圳·南山区',
    rating: 4.7,
    kolCount: 8,
    friendCount: 2,
    visitorCount: 234,
    size: 'medium',
  },
  {
    id: '4',
    name: '老城市集',
    category: '市集',
    coverImage: 'https://images.unsplash.com/photo-1567763080747-35963b554bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXJrZXR8ZW58MXx8fHwxNzY2NjY4OTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '成都·锦江区',
    rating: 4.6,
    kolCount: 3,
    friendCount: 15,
    visitorCount: 892,
    size: 'medium',
  },
  {
    id: '5',
    name: '山顶观景台',
    category: '风景',
    coverImage: 'https://images.unsplash.com/photo-1517398825998-780ca786555f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VuaWMlMjB2aWV3cG9pbnR8ZW58MXx8fHwxNzY2NTYzNTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '杭州·西湖区',
    rating: 4.9,
    kolCount: 18,
    friendCount: 6,
    visitorCount: 1245,
    size: 'small',
  },
  {
    id: '6',
    name: '复古书店',
    category: '书店',
    coverImage: 'https://images.unsplash.com/photo-1630147351247-8d7b39d7e681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3Nob3B8ZW58MXx8fHwxNzY2NjY4OTg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '南京·鼓楼区',
    rating: 4.8,
    kolCount: 7,
    friendCount: 4,
    visitorCount: 312,
    size: 'medium',
  },
  {
    id: '7',
    name: '城市森林公园',
    category: '风景',
    coverImage: 'https://images.unsplash.com/photo-1542800952-e5471ed41326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmt8ZW58MXx8fHwxNzY2NTUzMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '广州·天河区',
    rating: 4.5,
    kolCount: 4,
    friendCount: 12,
    visitorCount: 678,
    size: 'small',
  },
  {
    id: '8',
    name: '秘密花园餐厅',
    category: '餐厅',
    coverImage: 'https://images.unsplash.com/photo-1712506243496-39dded877074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NjY2ODk4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: '苏州·姑苏区',
    rating: 4.7,
    kolCount: 9,
    friendCount: 5,
    visitorCount: 423,
    size: 'medium',
  },
  {
    id: '9',
    name: '午夜爵士酒吧',
    category: '酒吧',
    coverImage: 'https://images.unsplash.com/photo-1684006997322-6a5128f44816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NTY1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '上海·徐汇区',
    rating: 4.6,
    kolCount: 11,
    friendCount: 7,
    visitorCount: 567,
    size: 'small',
  },
  {
    id: '10',
    name: '独立咖啡工作室',
    category: '咖啡馆',
    coverImage: 'https://images.unsplash.com/photo-1736230991313-ebf59110ea8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwc3Vuc2V0fGVufDF8fHx8MTc2NjY2ODQ3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    location: '北京·海淀区',
    rating: 4.9,
    kolCount: 6,
    friendCount: 9,
    visitorCount: 345,
    size: 'medium',
  },
  {
    id: '11',
    name: '手工艺术坊',
    category: '艺术',
    coverImage: 'https://images.unsplash.com/photo-1765394029123-1279d4d323d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHJlc3RhdXJhbnQlMjBhbWJpYW5jZXxlbnwxfHx8fDE3NjY2Njg0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '厦门·思明区',
    rating: 4.8,
    kolCount: 5,
    friendCount: 3,
    visitorCount: 189,
    size: 'medium',
  },
  {
    id: '12',
    name: '文艺书屋',
    category: '书店',
    coverImage: 'https://images.unsplash.com/photo-1727342681676-b7b32b273add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYm9va3N0b3JlfGVufDF8fHx8MTc2NjY2ODQ3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    location: '西安·雁塔区',
    rating: 4.7,
    kolCount: 4,
    friendCount: 6,
    visitorCount: 267,
    size: 'small',
  },
];

type ViewState = 'loading' | 'empty' | 'error' | 'content';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'connections' | 'me'>('discover');
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('上海·静安区');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDockVisible, setIsDockVisible] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setViewState('loading');

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Always show content for demo
      setViewState('content');
      setPlaces(MOCK_PLACES);
      setFilteredPlaces(MOCK_PLACES);
    };

    loadData();
  }, []);

  // Filter places by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter(place => {
        const categoryMap: Record<string, string> = {
          'cafe': '咖啡馆',
          'bookstore': '书店',
          'bar': '酒吧',
          'art': '艺术',
          'scenic': '风景',
          'market': '市集',
          'restaurant': '餐厅',
          'music': '音乐',
        };
        return place.category === categoryMap[selectedCategory];
      });
      setFilteredPlaces(filtered);
    }
  }, [selectedCategory, places]);

  // Handle scroll to hide/show dock
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop;
      const scrollingDown = currentScrollY > lastScrollY.current && currentScrollY > 50;

      setIsDockVisible(!scrollingDown);
      lastScrollY.current = currentScrollY;
    };

    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlaceId(place.id);
  };

  const handleTabChange = (tab: 'discover' | 'connections' | 'me') => {
    setActiveTab(tab);
    setSelectedPlaceId(null); // Close place view when changing tabs
  };

  const handleSearch = (query: string) => {
    toast.success(`搜索: ${query}`, {
      description: '正在查找相关内容...',
    });
  };

  const handleScan = () => {
    setIsScannerOpen(true);
  };

  const handleScanSuccess = (code: string) => {
    toast.success('扫描成功', {
      description: `识别到 Aura Code: ${code}`,
    });
  };

  const handleRetry = () => {
    setViewState('loading');
    setTimeout(() => {
      setViewState('content');
      setPlaces(MOCK_PLACES);
      setFilteredPlaces(MOCK_PLACES);
    }, 1000);
  };

  const handleExplore = () => {
    toast.success('探索热门', {
      description: '正在加载热门内容...',
    });
  };

  const renderContent = () => {
    switch (viewState) {
      case 'loading':
        return <LoadingState />;

      case 'empty':
        return (
          <EmptyState
            onExploreClick={handleExplore}
            onSearchClick={() => setIsSearchOpen(true)}
          />
        );

      case 'error':
        return (
          <ErrorState
            onRetry={handleRetry}
            onOfflineView={() => {
              toast.info('离线浏览', {
                description: '正在加载缓存内容...',
              });
            }}
          />
        );

      case 'content':
        return (
          <MasonryGrid
            places={filteredPlaces}
            onPlaceClick={handlePlaceClick}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Show PlaceView if a place is selected */}
      {selectedPlaceId ? (
        <PlaceView
          placeId={selectedPlaceId}
          onBack={() => setSelectedPlaceId(null)}
          onModalStateChange={setIsCreateModalOpen}
        />
      ) : activeTab === 'connections' ? (
        <ConnectionsView />
      ) : activeTab === 'me' ? (
        <MeView onPlaceClick={(placeId) => setSelectedPlaceId(placeId)} />
      ) : (
        <>
          {/* Fixed Header */}
          <DiscoverHeader
            onSearchClick={() => setIsSearchOpen(true)}
            onScanClick={handleScan}
            selectedLocation={selectedLocation}
            onLocationClick={() => setIsLocationOpen(true)}
          />

          {/* Fixed Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain"
          >
            {renderContent()}
          </div>
        </>
      )}

      {/* Bottom Navigation - Hidden when Create Modal is open */}
      {!isCreateModalOpen && (
        <FloatingDock
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />

      <Toaster position="top-center" />
    </div>
  );
}