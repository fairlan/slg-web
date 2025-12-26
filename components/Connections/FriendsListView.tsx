import React, { useState } from 'react';
import { ArrowLeft, Search, UserPlus, MoreVertical } from 'lucide-react';
import { Friend } from './ConnectionsView';

interface FriendsListViewProps {
  friends: Friend[];
  isOpen: boolean;
  onClose: () => void;
}

export function FriendsListView({ friends, isOpen, onClose }: FriendsListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'ghost'>('all');

  if (!isOpen) return null;

  // Filter friends based on search and filter
  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      selectedFilter === 'all' ? true :
      selectedFilter === 'ghost' ? friend.isGhost :
      !friend.isGhost;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-16 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center"
              aria-label="返回"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-2xl text-foreground">朋友</h1>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
            aria-label="添加朋友"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索朋友..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-secondary rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <FilterTab
            label="全部"
            count={friends.length}
            isActive={selectedFilter === 'all'}
            onClick={() => setSelectedFilter('all')}
          />
          <FilterTab
            label="活跃"
            count={friends.filter(f => !f.isGhost).length}
            isActive={selectedFilter === 'active'}
            onClick={() => setSelectedFilter('active')}
          />
          <FilterTab
            label="Ghost"
            count={friends.filter(f => f.isGhost).length}
            isActive={selectedFilter === 'ghost'}
            onClick={() => setSelectedFilter('ghost')}
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-6 space-y-2">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? '没有找到匹配的朋友' : '还没有朋友'}
              </p>
            </div>
          ) : (
            filteredFriends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface FilterTabProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

function FilterTab({ label, count, isActive, onClick }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl transition-all ${
        isActive
          ? 'bg-foreground text-background'
          : 'bg-secondary text-foreground hover:bg-accent'
      }`}
    >
      <span className="text-sm">
        {label} {count}
      </span>
    </button>
  );
}

interface FriendCardProps {
  friend: Friend;
}

function FriendCard({ friend }: FriendCardProps) {
  return (
    <div
      className="w-full flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:bg-accent/50 transition-colors group cursor-pointer"
      onClick={() => console.log('View friend:', friend.id)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={friend.avatar}
          alt={friend.name}
          className={`w-14 h-14 rounded-full object-cover ${
            friend.isGhost ? 'opacity-40' : ''
          }`}
        />
        {!friend.isGhost && friend.lastActive === '刚刚' && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full ring-2 ring-background" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm text-foreground truncate ${
            friend.isGhost ? 'opacity-60' : ''
          }`}>
            {friend.name}
          </h3>
          {friend.isGhost && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
              Ghost
            </span>
          )}
        </div>
        {!friend.isGhost && friend.lastActive && (
          <p className="text-xs text-muted-foreground mt-1">
            {friend.lastActive}活跃
          </p>
        )}
      </div>

      {/* Action */}
      <button
        className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-secondary transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          console.log('More actions:', friend.id);
        }}
      >
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}