import React, { useState } from 'react';
import { ReviewCard, Review, ReviewType } from './ReviewCard';

interface ReviewSectionProps {
  reviews: Review[];
  onLike: (id: string) => void;
  onReply: (id: string) => void;
}

type FilterType = ReviewType;

export function ReviewSection({ reviews, onLike, onReply }: ReviewSectionProps) {
  const [filter, setFilter] = useState<FilterType>('kol');

  if (reviews.length === 0) {
    return (
      <div className="px-4 py-8">
        <h2 className="text-xl text-foreground mb-4">评论</h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">暂无评论</p>
          <p className="text-sm text-muted-foreground mt-2">成为第一个分享体验的人</p>
        </div>
      </div>
    );
  }

  // Filter reviews based on selected type
  const filteredReviews = reviews.filter(review => review.type === filter);

  // Sort reviews: newest first
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    // Add timestamp sorting if needed
    return 0;
  });

  // Count reviews by type
  const counts = {
    kol: reviews.filter(r => r.type === 'kol').length,
    friend: reviews.filter(r => r.type === 'friend').length,
    user: reviews.filter(r => r.type === 'user').length,
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-foreground">评论</h2>
        <span className="text-sm text-muted-foreground">{filteredReviews.length} 条</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        <FilterButton
          label="KOL"
          count={counts.kol}
          isActive={filter === 'kol'}
          onClick={() => setFilter('kol')}
          color="#A9B8C4"
        />
        <FilterButton
          label="朋友"
          count={counts.friend}
          isActive={filter === 'friend'}
          onClick={() => setFilter('friend')}
          color="#C4B5A9"
        />
        <FilterButton
          label="网友"
          count={counts.user}
          isActive={filter === 'user'}
          onClick={() => setFilter('user')}
        />
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">暂无{filter === 'kol' ? 'KOL' : filter === 'friend' ? '朋友' : '网友'}评论</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onLike={onLike}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}

function FilterButton({ label, count, isActive, onClick, color }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap ${
        isActive
          ? 'text-primary-foreground shadow-md'
          : 'bg-secondary text-secondary-foreground hover:bg-accent'
      }`}
      style={{
        backgroundColor: isActive ? (color || 'var(--primary)') : undefined,
      }}
    >
      <span className="text-sm">
        {label} {count > 0 && `(${count})`}
      </span>
    </button>
  );
}