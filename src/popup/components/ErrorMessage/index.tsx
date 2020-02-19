import React, { ReactChildren } from 'react';

import './ErrorMessage.css';

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => (
  <p className="error-message">{message}</p>
);

export default ErrorMessage;
