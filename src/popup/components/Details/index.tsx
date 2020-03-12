import React, { FunctionComponent } from 'react';

import './Details.css';

interface Props {
  summary: string;
}

const Details: FunctionComponent<Props> = ({ summary, children }) => (
  <details>
    <summary>{summary}</summary>

    {children}
  </details>
);

export default Details;
