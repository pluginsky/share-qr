import React from 'react';

import { Children } from '../../types/Children';

import './Details.css';

interface Props {
  summary: string;
  children: Children;
}

const Details = ({ summary, children }: Props) => (
  <details>
    <summary>{summary}</summary>

    {children}
  </details>
);

export default Details;
