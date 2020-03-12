import React from 'react';

import './Details.css';

interface Props {
  summary: string;
}

const Details: React.FC<Props> = ({ summary, children }) => (
  <details>
    <summary>{summary}</summary>

    {children}
  </details>
);

export default Details;
