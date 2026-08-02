import React, { useRef, useState } from 'react';

const Header: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [headshotUrl, setHeadshotUrl] = useState<string | null>(null);
  const [introText, setIntroText] = useState('');

  const handleContainerClick = () => {
    if (!headshotUrl) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHeadshotUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeadshotUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <header className="py-10 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8">
      <div 
        className="relative w-full max-w-[200px] md:w-[150px] h-[200px] md:h-auto min-h-[150px] md:min-h-[120px] shrink-0 rounded-xl bg-gray-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer transition-colors duration-400 group"
        onClick={handleContainerClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {headshotUrl ? (
          <>
            <img src={headshotUrl} alt="Headshot" className="w-full h-full object-cover" />
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 w-8 h-8 md:w-6 md:h-6 md:-top-2 md:-right-2 rounded-full bg-red-500 text-white border-none flex items-center justify-center cursor-pointer z-10 shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_8px_rgba(0,0,0,0.4)] opacity-100 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Delete photo"
            >
              ×
            </button>
          </>
        ) : (
          <div className="w-full h-full bg-light-primary rounded-xl flex items-center justify-center p-4">
            <div className="text-lg font-bold text-white drop-shadow-md text-center">
              Upload Your Photo
            </div>
          </div>
        )}
      </div>

      <textarea
        className="flex-1 w-full text-lg text-slate-700 dark:text-dark-text text-center md:text-left border-2 border-dashed border-light-border dark:border-dark-border bg-white dark:bg-dark-card p-4 min-h-[150px] md:min-h-[120px] resize-y transition-all duration-400 focus:border-solid focus:border-light-primary outline-none rounded-xl placeholder-gray-400 dark:placeholder-dark-placeholder"
        placeholder="請輸入自我介紹"
        value={introText}
        onChange={(e) => setIntroText(e.target.value)}
      />
    </header>
  );
};

export default Header;