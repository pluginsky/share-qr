import { memo } from 'react';

import './Details.scss';

interface DetailsProps {
  readonly summary: string;
  readonly children: React.ReactNode;
}

const Details = memo<DetailsProps>(({ summary, children }) => (
  <details>
    <summary>{summary}</summary>

    <p>{children}</p>
  </details>
));

export default Details;
