import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, RotateCcw } from 'lucide-react';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile' | 'full';

interface DeviceSimulatorBarProps {
  deviceMode: DeviceMode;
  onChangeDeviceMode: (mode: DeviceMode) => void;
}

export const DeviceSimulatorBar: React.FC<DeviceSimulatorBarProps> = ({
  deviceMode,
  onChangeDeviceMode,
}) => {
  return (
    <div className="bg-[#1f242c] border-b border-[#30363d] text-white py-1 px-3 sm:px-4 text-xs flex items-center justify-between gap-2 sticky top-[49px] z-30 shadow-xs">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-gray-400 font-medium text-[11px] shrink-0 hidden sm:inline">Viewport:</span>
        <div className="inline-flex bg-[#161b22] p-0.5 rounded-md border border-[#30363d] shrink-0">
          <button
            onClick={() => onChangeDeviceMode('desktop')}
            className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[11px] sm:text-xs transition-colors ${
              deviceMode === 'desktop'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-gray-300 hover:text-white hover:bg-[#21262d]'
            }`}
            title="Desktop View (1440px)"
          >
            <Monitor size={12} />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => onChangeDeviceMode('tablet')}
            className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[11px] sm:text-xs transition-colors ${
              deviceMode === 'tablet'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-gray-300 hover:text-white hover:bg-[#21262d]'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet size={12} />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => onChangeDeviceMode('mobile')}
            className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[11px] sm:text-xs transition-colors ${
              deviceMode === 'mobile'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-gray-300 hover:text-white hover:bg-[#21262d]'
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone size={12} />
            <span>Mobile</span>
          </button>

          <button
            onClick={() => onChangeDeviceMode('full')}
            className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[11px] sm:text-xs transition-colors ${
              deviceMode === 'full'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-gray-300 hover:text-white hover:bg-[#21262d]'
            }`}
            title="Fluid Full Width"
          >
            <Maximize2 size={12} />
            <span>Fluid</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] sm:text-[11px] shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="hidden md:inline">100% GitHub-Spec Layout Responsive</span>
        <span className="md:hidden">Responsive</span>
      </div>
    </div>
  );
};
