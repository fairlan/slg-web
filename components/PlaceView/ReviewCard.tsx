import React, { useState } from 'react';
import { Heart, MessageCircle, BadgeCheck, UserCheck } from 'lucide-react';

export type ReviewType = 'kol' | 'friend' | 'user';

export interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  type: ReviewType;
  content: string;
  createdAt: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

interface ReviewCardProps {
  review: Review;
  onLike: (id: string) => void;
  onReply: (id: string) => void;
}

export function ReviewCard({ review, onLike, onReply }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(review.isLiked);
  const [likeCount, setLikeCount] = useState(review.likes);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike(review.id);
  };

  const getTypeIcon = () => {
    switch (review.type) {
      case 'kol':
        return <BadgeCheck className="w-4 h-4 text-[#A9B8C4]" />;
      case 'friend':
        return <UserCheck className="w-4 h-4 text-[#C4B5A9]" />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (review.type) {
      case 'kol':
        return 'KOL';
      case 'friend':
        return '朋友';
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
      review.type === 'kol'
        ? 'bg-gradient-to-br from-[#A9B8C4]/5 to-transparent border-[#A9B8C4]/20'
        : review.type === 'friend'
        ? 'bg-gradient-to-br from-[#C4B5A9]/5 to-transparent border-[#C4B5A9]/20'
        : 'bg-card border-border'
    }`}>
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar */}
        {review.authorAvatar ? (
          <img
            src={review.authorAvatar}
            alt={review.author}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted" />
        )}

        {/* Name & Type */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base text-foreground truncate">{review.author}</span>
            {getTypeIcon()}
            {getTypeLabel() && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                review.type === 'kol'
                  ? 'bg-[#A9B8C4]/10 text-[#A9B8C4]'
                  : 'bg-[#C4B5A9]/10 text-[#C4B5A9]'
              }`}>
                {getTypeLabel()}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{review.createdAt}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground mb-3 leading-relaxed">{review.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-colors ${
            isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm">{likeCount}</span>
        </button>

        <button
          onClick={() => onReply(review.id)}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{review.replies}</span>
        </button>
      </div>
    </div>
  );
}
