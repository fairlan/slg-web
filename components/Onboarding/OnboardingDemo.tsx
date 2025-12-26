import React, { useState } from 'react';
import { OnboardingFlow } from './OnboardingFlow';

export function OnboardingDemo() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    console.log('Onboarding completed!');
  };

  if (!showOnboarding) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background px-8">
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl text-foreground">欢迎加入！</h1>
          <p className="text-muted-foreground max-w-md">
            Onboarding 已完成。在实际应用中，这里会跳转到主界面（Discover）。
          </p>
          <button
            onClick={() => setShowOnboarding(true)}
            className="px-6 py-3 bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors"
          >
            重新体验 Onboarding
          </button>
        </div>
      </div>
    );
  }

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
}
