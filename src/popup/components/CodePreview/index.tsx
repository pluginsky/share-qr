import React, { memo } from 'react';
import { useQrEncode } from 'react-qr-hooks';

interface Props {
  readonly decoded: string;
}

const CodePreview = memo<Props>(({ decoded }) => {
  const encoded = useQrEncode(decoded, {
    width: 360,
  });

  return <img src={encoded} alt={decoded} />;
});

export default CodePreview;
