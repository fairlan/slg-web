import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

const INTRO_SCENES = [
  {
    title: '在这里',
    subtitle: '每个地方都有故事',
    gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    illustration: 'https://images.unsplash.com/photo-1626427223333-183395267453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWwlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY2NjgwMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: '留下',
    subtitle: '属于你的瞬间',
    gradient: 'from-purple-500/20 via-pink-500/20 to-orange-500/20',
    illustration: 'https://images.unsplash.com/photo-1642850356603-ca6295576249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnZW9tZXRyaWMlMjBhcnR8ZW58MXx8fHwxNzY2NjgwMzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: '发现',
    subtitle: '别人的心之足迹',
    gradient: 'from-pink-500/20 via-orange-500/20 to-yellow-500/20',
    illustration: 'https://images.unsplash.com/photo-1761618329832-2a79916aed0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25uZWN0aW9uJTIwc29jaWFsJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NjY4MDMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function CinematicIntro({ onComplete, onSkip }: CinematicIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Auto progress
    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => {
        if (prev >= INTRO_SCENES.length - 1) {
          clearInterval(sceneInterval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 90); // 3000ms / 33 steps ≈ 90ms

    return () => {
      clearInterval(sceneInterval);
      clearInterval(progressInterval);
    };
  }, [currentScene, onComplete]);

  const scene = INTRO_SCENES[currentScene];

  return (
    <div className="h-screen w-screen bg-background overflow-hidden relative">
      {/* Background Gradient Animation */}
      <motion.div
        key={currentScene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-gradient-to-br ${scene.gradient}`}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-foreground/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-12"
          >
            {/* Illustration - Frameless */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="w-80 h-80 relative">
                <img
                  src={scene.illustration}
                  alt={scene.title}
                  className="w-full h-full object-cover opacity-60"
                  style={{
                    maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
                  }}
                />
              </div>
            </motion.div>

            {/* Text */}
            <div className="space-y-4">
              <motion.h1
                className="text-6xl text-foreground"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {scene.title}
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {scene.subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-2 px-8">
          {INTRO_SCENES.map((_, index) => (
            <div
              key={index}
              className="flex-1 max-w-[80px] h-1 bg-foreground/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: '0%' }}
                animate={{
                  width:
                    index < currentScene
                      ? '100%'
                      : index === currentScene
                      ? `${progress}%`
                      : '0%',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        className="absolute top-16 right-6 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        跳过
      </button>

      {/* Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-muted-foreground"
        >
          Project Aura
        </motion.div>
      </div>
    </div>
  );
}