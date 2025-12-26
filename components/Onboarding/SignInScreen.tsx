import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Apple, Loader2 } from 'lucide-react';

interface SignInScreenProps {
  onSignInSuccess: () => void;
  onSkip: () => void;
}

type SignInState = 'idle' | 'loading' | 'error';

export function SignInScreen({ onSignInSuccess, onSkip }: SignInScreenProps) {
  const [signInState, setSignInState] = useState<SignInState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    setSignInState('loading');
    setErrorMessage('');

    // Simulate Sign in with Apple
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      setSignInState('idle');
      onSignInSuccess();
    } catch (error) {
      setSignInState('error');
      setErrorMessage('登录没成功');
    }
  };

  const handleRetry = () => {
    setSignInState('idle');
    setErrorMessage('');
    handleSignIn();
  };

  return (
    <div className="h-screen w-screen bg-background flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-md w-full space-y-12">
        {/* Illustration - Frameless with Fade */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-80 h-80 relative">
            <img
              src="https://images.unsplash.com/photo-1761618329832-2a79916aed0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25uZWN0aW9uJTIwc29jaWFsJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NjY4MDMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Welcome to Aura"
              className="w-full h-full object-cover opacity-50"
              style={{
                maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
              }}
            />
          </div>
        </motion.div>

        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl text-foreground">欢迎来到 Aura</h1>
          <p className="text-muted-foreground text-lg">
            心之技术，发现身边的故事
          </p>
        </motion.div>

        {/* Sign In Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <button
            onClick={handleSignIn}
            disabled={signInState === 'loading'}
            className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {signInState === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>登录中...</span>
              </>
            ) : (
              <>
                <Apple className="w-5 h-5" fill="currentColor" />
                <span>通过 Apple 登录</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {signInState === 'error' && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl"
            >
              <div className="text-sm text-destructive mb-2">{errorMessage}</div>
              <div className="flex gap-2">
                <button
                  onClick={handleRetry}
                  className="flex-1 px-4 py-2 bg-foreground text-background rounded-lg text-sm hover:bg-foreground/90 transition-colors"
                >
                  重试
                </button>
                <button
                  onClick={onSkip}
                  className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-accent transition-colors"
                >
                  稍后再说
                </button>
              </div>
            </motion.div>
          )}

          {/* Privacy Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground text-center px-4"
          >
            继续即表示你同意我们的{' '}
            <button className="text-foreground hover:underline">服务条款</button>
            {' '}和{' '}
            <button className="text-foreground hover:underline">隐私政策</button>
          </motion.p>
        </motion.div>

        {/* Skip Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            先浏览一下
          </button>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-4 pt-8"
        >
          <FeatureItem icon="📍" label="发现地点" />
          <FeatureItem icon="💬" label="留下记忆" />
          <FeatureItem icon="🤝" label="连接朋友" />
        </motion.div>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon: string;
  label: string;
}

function FeatureItem({ icon, label }: FeatureItemProps) {
  return (
    <div className="text-center space-y-2">
      <div className="text-2xl">{icon}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}