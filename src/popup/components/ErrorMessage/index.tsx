import React from 'react';

import './ErrorMessage.scss';

interface Props {
  readonly message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <p className="error-message">{message}</p>
);

export default ErrorMessage;
