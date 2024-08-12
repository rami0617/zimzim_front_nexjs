import React from 'react';

import Button from '#/components/common/button/Button';
import ContentBox from '#/components/common/ContentBox';
import Input from '#/components/common/input/Input';
import CommonLayout from '#/layout/CommonLayout';

import UserIcon from '#/assets/icon/user.svg?react';
import MailIcon from '#assets/icon/mail_outline.svg?react';
import LockIcon from '#assets/icon/lock.svg?react';

const SignUp = () => {
  return (
    <CommonLayout>
      <div className="flex justify-center">
        <ContentBox className="rounded-2xl gap-14">
          <div className="text-center text-2xl">
            Let’s get started with ZIMZIM
          </div>
          <form className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <Input placeholder="Enter your ID" onChange={() => {}}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserIcon className="text-gray-dark" width={24} height={24} />
                </div>
              </Input>
              <Input placeholder="Enter your Nickname" onChange={() => {}}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MailIcon className="text-gray-dark" width={24} height={24} />
                </div>
              </Input>
              <Input placeholder="Enter your Password" onChange={() => {}}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LockIcon className="text-gray-dark" width={24} height={24} />
                </div>
              </Input>
              <Input placeholder="Enter your Password" onChange={() => {}}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LockIcon className="text-gray-dark" width={24} height={24} />
                </div>
              </Input>
            </div>
            <Button
              type="submit"
              className="bg-primary h-14 w-full rounded-lg text-white font-bold text-2xl border-1 border-gray-light"
            >
              Sign Up
            </Button>
          </form>
        </ContentBox>
      </div>
    </CommonLayout>
  );
};

export default SignUp;
