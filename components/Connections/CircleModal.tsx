import React from 'react';
import { X, Ghost, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Friend } from './ConnectionsView';

interface CircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  friends: Friend[];
}

export function CircleModal({ isOpen, onClose, friends }: CircleModalProps) {
  if (!isOpen) return null;

  const handleFriendClick = (friend: Friend) => {
    if (friend.isGhost) {
      toast.info(`${friend.name} 已隐身`, {
        description: 'TA 暂时不想被打扰',
      });
    } else {
      toast.info(`${friend.name}`, {
        description: `最后活跃: ${friend.lastActive}`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl text-foreground">亲密好友</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {friends.length} 位好友
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted hover:bg-accent transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Friends List */}
        <div className="flex-1 overflow-y-auto p-6">
          {friends.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">暂无好友</p>
              <p className="text-sm text-muted-foreground mt-2">
                邀请好友一起探索吧
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => handleFriendClick(friend)}
                  className="flex flex-col items-center gap-2 group"
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
                  <span className="text-xs text-foreground max-w-[70px] truncate text-center">
                    {friend.name}
                  </span>
                  {!friend.isGhost && friend.lastActive && (
                    <span className="text-[10px] text-muted-foreground text-center">
                      {friend.lastActive}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-border">
          <button
            onClick={() => {
              onClose();
              toast.info('添加好友', {
                description: '此功能正在开发中...',
              });
            }}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:shadow-md transition-all duration-300"
          >
            添加好友
          </button>
        </div>
      </div>
    </div>
  );
}
