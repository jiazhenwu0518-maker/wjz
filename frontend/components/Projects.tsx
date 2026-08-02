import React from 'react';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  // Render 3 empty project cards as per the original template
  const projectCards = [1, 2, 3];

  return (
    <section className="max-w-[1000px] mx-auto my-16 px-0">
      <h2 className="text-center text-3xl md:text-[2.2rem] mb-10 text-slate-800 dark:text-[#c0caf5] transition-colors duration-400 font-bold">
        作品集
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mx-auto">
        {projectCards.map((id) => (
          <ProjectCard key={id} />
        ))}
      </div>
    </section>
  );
};

export default Projects;