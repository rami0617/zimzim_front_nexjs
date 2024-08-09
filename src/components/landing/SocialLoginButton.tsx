import React from 'react';

import Button from '#components/common/button/Button';

import GoogleIcon from '#assets/icon/google.svg?react';
import AppleIcon from '#assets/icon/apple.svg?react';

const SocialLoginButton = () => {
  return (
    <div className="flex flex-row justify-between">
      <Button className="button-social-login">
        <GoogleIcon className="w-6 h-6" />
        Login with Google
      </Button>

      <Button className="button-social-login">
        <AppleIcon className="w-6 h-6" />
        Login with Apple
      </Button>
    </div>
  );
};

export default SocialLoginButton;
