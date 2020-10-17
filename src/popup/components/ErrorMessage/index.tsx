import { memo } from 'react';

import './ErrorMessage.scss';

interface Props {
  readonly message: string;
}

const ErrorMessage = ({ message }: Props) => (
  <p className="error-message">{message}</p>
);

export default memo(ErrorMessage);
