import React, { memo } from 'react';

import './ErrorMessage.scss';

interface Props {
  readonly message: string;
}

const ErrorMessage = memo<Props>(({ message }) => (
  <p className="error-message">{message}</p>
));

export default ErrorMessage;
