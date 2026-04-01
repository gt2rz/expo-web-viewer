import { DEVICES } from "../constants/devices.constants";
import type { DeviceType } from "../types/devices.type";
import type { ThemeMode } from "../hooks/useThemeMode";
import Logo from "./Logo";

interface HeaderProps {
  themeMode: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const Header = ({ themeMode, onThemeChange }: HeaderProps) => {
  return (
    <header className="flex fixed top-0 left-0 w-full items-center justify-between p-4 z-10 gap-4">
      {/* Logo */}
      <Logo />

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      />

      {/* Device selector */}
      <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
        {(Object.keys(DEVICES) as DeviceType[]).map((device) => (
          <option key={device} value={device}>
            {device.charAt(0).toUpperCase() + device.slice(1)}
          </option>
        ))}
      </select>

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
