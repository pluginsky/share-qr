import React, { memo } from 'react';

interface Props {
  readonly decoded: string;
  readonly limit: number;
}

const OutOfLimit = memo<Props>(({ decoded, limit }) => (
  <span className="out-of-limit">{decoded.slice(limit)}</span>
));

export default OutOfLimit;
