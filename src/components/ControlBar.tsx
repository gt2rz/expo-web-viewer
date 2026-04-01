import { DEVICES } from "../constants/devices.constants";
import type { DeviceType } from "../types/devices.type";
import type { ThemeMode } from "../hooks/useThemeMode";
import Logo from "./Logo";
import { useState } from "react";

interface HeaderProps {
  themeMode: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  url: string;
  device: DeviceType;
  onUrlChange: (url: string) => void;
  onDeviceChange: (device: DeviceType) => void;
  onReload: () => void;
}

const Header = ({
  themeMode,
  onThemeChange,
  url,
  device,
  onUrlChange,
  onDeviceChange,
  onReload,
}: HeaderProps) => {
  const [inputValue, setInputValue] = useState(url);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onUrlChange(inputValue);
    }
  }

  return (
    <header className="flex fixed top-0 left-0 w-full items-center justify-between p-4 z-50 gap-4 bg-gray-50/60 backdrop-blur-sm dark:bg-black/60">
      {/* Logo */}
      <Logo />

      {/* Search bar */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => onUrlChange(inputValue)}
        type="text"
        placeholder="Search..."
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        spellCheck={false}
      />

      {/* Device selector */}
      <select
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        value={device}
        onChange={(e) => onDeviceChange(e.target.value as DeviceType)}
      >
        {(Object.keys(DEVICES) as DeviceType[]).map((device) => (
          <option key={device} value={device}>
            {device.charAt(0).toUpperCase() + device.slice(1)}
          </option>
        ))}
      </select>

      <button
        onClick={onReload}
        title="Reload app"
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.65 2.35A8 8 0 1 0 15 8h-2a6 6 0 1 1-1.05-3.35L10 6.5H15V1.5l-1.35.85z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Theme mode selector */}
      <label className="sr-only" htmlFor="theme-mode">
        Theme mode
      </label>
      <select
        id="theme-mode"
        value={themeMode}
        onChange={(event) => onThemeChange(event.target.value as ThemeMode)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </header>
  );
};

export default Header;
