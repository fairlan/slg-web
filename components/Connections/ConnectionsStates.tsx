import React from 'react';
import { UserPlus, Compass, Loader2, WifiOff } from 'lucide-react';

export function ConnectionsLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <h2 className="text-xl text-foreground mb-2">正在整理好友足迹...</h2>
        <p className="text-sm text-muted-foreground">请稍候</p>
      </div>
    </div>
  );
}

export function ConnectionsEmpty() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
          <UserPlus className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl text-foreground mb-2">这里还安静着</h2>
        <p className="text-sm text-muted-foreground mb-8">
          邀请好友一起探索，分享彼此的足迹
        </p>
        <div className="space-y-3">
          <button className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300">
            邀请好友
          </button>
          <button className="w-full py-3 px-6 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2">
            <Compass className="w-5 h-5" />
            查看推荐
          </button>
        </div>
      </div>
    </div>
  );
}

interface ConnectionsErrorProps {
  onRetry: () => void;
}

export function ConnectionsError({ onRetry }: ConnectionsErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-xl text-foreground mb-2">动态暂时走丢了</h2>
        <p className="text-sm text-muted-foreground mb-8">
          连接不到好友的足迹，请检查网络后重试
        </p>
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300"
          >
            重试
          </button>
          <button className="w-full py-3 px-6 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-300">
            稍后再看
          </button>
        </div>
      </div>
    </div>
  );
}
