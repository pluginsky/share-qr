import React, { memo } from 'react';
import { useQrEncode } from 'react-qr-hooks';

interface Props {
  readonly decoded: string;
}

const CodePreview: React.FC<Props> = ({ decoded }) => {
  console.log(true);

  const encoded = useQrEncode(decoded, {
    // width: 360
    width: 480,
  });

  return <img src={encoded} alt={decoded} />;
};

export default memo(CodePreview);
