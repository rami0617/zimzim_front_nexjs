import React from 'react';

import GoogleIcon from '#assets/icon/google.svg?react';
import AppleIcon from '#assets/icon/apple.svg?react';

const SocialLoginButton = () => {
  return (
    <div className="flex flex-row justify-between">
      <button className="px-8 flex flex-row items-center gap-2 border-[1px] border-[#E8E7E7] h-[48px] rounded-lg text-black text-[14px] text-left">
        <GoogleIcon className="w-[24px] h-[24px]" />
        Login with Google
      </button>

      <button className="px-8 flex flex-row items-center gap-2 border-[1px] border-[#E8E7E7] h-[48px] rounded-lg text-black text-[14px] text-left">
        <AppleIcon className="w-[24px] h-[24px]" />
        Login with Apple
      </button>
    </div>
  );
};

export default SocialLoginButton;
