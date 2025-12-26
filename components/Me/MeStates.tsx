import React from 'react';
import { Compass, Plus, Loader2, WifiOff } from 'lucide-react';

export function MeLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <h2 className="text-xl text-foreground mb-2">正在整理你的记录...</h2>
        <p className="text-sm text-muted-foreground">请稍候</p>
      </div>
    </div>
  );
}

export function MeEmpty() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
          <Plus className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl text-foreground mb-2">这里还没有被收藏的故事</h2>
        <p className="text-sm text-muted-foreground mb-8">
          开始探索，创建你的第一个 Moment
        </p>
        <div className="space-y-3">
          <button className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
            <Compass className="w-5 h-5" />
            去 Discover
          </button>
          <button className="w-full py-3 px-6 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            创建 Moment
          </button>
        </div>
      </div>
    </div>
  );
}

interface MeErrorProps {
  onRetry: () => void;
}

export function MeError({ onRetry }: MeErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-xl text-foreground mb-2">资料暂时没加载出来</h2>
        <p className="text-sm text-muted-foreground mb-8">
          暂时连不上你的记录，请检查网络后重试
        </p>
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300"
          >
            重试
          </button>
          <button className="w-full py-3 px-6 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-300">
            返回
          </button>
        </div>
      </div>
    </div>
  );
}
