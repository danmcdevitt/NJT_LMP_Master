"use client";

import { useState, useEffect } from 'react';

type ConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
type EffectiveType = 'slow-2g' | '2g' | '3g' | '4g';

interface NetworkInformation extends EventTarget {
  effectiveType?: EffectiveType;
  saveData?: boolean;
  downlink?: number;
  rtt?: number;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

export function useConnectionQuality() {
  const [connectionType, setConnectionType] = useState<ConnectionType>('unknown');
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [shouldAutoplayVideo, setShouldAutoplayVideo] = useState(true);
  const [videoPreload, setVideoPreload] = useState<'metadata' | 'none'>('metadata');

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

    if (!connection) {
      // Network Information API not supported, assume good connection
      setConnectionType('unknown');
      setIsSlowConnection(false);
      setShouldAutoplayVideo(true);
      setVideoPreload('metadata');
      return;
    }

    const updateConnectionInfo = () => {
      const effectiveType = connection.effectiveType;
      const saveData = connection.saveData;
      const downlink = connection.downlink;

      // Check for data saver mode
      if (saveData) {
        setConnectionType('2g');
        setIsSlowConnection(true);
        setShouldAutoplayVideo(false);
        setVideoPreload('none');
        return;
      }

      // Check effective connection type
      if (effectiveType) {
        setConnectionType(effectiveType);
        
        // Consider slow-2g and 2g as slow connections
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setIsSlowConnection(true);
          setShouldAutoplayVideo(false);
          setVideoPreload('none');
        } else if (effectiveType === '3g') {
          // 3g: moderate connection, use metadata preload but allow autoplay
          setIsSlowConnection(false);
          setShouldAutoplayVideo(true);
          setVideoPreload('metadata');
        } else {
          // 4g: good connection, full autoplay
          setIsSlowConnection(false);
          setShouldAutoplayVideo(true);
          setVideoPreload('metadata');
        }
      }

      // Fallback: check downlink speed (Mbps)
      if (downlink !== undefined && downlink < 1.5) {
        setIsSlowConnection(true);
        setShouldAutoplayVideo(false);
        setVideoPreload('none');
      }
    };

    // Initial check
    updateConnectionInfo();

    // Listen for connection changes
    connection.addEventListener('change', updateConnectionInfo);

    return () => {
      connection.removeEventListener('change', updateConnectionInfo);
    };
  }, []);

  return {
    connectionType,
    isSlowConnection,
    shouldAutoplayVideo,
    videoPreload,
  };
}

