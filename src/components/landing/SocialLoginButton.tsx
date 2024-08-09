import React from 'react';

import Button from '#components/common/button/Button';

import GoogleIcon from '#assets/icon/google.svg?react';
import AppleIcon from '#assets/icon/apple.svg?react';

const SocialLoginButton = () => {
  return (
    <div className="flex flex-row justify-between">
      <Button className="px-8 flex flex-row items-center gap-2 border-[1px] border-[#E8E7E7] h-[48px] rounded-lg text-black text-[14px] text-left">
        <GoogleIcon className="w-[24px] h-[24px]" />
        Login with Google
      </Button>

      <Button className="px-8 flex flex-row items-center gap-2 border-[1px] border-[#E8E7E7] h-[48px] rounded-lg text-black text-[14px] text-left">
        <AppleIcon className="w-[24px] h-[24px]" />
        Login with Apple
      </Button>
    </div>
  );
};

export default SocialLoginButton;
