import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Lock, 
  Heart, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Sparkles,
  Moon,
  Globe,
  Shield,
  Info
} from 'lucide-react';

interface MenuViewProps {
  onClose: () => void;
  onOpenOnboarding: () => void;
}

export function MenuView({ onClose, onOpenOnboarding }: MenuViewProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-16 pb-6">
        <h1 className="text-2xl text-foreground">设置</h1>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center"
        >
          <span className="text-xl">✕</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100vh-120px)] overflow-y-auto px-6 pb-32">
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* Account Section */}
          <MenuSection title="账户">
            <MenuItem
              icon={<User className="w-5 h-5" />}
              label="个人资料"
              onClick={() => console.log('个人资料')}
            />
            <MenuItem
              icon={<Bell className="w-5 h-5" />}
              label="通知"
              badge="3"
              onClick={() => console.log('通知')}
            />
            <MenuItem
              icon={<Lock className="w-5 h-5" />}
              label="隐私与安全"
              onClick={() => console.log('隐私')}
            />
          </MenuSection>

          {/* Preferences Section */}
          <MenuSection title="偏好设置">
            <MenuItem
              icon={<Moon className="w-5 h-5" />}
              label="深色模式"
              hasToggle
              isToggled={true}
              onClick={() => console.log('深色模式')}
            />
            <MenuItem
              icon={<Globe className="w-5 h-5" />}
              label="语言"
              value="简体中文"
              onClick={() => console.log('语言')}
            />
          </MenuSection>

          {/* Experience Section */}
          <MenuSection title="体验">
            <MenuItem
              icon={<Sparkles className="w-5 h-5" />}
              label="重看引导"
              description="再次体验 Onboarding"
              onClick={onOpenOnboarding}
              highlight
            />
          </MenuSection>

          {/* Support Section */}
          <MenuSection title="支持">
            <MenuItem
              icon={<Heart className="w-5 h-5" />}
              label="反馈与建议"
              onClick={() => console.log('反馈')}
            />
            <MenuItem
              icon={<HelpCircle className="w-5 h-5" />}
              label="帮助中心"
              onClick={() => console.log('帮助')}
            />
            <MenuItem
              icon={<Shield className="w-5 h-5" />}
              label="隐私政策"
              onClick={() => console.log('隐私政策')}
            />
            <MenuItem
              icon={<Info className="w-5 h-5" />}
              label="关于 Aura"
              onClick={() => console.log('关于')}
            />
          </MenuSection>

          {/* Danger Zone */}
          <MenuSection>
            <MenuItem
              icon={<LogOut className="w-5 h-5" />}
              label="退出登录"
              onClick={() => console.log('退出登录')}
              danger
            />
          </MenuSection>

          {/* App Version */}
          <div className="text-center text-sm text-muted-foreground py-8">
            <p>Project Aura</p>
            <p className="text-xs mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuSectionProps {
  title?: string;
  children: React.ReactNode;
}

function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <div className="space-y-2">
      {title && (
        <h3 className="text-xs text-muted-foreground uppercase tracking-wider px-4 mb-3">
          {title}
        </h3>
      )}
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
        {children}
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value?: string;
  badge?: string;
  hasToggle?: boolean;
  isToggled?: boolean;
  danger?: boolean;
  highlight?: boolean;
  onClick: () => void;
}

function MenuItem({
  icon,
  label,
  description,
  value,
  badge,
  hasToggle,
  isToggled,
  danger,
  highlight,
  onClick,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors border-b border-border last:border-b-0 ${
        highlight ? 'bg-primary/5' : ''
      }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${
        danger ? 'text-destructive' : highlight ? 'text-primary' : 'text-muted-foreground'
      }`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <div className={`text-sm ${
          danger ? 'text-destructive' : highlight ? 'text-primary' : 'text-foreground'
        }`}>
          {label}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground mt-0.5">
            {description}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {badge && (
          <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
            {badge}
          </span>
        )}
        
        {value && (
          <span className="text-sm text-muted-foreground">{value}</span>
        )}

        {hasToggle ? (
          <div className={`w-11 h-6 rounded-full transition-colors ${
            isToggled ? 'bg-primary' : 'bg-secondary'
          }`}>
            <motion.div
              className="w-5 h-5 bg-background rounded-full mt-0.5"
              animate={{ x: isToggled ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        ) : (
          <ChevronRight className={`w-4 h-4 ${
            danger ? 'text-destructive' : 'text-muted-foreground'
          }`} />
        )}
      </div>
    </button>
  );
}
