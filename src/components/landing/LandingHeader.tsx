import React from 'react';

const LandingHeader = () => {
  return (
    <header className="font-bold tracking-wider text-[36px] flex flex-row items-center gap-2">
      <img
        src="src/assets/icon/icon.svg"
        alt="icon"
        style={{ width: 48, height: 48 }}
      />
    </header>
  );
};

export default LandingHeader;
