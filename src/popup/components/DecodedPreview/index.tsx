import React from 'react';

import './DecodedPreview.scss';

interface Props {
  readonly text: string;
}

const DecodedPreview: React.FC<Props> = ({ text }) => (
  <p>
    {text.substr(0, 1000)}

    <span className="out-of-limit">{text.slice(1000)}</span>
  </p>
);

export default DecodedPreview;
