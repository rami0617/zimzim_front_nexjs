import React from 'react';
import MailIcon from '#assets/icon/mail_outline.svg?react';
import LockIcon from '#assets/icon/lock.svg?react';
import GoogleIcon from '#assets/icon/google.svg?react';
import AppleIcon from '#assets/icon/apple.svg?react';

const Landing = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#B3C1F9] to-[#6A7293] px-[70px] py-[54px]">
      <div className="font-bold tracking-wider text-[36px] flex flex-row items-center gap-2">
        <img
          src="src/assets/icon/icon.svg"
          alt="icon"
          style={{ width: 48, height: 48 }}
        />
      </div>

      <div className="flex flex-row h-full justify-between px-24">
        <div className="flex flex-col relative h-full justify-end pb-[65px] gap-10">
          <div className="flex flex-row relative">
            <div className="z-10 absolute pt-[10px]">
              <img
                src="src/assets/image/landing_exercise.svg"
                alt="babel"
                style={{ maxWidth: 480, height: 357 }}
              />
            </div>

            <span className="bg-[#9FACDD] w-[426px] h-[426px] rounded-full"></span>
          </div>
        </div>

        <div className="bg-white w-[492px] rounded-t-2xl px-9">
          <p className="pt-[68px] text-center text-[28px]">
            Welcome back to the ZIMZIM
          </p>

          <div className="flex flex-col gap-6 pt-[64px]">
            <div className="relative w-full">
              <input
                type="id"
                className="border-[1px] border-[#9E9E9E] rounded-lg h-[48px] w-full pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MailIcon className="text-[#9E9E9E]" />
              </div>
            </div>
            <div className="relative w-full">
              <input
                type="password"
                className="border-[1px] border-[#9E9E9E] rounded-lg h-[48px] w-full pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LockIcon className="text-[#9E9E9E]" />
              </div>
            </div>
          </div>
          <div className="pt-[28px]">
            <button
              type="submit"
              className="bg-[#4B81FF] h-[52px] w-full rounded-lg text-white font-bold text-[24px]"
            >
              Login
            </button>
          </div>
          <div className="flex flex-row gap-4 justify-center pt-[36px]">
            <button className="px-6 flex flex-row items-center gap-2 border-[1px] border-[#E8E7E7] h-[48px] rounded-lg text-black text-[14px] text-left">
              <GoogleIcon className="w-[24px] h-[24px]" />
              Login with Google
            </button>

            <button className="px-6 flex flex-row items-center gap-2 border-[1px] border-[#E8E7E7] h-[48px] rounded-lg text-black text-[14px] text-left">
              <AppleIcon className="w-[24px] h-[24px]" />
              Login with Apple
            </button>
          </div>
          <div className="text-center pt-[48px]">
            <div className="flex space-x-2 justify-center">
              <div>
                <span className="text-[#757575] text-[14px]">
                  Are you new user?
                </span>
              </div>
              <span className="font-semibold underline">SIGN UP HERE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
