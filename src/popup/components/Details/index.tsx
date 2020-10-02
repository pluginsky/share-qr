import React, { memo } from 'react';

import './Details.scss';

interface Props {
  readonly summary: string;
  readonly children: React.ReactNode;
}

const Details = ({ summary, children }: Props) => (
  <details>
    <summary>{summary}</summary>

    <p>{children}</p>
  </details>
);

export default memo(Details);
