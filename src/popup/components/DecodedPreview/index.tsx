import React from 'react';

import { trimText } from '../../helpers/trimText';

import './DecodedPreview.css';

interface Props {
  text: string;
}

const DecodedPreview = ({ text }: Props) => (
  <p>
    {trimText(text, 1000)}
    <span className="out-of-limit">{text.slice(1000)}</span>
  </p>
);

export default DecodedPreview;
