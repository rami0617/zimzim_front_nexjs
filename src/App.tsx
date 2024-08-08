import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <main className="font-roboto">
      <Outlet />
    </main>
  );
};

export default App;
