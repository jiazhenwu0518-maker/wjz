import React, { useState, useRef } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('留言已成功送出！');
    
    // Clear form
    setName('');
    setEmail('');
    setMessage('');
    
    // Focus back on name input
    nameInputRef.current?.focus();
  };

  const inputBaseClass = "w-full p-3 border-2 border-gray-200 dark:border-dark-border rounded-lg font-sans text-base transition-all duration-300 focus:border-light-primary outline-none bg-transparent dark:bg-dark-inputBg dark:text-dark-text placeholder-gray-400 dark:placeholder-dark-placeholder";

  return (
    <section className="max-w-[1000px] mx-auto mt-16 mb-10 px-0">
      <h2 className="text-center text-3xl md:text-[2.2rem] mb-8 text-slate-800 dark:text-[#c0caf5] transition-colors duration-400 font-bold">
        聯絡我
      </h2>
      <form onSubmit={handleSubmit}>
        {/* 
          The original CSS used a 4-column grid for all elements on desktop. 
          To maintain the spirit but improve UX slightly, we use a responsive grid 
          that stacks on mobile and aligns nicely on desktop.
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 md:p-8 bg-white dark:bg-dark-card rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-colors duration-400 items-start">
          
          <div className="md:col-span-1">
            <input
              type="text"
              ref={nameInputRef}
              placeholder="姓名"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputBaseClass}
            />
          </div>
          
          <div className="md:col-span-1">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputBaseClass}
            />
          </div>
          
          <div className="md:col-span-1">
            <textarea
              rows={4}
              placeholder="留言"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputBaseClass} resize-y md:h-[52px] md:min-h-[52px]`}
            />
          </div>
          
          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full bg-light-primary text-white py-3.5 px-8 border-none rounded-full text-lg font-semibold cursor-pointer shadow-[0_5px_15px_rgba(52,152,219,0.3)] transition-all duration-300 hover:bg-light-primaryHover hover:-translate-y-0.5"
            >
              送出
            </button>
          </div>

        </div>
      </form>
    </section>
  );
};

export default Contact;