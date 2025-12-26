import React from 'react';
import { Ghost } from 'lucide-react';
import type { Friend } from './ConnectionsView';

interface CircleProps {
  friends: Friend[];
}

export function Circle({ friends }: CircleProps) {
  if (friends.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4">
      <h2 className="text-sm text-muted-foreground mb-3">亲密好友</h2>
      <div className="flex items-center gap-4 overflow-x-auto pb-2 -mx-6 px-6">
        {friends.map((friend) => (
          <button
            key={friend.id}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className="relative">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-border group-hover:ring-primary transition-all"
              />
              {friend.isGhost && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-muted rounded-full flex items-center justify-center ring-2 ring-background">
                  <Ghost className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
              {!friend.isGhost && friend.lastActive && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-background" />
              )}
            </div>
            <span className="text-xs text-foreground max-w-[70px] truncate">
              {friend.name}
            </span>
            {!friend.isGhost && friend.lastActive && (
              <span className="text-[10px] text-muted-foreground">
                {friend.lastActive}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
