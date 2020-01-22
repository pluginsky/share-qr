import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import extension from 'extensionizer';
import QrCode from 'qrcode';

const Popup = () => {
  const ref = useRef();

  extension.tabs.query({ currentWindow: true, active: true }, (res: any) => {
    QrCode.toCanvas(ref.current, res[0].url, {
      width: 260
    });
  });

  return <canvas ref={ref} />;
};

ReactDOM.render(<Popup />, document.getElementById('root'));
