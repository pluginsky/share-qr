import { useQrEncode } from 'react-qr-hooks';

import './CodePreview.scss';

interface CodePreviewProps {
  readonly decoded: string;
}

const CodePreview = ({ decoded }: CodePreviewProps) => {
  const encoded = useQrEncode(decoded, {
    width: 360,
  });

  // TODO
  if (!encoded) {
    return null;
  }

  // TODO display error if encoded is null
  return <img src={encoded} alt={decoded} />;
};

export default CodePreview;
