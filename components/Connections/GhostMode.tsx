import React from 'react';
import { Ghost, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface GhostModeProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function GhostMode({ isEnabled, onToggle }: GhostModeProps) {
  const handleToggle = () => {
    onToggle(!isEnabled);
    toast.success(isEnabled ? '已关闭隐身模式' : '已开启隐身模式', {
      description: isEnabled
        ? '好友现在可以看到你的足迹'
        : '好友现在看不到你的足迹',
      icon: isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />,
    });
  };

  return (
    <div className="px-6 py-4">
      <button
        onClick={handleToggle}
        className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
          isEnabled
            ? 'bg-muted/50 border-muted-foreground/30'
            : 'bg-background border-border hover:border-primary/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isEnabled ? 'bg-muted-foreground/20' : 'bg-primary/10'
              }`}
            >
              {isEnabled ? (
                <Ghost className="w-6 h-6 text-muted-foreground" />
              ) : (
                <Eye className="w-6 h-6 text-primary" />
              )}
            </div>
            <div className="text-left">
              <h3 className="text-base text-foreground">
                Ghost Mode {isEnabled ? '开启中' : ''}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isEnabled
                  ? '你的足迹对好友隐形'
                  : '让你的足迹对好友隐形'}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <div
            className={`w-14 h-8 rounded-full transition-colors relative ${
              isEnabled ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-background shadow-md transition-transform ${
                isEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
