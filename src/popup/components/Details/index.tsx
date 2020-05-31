import React from 'react';

import './Details.scss';

interface Props {
  readonly summary: string;
}

const Details: React.FC<Props> = ({ summary, children }) => (
  <details>
    <summary>{summary}</summary>

    {children}
  </details>
);

export default Details;
