import './ErrorMessage.scss';

interface ErrorMessageProps {
  readonly message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="error-message">{message}</p>
);

export default ErrorMessage;
