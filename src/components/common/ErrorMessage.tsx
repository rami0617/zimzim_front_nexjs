import React from 'react';

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="text-red-500 text-xs h-3">{message}</p>
);

export default ErrorMessage;
