import React from 'react';

import { trimText } from './trimText';

export const markOutOfLimit = (text: string) => (
  <>
    {trimText(text, 1000)}
    <span className="out-of-limit">{text.slice(1000)}</span>
  </>
);
