import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import extension from 'extensionizer';
import QrCode from 'qrcode';

import './popup.css';

const Popup = () => {
  const ref = useRef();

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const supportedProtocols = ['http', 'https'];

  extension.tabs.query({ currentWindow: true, active: true }, (res: any) => {
    const currentPageProtocol = res[0].url.split(':')[0];

    if (supportedProtocols.includes(currentPageProtocol)) {
      setUrl(res[0].url);

      QrCode.toCanvas(ref.current, res[0].url, {
        width: 260
      });
    } else {
      setError(`Protocol ${currentPageProtocol} is not supported`);
    }
  });

  return error ? (
    <p>{error}</p>
  ) : (
    <>
      <canvas ref={ref} />

      <h4>QR code represents:</h4>
      <p>{url}</p>
    </>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
