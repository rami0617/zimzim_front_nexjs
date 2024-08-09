import React from 'react';

import LandingHeader from '#/components/landing/LandingHeader';
import LoginForm from '#/components/landing/LoginForm';
import SocialLoginButton from '#/components/landing/SocialLoginButton';
import SignUpLink from '#/components/landing/SignUpLink';

const Landing = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#B3C1F9] to-[#6A7293] px-[70px] py-[54px]">
      <LandingHeader />

      <main className="flex flex-row h-full justify-between px-24">
        <div className="flex flex-col relative h-full justify-end pb-[65px] gap-10">
          <div className="flex flex-row relative">
            <div className="z-10 absolute pt-[10px]">
              <img
                src="src/assets/image/landing_exercise.svg"
                alt="babel"
                style={{ maxWidth: 480, height: 357 }}
              />
            </div>

            <div className="bg-[#9FACDD] w-[426px] h-[426px] rounded-full" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-12 bg-white w-[492px] rounded-t-2xl px-8 py-16 border-[1px] border-[#E8E7E7]">
          <p className="text-center text-[28px]">Welcome back to the ZIMZIM</p>

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
