import { memo } from 'react';
import { useQrEncode } from 'react-qr-hooks';

interface Props {
  readonly decoded: string;
}

const CodePreview = ({ decoded }: Props) => {
  const encoded = useQrEncode(decoded, {
    width: 360,
  });

  return <img src={encoded} alt={decoded} />;
};

export default memo(CodePreview);
