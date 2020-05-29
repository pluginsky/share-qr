import React, { useState, useEffect } from 'react';
import { useQrEncode } from 'react-qr-hooks';

import Tabs from '../components/Tabs';

const CodePreview: React.FC = () => {
  const [decoded, setDecoded] = useState('');

  // useEffect(() => {
  //   setDecoded(tab === Tabs.Url ? url : text);
  // }, [tab, url, text]);

  // const trimmed = trimText(decoded, 1000);

  // const encoded = useQrEncode(trimmed, {
  //   width: 360,
  // });

  return <>{/* <img src={encoded} alt={trimmed} /> */}</>;
};

export default CodePreview;
