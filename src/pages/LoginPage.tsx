import React from 'react';

import LoginForm from '#components/login/LoginForm';
import SocialLoginButton from '#components/login/SocialLoginButton';
import SignUpLink from '#components/login/SignUpLink';
import ContentBox from '#components/common/ContentBox';

const LoginPage = () => (
  <main className="flex flex-row h-full justify-between px-24">
    <div className="flex flex-col relative h-full justify-center">
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

    <ContentBox className="rounded-t-2xl w-[45%]">
      <p className="text-center text-2xl">Welcome back to the ZIMZIM</p>

      <div className="flex flex-col gap-10">
        <LoginForm />
        <hr />
        <SocialLoginButton />
      </div>

      <div className="text-center">
        <SignUpLink />
      </div>
    </ContentBox>
  </main>
);

export default LoginPage;
