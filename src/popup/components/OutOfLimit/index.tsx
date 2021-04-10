interface OutOfLimitProps {
  readonly decoded: string;
  readonly limit: number;
}

const OutOfLimit = ({ decoded, limit }: OutOfLimitProps) => (
  <span className="out-of-limit">{decoded.slice(limit)}</span>
);

export default OutOfLimit;
