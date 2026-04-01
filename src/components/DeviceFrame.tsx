import { useRef, useImperativeHandle, forwardRef } from "react";
import { DEVICES } from "../constants/devices.constants";
import type { DeviceType } from "../types/devices.type";

export interface DeviceFrameHandle {
  reload: () => void;
}

interface DeviceFrameProps {
  url: string;
  device: DeviceType;
}

export const DeviceFrame = forwardRef<DeviceFrameHandle, DeviceFrameProps>(
  function DeviceFrame({ url, device }, ref) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const config = DEVICES[device];

    useImperativeHandle(ref, () => ({
      reload() {
        if (iframeRef.current) {
          // Force reload by resetting src
          const src = iframeRef.current.src;
          iframeRef.current.src = "";
          iframeRef.current.src = src;
        }
      },
    }));

    const shellWidth = config.width + 24; // shell padding
    const shellHeight = config.height + 48; // top/bottom bezel

    return (
      <div
        className="relative flex shrink-0 flex-col items-center overflow-hidden"
        style={{
          width: shellWidth,
          height: shellHeight,
          borderRadius: config.borderRadius,
          background:
            "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #111114 100%)",
          boxShadow:
            "0 0 0 1.5px #3a3a40, 0 0 0 3px #222226, 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(108,99,255,0.05)",
        }}
      >
        {/* Dynamic island / notch */}
        {config.notch && (
          <div
            className="absolute z-10 w-fit rounded-full bg-black"
            style={{ top: 14, width: 120, height: 34, borderRadius: 20 }}
          />
        )}

        {/* Screen bezel top */}
        <div className="h-12 w-full shrink-0" />

        {/* Screen */}
        <div
          className="shrink-0 overflow-hidden bg-black"
          style={{
            width: config.width,
            height: config.height,
            borderRadius: config.borderRadius - 8,
          }}
        >
          <iframe
            ref={iframeRef}
            src={url}
            title="Expo App Preview"
            allow="camera; microphone; geolocation"
            className="block h-full w-full border-none"
          />
        </div>

        {/* Screen bezel bottom */}
        <div className="flex w-full flex-1 items-center justify-center">
          <div
            className="rounded-full"
            style={{
              width: 130,
              height: 5,
              background: "rgba(255,255,255,0.25)",
            }}
          />
        </div>
      </div>
    );
  },
);
