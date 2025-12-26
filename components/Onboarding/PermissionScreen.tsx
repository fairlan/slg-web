import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Lock, Eye } from 'lucide-react';

interface PermissionScreenProps {
  onAllow: () => void;
  onSkip: () => void;
}

export function PermissionScreen({ onAllow, onSkip }: PermissionScreenProps) {
  return (
    <div className="h-screen w-screen bg-background flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-md w-full space-y-10">
        {/* Illustration - Frameless with Fade */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-72 h-72 relative">
            <img
              src="https://images.unsplash.com/photo-1754299494605-0c3b078cd3bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhdGlvbiUyMG1hcCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjY2ODAzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Location Permission"
              className="w-full h-full object-cover opacity-50"
              style={{
                maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
              }}
            />
          </div>
        </motion.div>

        {/* Icon & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl text-foreground">
            需要位置权限
          </h2>
          <p className="text-muted-foreground text-lg">
            为了发现附近的故事，我们需要知道你在哪里
          </p>
        </motion.div>

        {/* Permission Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <PermissionBenefit
            icon={<MapPin className="w-5 h-5" />}
            title="解锁附近的 Moments"
            description="当你到达特定地点时收到通知"
          />
          <PermissionBenefit
            icon={<Eye className="w-5 h-5" />}
            title="发现周边故事"
            description="看看朋友们在附近留下的足迹"
          />
          <PermissionBenefit
            icon={<Lock className="w-5 h-5" />}
            title="隐私优先"
            description="位置数据在设备端处理，不会被存储"
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={onAllow}
            className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background rounded-2xl transition-all shadow-lg"
          >
            允许位置访问
          </button>
          <button
            onClick={onSkip}
            className="w-full h-14 bg-secondary hover:bg-accent text-foreground rounded-2xl transition-all"
          >
            稍后再说
          </button>
        </motion.div>

        {/* Privacy Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border"
        >
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              我们会谨慎使用你的位置信息。你可以随时在系统设置中修改权限。
              详见我们的{' '}
              <button className="text-foreground hover:underline">
                隐私政策
              </button>
              。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface PermissionBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function PermissionBenefit({ icon, title, description }: PermissionBenefitProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-card/30 rounded-2xl border border-border/50">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-foreground mb-1">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}