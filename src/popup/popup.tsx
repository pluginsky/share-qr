import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import extension from 'extensionizer';
import QrCode from 'qrcode';

import './popup.css';

const Popup = () => {
  const ref = useRef();

  const [source, setSource] = useState('');

  const [error, setError] = useState('');

  const supportedProtocols = ['http', 'https'];

  useEffect(() => {
    extension.storage.local.get('sharedText', (res: any) => {
      setSource(res.sharedText);
    });

    extension.tabs.query({ currentWindow: true, active: true }, (res: any) => {
      const currentPageProtocol = res[0].url.split(':')[0];

      if (supportedProtocols.includes(currentPageProtocol)) {
        setSource(res[0].url);
      } else {
        setError(`Protocol ${currentPageProtocol} is not supported`);
      }
    });
  }, []);

  useEffect(() => {
    QrCode.toCanvas(ref.current, source, {
      width: 360
    });

    console.log(source);
  }, [source]);

  return error ? <p>{error}</p> : <canvas ref={ref} />;
};

ReactDOM.render(<Popup />, document.getElementById('root'));
