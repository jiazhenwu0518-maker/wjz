import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 md:top-5 md:right-5 bg-white dark:bg-dark-card text-slate-800 dark:text-[#c0caf5] border-2 border-light-border dark:border-dark-border px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-semibold cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:border-light-primary transition-all duration-300 z-50 flex items-center gap-2"
    >
      {isDarkMode ? (
        <>
          <span>☀️</span> 淺色模式
        </>
      ) : (
        <>
          <span>🌙</span> 深色模式
        </>
      )}
    </button>
  );
};

export default ThemeToggle;