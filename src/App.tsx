import Header from "./components/Header";
import { useThemeMode } from "./hooks/useThemeMode";

function App() {
  const { themeMode, setThemeMode } = useThemeMode();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-24 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <Header themeMode={themeMode} onThemeChange={setThemeMode} />
    </main>
  );
}

export default App;
