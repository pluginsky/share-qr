import { memo } from 'react';

import './ErrorMessage.scss';

interface ErrorMessageProps {
  readonly message: string;
}

const ErrorMessage = memo<ErrorMessageProps>(({ message }) => (
  <p className="error-message">{message}</p>
));

export default ErrorMessage;
