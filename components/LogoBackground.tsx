import React from 'react';

interface LogoBackgroundProps {
  isVisible: boolean;
}

const LogoBackground: React.FC<LogoBackgroundProps> = ({ isVisible }) => {
  return (
    <div 
      className={`absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-25 blur-0 scale-100' : 'opacity-0 blur-xl scale-90'
      }`}
    >
      <img 
        src="https://i.imageupload.app/48d20bc718fa9cd9c4a4.svg" 
        alt="6packCEO Logo"
        className="w-80 h-80 md:w-[30rem] md:h-[30rem] object-contain"
      />
    </div>
  );
};

export default LogoBackground;