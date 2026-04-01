import { useCallback, useRef, useState } from "react";
import { DeviceFrame, type DeviceFrameHandle } from "./components/DeviceFrame";
import ControlBar from "./components/ControlBar";
import { useThemeMode } from "./hooks/useThemeMode";
import type { DeviceType } from "./types/devices.type";

const DEFAULT_APP_URL = "https://portfolio.gt2rz.cloud";
const DEFAULT_DEVICE: DeviceType = "iphone-15";

function App() {
  const { themeMode, setThemeMode } = useThemeMode();
  const [url, setUrl] = useState(DEFAULT_APP_URL);
  const [device, setDevice] = useState<DeviceType>(DEFAULT_DEVICE);

  const frameRef = useRef<DeviceFrameHandle>(null);

  const handleReload = useCallback(() => {
    frameRef.current?.reload();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-24 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <ControlBar
        themeMode={themeMode}
        onThemeChange={setThemeMode}
        url={url}
        device={device}
        onUrlChange={setUrl}
        onDeviceChange={setDevice}
        onReload={handleReload}
      />
      <DeviceFrame url={url} device={device} ref={frameRef} />
    </main>
  );
}

export default App;
