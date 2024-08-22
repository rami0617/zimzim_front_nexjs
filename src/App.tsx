import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '#stores/store';

import Dashboard from '#/pages/Dashboard';
import Login from '#/pages/Login';
import SignUp from '#/pages/SignUp';

import AuthGuard from '#components/common/AuthGuard';
import Exercise from '#/pages/Exercise';
import Water from '#/pages/Water';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthGuard>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/water" element={<Water />} />
          </Routes>
        </AuthGuard>
      </Router>
    </Provider>
  );
};

export default App;
