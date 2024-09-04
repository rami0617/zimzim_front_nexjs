import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from '#stores/store';

import DashboardPage from '#/pages/dashboard/DashboardPage';
import ExercisePage from '#pages/exercise/ExercisePage';
import ExerciseListPage from '#/pages/exercise/ExerciseListPage';
import ExercisePostPage from '#/pages/exercise/ExercisePostPage';
import ExerciseDetailPage from './pages/exercise/ExerciseDetailPage';
import WaterPage from '#/pages/water/WaterPage';
import LoginPage from '#/pages/login/LoginPage';
import SignUpPage from '#/pages/signup/SignUpPage';
import NotFoundPage from '#pages/NotFoundPage';

import AuthGuard from '#layout/AuthGuard';
import UserLayout from '#layout/UserLayout';
import CommonLayout from '#layout/CommonLayout';
import ExerciseUpdatePage from './pages/exercise/ExerciseUpdatePage';

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
                  <Route path="post" element={<ExercisePostPage />} />
                  <Route path="detail/:id" element={<ExerciseDetailPage />} />
                  <Route path="update/:id" element={<ExerciseUpdatePage />} />
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
