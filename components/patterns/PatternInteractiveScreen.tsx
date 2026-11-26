'use client';

import React from 'react';
import { InteractiveChatBlock } from '@/components/blocks/InteractiveChatBlock';
import { EnterpriseDashboardUseCase } from '@/components/usecases/EnterpriseDashboardUseCase';
import {
  BlogEditorScreen,
  EcommerceCheckoutScreen,
  FileUploaderScreen,
  FintechTransferScreen,
  FlightBookingScreen,
  KycVerificationScreen,
  MapLocationScreen,
  OnboardingWizardScreen,
  SearchEmptyScreen,
} from './PatternConsumerScreens';
import {
  ComplexFormSettingsScreen,
  DeveloperDocsScreen,
} from './PatternEnterpriseScreens';

interface PatternInteractiveScreenProps {
  patternId: string;
}

export function PatternInteractiveScreen({ patternId }: PatternInteractiveScreenProps) {
  return (
    <div className="w-full h-full text-(--text-primary) p-4 overflow-y-auto">
      {patternId === 'saas-dashboard' && (
        <div className="flex flex-col gap-6">
          <EnterpriseDashboardUseCase />
        </div>
      )}
      {patternId === 'chat-support' && (
        <div className="max-w-md mx-auto h-full flex flex-col justify-center">
          <InteractiveChatBlock />
        </div>
      )}
      {patternId === 'kyc-verification' && <KycVerificationScreen />}
      {patternId === 'blog-editor' && <BlogEditorScreen />}
      {patternId === 'map-location' && <MapLocationScreen />}
      {patternId === 'flight-booking' && <FlightBookingScreen />}
      {patternId === 'onboarding-wizard' && <OnboardingWizardScreen />}
      {patternId === 'file-uploader' && <FileUploaderScreen />}
      {patternId === 'fintech-transfer' && <FintechTransferScreen />}
      {patternId === 'ecommerce-checkout' && <EcommerceCheckoutScreen />}
      {patternId === 'search-empty' && <SearchEmptyScreen />}
      {patternId === 'developer-docs' && <DeveloperDocsScreen />}
      {patternId === 'complex-form-settings' && <ComplexFormSettingsScreen />}
    </div>
  );
}
