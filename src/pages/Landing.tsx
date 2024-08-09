import React from 'react';

import LandingHeader from '#/components/landing/LandingHeader';
import LoginForm from '#/components/landing/LoginForm';
import SocialLoginButton from '#/components/landing/SocialLoginButton';
import SignUpLink from '#/components/landing/SignUpLink';

const Landing = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-bg-light to-bg-dark px-16 py-14">
      <LandingHeader />

      <main className="flex flex-row h-full justify-between px-24">
        <div className="flex flex-col relative h-full justify-end pb-16 gap-10">
          <div className="flex flex-row relative">
            <div className="z-10 absolute pt-2.5">
              <img
                src="src/assets/image/landing_exercise.svg"
                alt="babel"
                style={{ maxWidth: 480, height: 357 }}
              />
            </div>

            <div className="bg-[#9FACDD] w-[426px] h-[426px] rounded-full" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-12 bg-white w-[45%] rounded-t-2xl px-8 py-16 border-1 border-gray-light">
          <p className="text-center text-2xl">Welcome back to the ZIMZIM</p>

          <div className="flex flex-col gap-8">
            <LoginForm />
            <SocialLoginButton />
          </div>

          <div className="text-center">
            <SignUpLink />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
