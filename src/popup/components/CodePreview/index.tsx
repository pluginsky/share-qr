import { memo } from 'react';
import { useQrEncode } from 'react-qr-hooks';

import './CodePreview.scss';

interface CodePreviewProps {
  readonly decoded: string;
}

const CodePreview = memo<CodePreviewProps>(({ decoded }) => {
  const encoded = useQrEncode(decoded, {
    width: 360,
  });

  return <img src={encoded} alt={decoded} />;
});

export default CodePreview;
