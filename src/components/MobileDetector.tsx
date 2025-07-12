'use client';
import { useEffect } from 'react';
import { useMiningPoolsStore } from '@/store/pools';

export default function MobileDetector() {
  const setIsMobile = useMiningPoolsStore((s) => s.setIsMobile);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);
  return null;
} 