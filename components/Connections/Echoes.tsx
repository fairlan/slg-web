import React, { useState } from 'react';
import { MapPin, Heart, MessageCircle, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Echo } from './ConnectionsView';

interface EchoesProps {
  echoes: Echo[];
}

export function Echoes({ echoes }: EchoesProps) {
  if (echoes.length === 0) {
    return (
      <div className="px-6 py-12 text-center">
        <p className="text-muted-foreground">暂无好友动态</p>
        <p className="text-sm text-muted-foreground mt-2">
          邀请好友一起探索吧
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {echoes.map((echo) => (
        <EchoCard key={echo.id} echo={echo} />
      ))}
    </div>
  );
}

interface EchoCardProps {
  echo: Echo;
}

function EchoCard({ echo }: EchoCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(echo.likes);

  const handlePlaceClick = () => {
    toast.info(echo.placeName, {
      description: `在 ${echo.location}`,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    toast.info('评论', {
      description: `回复 ${echo.friend.name}`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === echo.placeImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? echo.placeImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-card border-b border-border/30">
      {/* User Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <img
          src={echo.friend.avatar}
          alt={echo.friend.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-sm text-foreground">{echo.friend.name}</h3>
          <p className="text-xs text-muted-foreground">
            {echo.timeAgo} · {echo.location}
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-black aspect-square">
        <img
          src={echo.placeImages[currentImageIndex]}
          alt={echo.placeName}
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        {echo.placeImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {echo.placeImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 space-y-3">
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 transition-colors"
          >
            <Heart
              className={`w-6 h-6 transition-all ${
                isLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-foreground hover:text-red-500'
              }`}
            />
            <span className="text-sm text-foreground">{likeCount}</span>
          </button>
          
          <button
            onClick={handleComment}
            className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">{echo.comments}</span>
          </button>
        </div>

        {/* Place Name */}
        <button
          onClick={handlePlaceClick}
          className="flex items-center gap-2 text-left group"
        >
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
            {echo.placeName}
          </span>
        </button>

        {/* Comment */}
        {echo.comment && (
          <p className="text-sm text-foreground leading-relaxed">
            <span className="mr-2">{echo.friend.name}</span>
            {echo.comment}
          </p>
        )}

        {/* Tags */}
        {echo.tags && echo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {echo.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Mutual Friends */}
        {echo.mutualFriends && echo.mutualFriends.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>
              {echo.mutualFriends.slice(0, 2).join('、')}
              {echo.mutualFriends.length > 2 && ` 等${echo.mutualFriends.length}人`}
              也来过
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
