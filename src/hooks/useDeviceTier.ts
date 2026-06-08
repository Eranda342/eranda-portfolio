import { useState, useEffect } from 'react';

type DeviceTier = 'high' | 'medium' | 'low';

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high');

  useEffect(() => {
    // Simple heuristic: low memory or mobile -> medium/low
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const nav = navigator as any;
    
    let currentTier: DeviceTier = 'high';
    
    if (isMobile) {
      currentTier = 'medium';
    }
    
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      currentTier = 'low';
    }
    
    setTier(currentTier);
  }, []);

  return tier;
}
