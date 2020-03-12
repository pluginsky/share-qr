import React, { FunctionComponent } from 'react';

import './ErrorMessage.css';

interface Props {
  message: string;
}

const ErrorMessage: FunctionComponent<Props> = ({ message }) => (
  <p className="error-message">{message}</p>
);

export default ErrorMessage;
