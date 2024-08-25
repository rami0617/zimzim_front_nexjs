import React from 'react';

import ContentBox from '#components/common/ContentBox';
import SignupForm from '#components/signup/SignupForm';

const SignUp = () => (
  <div className="flex justify-center">
    <ContentBox className="rounded-2xl gap-6">
      <div className="text-center text-xl">Let’s get started with ZIMZIM</div>
      <SignupForm />
    </ContentBox>
  </div>
);

export default SignUp;
