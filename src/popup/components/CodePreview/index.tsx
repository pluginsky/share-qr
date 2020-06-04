import React from 'react';
import { useQrEncode } from 'react-qr-hooks';

interface Props {
  readonly decoded: string;
}

const CodePreview: React.FC<Props> = ({ decoded }) => {
  const encoded = useQrEncode(decoded, {
    width: 360,
  });

  return <img src={encoded} alt={decoded} />;
};

export default CodePreview;
