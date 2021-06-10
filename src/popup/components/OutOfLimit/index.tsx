import { memo } from 'react';

interface OutOfLimitProps {
  readonly decoded: string;
  readonly limit: number;
}

const OutOfLimit = memo<OutOfLimitProps>(({ decoded, limit }) => (
  <span className="out-of-limit">{decoded.slice(limit)}</span>
));

export default OutOfLimit;
