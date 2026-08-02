import React, { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Projects from './components/Projects';
import Sponsor from './components/Sponsor';
import Contact from './components/Contact';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to a wrapper to utilize Tailwind's dark: variant
  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-400 font-sans p-5">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
        
        <div className="max-w-[1000px] mx-auto">
          <Header />
          <Projects />
          <Sponsor />
          <Contact />
        </div>
      </div>
    </div>
  );
}