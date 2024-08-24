import React from 'react';
import { Link } from 'react-router-dom';

const SignUpLink = () => (
  <p className="flex space-x-2 justify-center">
    <span className="text-[#757575] text-sm self-end">Are you new user?</span>
    <Link to="/sign-up" className="font-semibold underline">
      SIGN UP HERE
    </Link>
  </p>
);

export default SignUpLink;
