import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from '#stores/store';

import DashboardPage from '#pages/DashboardPage';
import ExercisePage from '#pages/ExercisePage';
import ExerciseListPage from '#/pages/ExerciseListPage';
import ExercisePost from '#pages/ExercisePost';
import WaterPage from '#pages/WaterPage';
import LoginPage from '#pages/LoginPage';
import SignUpPage from '#pages/SignUpPage';
import NotFoundPage from '#pages/NotFoundPage';

import AuthGuard from '#layout/AuthGuard';
import UserLayout from '#layout/UserLayout';
import CommonLayout from '#layout/CommonLayout';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Routes>
            <Route element={<AuthGuard />}>
              <Route element={<UserLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/exercise" element={<ExercisePage />}>
                  <Route path="" element={<ExerciseListPage />} />
                  <Route path="post" element={<ExercisePost />} />
                </Route>
                <Route path="/water" element={<WaterPage />} />
              </Route>
            </Route>
            <Route element={<CommonLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
