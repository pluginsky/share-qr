import * as React from 'react';

import './Details.scss';

interface DetailsProps {
  readonly summary: string;
  readonly children: React.ReactNode;
}

const Details = ({ summary, children }: DetailsProps) => (
  <details>
    <summary>{summary}</summary>

    <p>{children}</p>
  </details>
);

export default Details;
