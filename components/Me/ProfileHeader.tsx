import React from 'react';
import type { UserProfile } from './MeView';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Avatar - Centered */}
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/20"
          />
        </div>
      </div>

      {/* User Info - Centered */}
      <div className="text-center space-y-2">
        <h2 className="text-xl text-foreground">{profile.username}</h2>
        <p className="text-sm text-muted-foreground">{profile.userId}</p>
        
        {/* Bio */}
        <p className="text-sm text-foreground/80 max-w-md mx-auto px-4">
          {profile.bio}
        </p>

        {/* Tags */}
        {profile.tags.length > 0 && (
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {profile.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}