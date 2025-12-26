import React, { useState, useEffect } from 'react';
import { X, ScanLine, Camera } from 'lucide-react';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (code: string) => void;
}

export function ScannerModal({ isOpen, onClose, onScanSuccess }: ScannerModalProps) {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate camera permission check
      const hasPermission = Math.random() > 0.3; // 70% success rate for demo
      setPermissionDenied(!hasPermission);
      setIsScanning(hasPermission);

      // Simulate successful scan after 2 seconds
      if (hasPermission) {
        const timer = setTimeout(() => {
          onScanSuccess('AURA-12345');
          onClose();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, onClose, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl">扫描 Aura Code</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Scanner View */}
      <div className="absolute inset-0 flex items-center justify-center">
        {permissionDenied ? (
          // Permission Denied State
          <div className="text-center px-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl mb-2 text-white">需要相机权限才能扫码</h3>
            <p className="text-white/70 mb-8 max-w-sm">
              请在设置中允许 Aura 访问相机
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <button
                onClick={() => {
                  // Navigate to settings (in real app)
                  console.log('Navigate to settings');
                }}
                className="w-full px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
              >
                去设置
              </button>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          // Scanning State
          <>
            {/* Camera Preview Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            
            {/* Scan Frame */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border-2 border-white/50 rounded-3xl">
                {/* Corner Indicators */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-3xl" />
              </div>
              
              {/* Scanning Line Animation */}
              {isScanning && (
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                </div>
              )}
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ScanLine className="w-16 h-16 text-white/50" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Hint */}
      {!permissionDenied && (
        <div className="absolute bottom-0 left-0 right-0 px-6 py-8 bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-center text-white/80 text-sm">
            将二维码置于框内即可自动扫描
          </p>
        </div>
      )}
    </div>
  );
}
