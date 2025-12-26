import React from 'react';
import { Loader2, MapPin, RefreshCw, ArrowLeft } from 'lucide-react';

// Loading State
export function PlaceViewLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-base text-foreground mb-2">正在点亮这里的气息…</p>
      <p className="text-sm text-muted-foreground">稍等片刻</p>
    </div>
  );
}

// Empty State
interface PlaceViewEmptyProps {
  onExploreNearby: () => void;
  onBack: () => void;
}

export function PlaceViewEmpty({ onExploreNearby, onBack }: PlaceViewEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <MapPin className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h2 className="text-xl text-foreground mb-2">这里暂时没有可解锁的 Moment</h2>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-xs">
        或许你可以成为第一个在这里留下记忆的人
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onExploreNearby}
          className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300"
        >
          看看附近
        </button>
        
        <button
          onClick={onBack}
          className="w-full py-3 px-6 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-300"
        >
          返回
        </button>
      </div>
    </div>
  );
}

// Error State
interface PlaceViewErrorProps {
  onRetry: () => void;
  onBack: () => void;
  errorMessage?: string;
}

export function PlaceViewError({
  onRetry,
  onBack,
  errorMessage = '连接不到这里的故事',
}: PlaceViewErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <RefreshCw className="w-10 h-10 text-destructive" />
      </div>
      
      <h2 className="text-xl text-foreground mb-2">{errorMessage}</h2>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-xs">
        请检查网络连接后重试
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onRetry}
          className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300"
        >
          重试
        </button>
        
        <button
          onClick={onBack}
          className="w-full py-3 px-6 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-300"
        >
          返回
        </button>
      </div>
    </div>
  );
}

// Hero Loading Placeholder
export function HeroLoadingPlaceholder() {
  return (
    <div className="w-full aspect-[3/4] bg-muted animate-pulse flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
    </div>
  );
}

// Aura Score Skeleton
export function AuraScoreSkeleton() {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div className="w-40 h-40 rounded-full bg-muted animate-pulse" />
      <div className="mt-4 w-24 h-4 bg-muted animate-pulse rounded" />
      <div className="mt-2 w-32 h-3 bg-muted animate-pulse rounded" />
    </div>
  );
}
