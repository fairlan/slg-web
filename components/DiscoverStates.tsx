import React from 'react';
import { Search, TrendingUp, RefreshCw, WifiOff } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function EmptyState({
  onExploreClick,
  onSearchClick,
}: {
  onExploreClick: () => void;
  onSearchClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-xl mb-2 text-gray-800">这里还没有新的发现</h3>
      <p className="text-gray-500 mb-8 max-w-sm">
        探索热门地点，或者搜索你感兴趣的内容
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onExploreClick}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span>去看看热门</span>
          </div>
        </button>
        <button
          onClick={onSearchClick}
          className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        >
          开始搜索
        </button>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="px-4 py-6">
      <div className="text-center mb-6 text-gray-500 text-sm">正在为你铺开风景…</div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl overflow-hidden bg-white shadow-sm">
            <Skeleton className="w-full aspect-[4/3]" />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErrorState({
  onRetry,
  onOfflineView,
}: {
  onRetry: () => void;
  onOfflineView: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <WifiOff className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl mb-2 text-gray-800">网络有点远，暂时连不上</h3>
      <p className="text-gray-500 mb-8 max-w-sm">
        请检查网络连接后重试
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onRetry}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" />
            <span>重试</span>
          </div>
        </button>
        <button
          onClick={onOfflineView}
          className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        >
          离线浏览
        </button>
      </div>
    </div>
  );
}
