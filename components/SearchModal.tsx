import React, { useState } from 'react';
import { Search, X, TrendingUp, MapPin } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const TRENDING_SEARCHES = [
  '咖啡馆',
  '书店',
  '屋顶酒吧',
  '艺术展',
  '日落观景点',
  '深夜食堂',
];

export function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      onClose();
    }
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    onSearch(term);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gray-100 rounded-full">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索地点或内容"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-blue-600 px-3 py-1"
          >
            取消
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Trending Searches */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-500" />
            <h3 className="text-gray-700">热门搜索</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handleTrendingClick(term)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-sm transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Locations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-500" />
            <h3 className="text-gray-700">附近推荐</h3>
          </div>
          <div className="space-y-3">
            {['咖啡与书的角落', '城市天台酒吧', '隐藏的艺术空间'].map((place, index) => (
              <button
                key={index}
                onClick={() => handleTrendingClick(place)}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500" />
                  <div>
                    <div className="text-gray-800">{place}</div>
                    <div className="text-sm text-gray-500">距离你 {(Math.random() * 2 + 0.5).toFixed(1)} 公里</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
