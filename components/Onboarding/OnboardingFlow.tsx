import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './CinematicIntro';
import { SignInScreen } from './SignInScreen';
import { PermissionScreen } from './PermissionScreen';

type OnboardingStep = 'intro' | 'signin' | 'permission' | 'complete';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro');

  const handleIntroComplete = () => {
    setCurrentStep('signin');
  };

  const handleSignInComplete = () => {
    setCurrentStep('permission');
  };

  const handlePermissionComplete = () => {
    setCurrentStep('complete');
    onComplete();
  };

  const handleSkipToSignIn = () => {
    setCurrentStep('signin');
  };

  const handleSkipPermission = () => {
    // Skip permission and go to main app
    setCurrentStep('complete');
    onComplete();
  };

  switch (currentStep) {
    case 'intro':
      return (
        <CinematicIntro
          onComplete={handleIntroComplete}
          onSkip={handleSkipToSignIn}
        />
      );

    case 'signin':
      return (
        <SignInScreen
          onSignInSuccess={handleSignInComplete}
          onSkip={() => onComplete()}
        />
      );

    case 'permission':
      return (
        <PermissionScreen
          onAllow={handlePermissionComplete}
          onSkip={handleSkipPermission}
        />
      );

    case 'complete':
      return null;

    default:
      return null;
  }
}
