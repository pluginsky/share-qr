import React from 'react';
import { useQrEncode } from 'react-qr-hooks';

import './CodePreview.scss';

interface CodePreviewProps {
  readonly decoded: string;
}

const CodePreview = ({ decoded }: CodePreviewProps) => {
  const encoded = useQrEncode(decoded, {
    width: 360,
  });

  return <img src={encoded} alt={decoded} className="code-preview" />;
};

export default CodePreview;
