import { memo } from 'react';

interface Props {
  readonly decoded: string;
  readonly limit: number;
}

const OutOfLimit = ({ decoded, limit }: Props) => (
  <span className="out-of-limit">{decoded.slice(limit)}</span>
);

export default memo(OutOfLimit);
