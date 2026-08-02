import React, { useState } from 'react';

const ProjectCard: React.FC = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');

  const inputBaseClass = "w-full p-3 border-2 border-gray-200 dark:border-dark-border rounded-lg font-sans text-base transition-all duration-300 focus:border-light-primary outline-none bg-transparent dark:bg-dark-inputBg dark:text-dark-text placeholder-gray-400 dark:placeholder-dark-placeholder";

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-400 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
      <input
        type="text"
        className={`${inputBaseClass} text-xl font-bold text-light-primary dark:text-dark-primary`}
        placeholder="請輸入專案名稱"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={`${inputBaseClass} resize-y min-h-[100px] text-gray-600 dark:text-[#a9b1d6]`}
        placeholder="請輸入專案描述"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="url"
        className={`${inputBaseClass} text-sm text-gray-500`}
        placeholder="請輸入專案連結 (例：https://...)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
    </div>
  );
};

export default ProjectCard;