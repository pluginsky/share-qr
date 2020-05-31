import React from 'react';

import './Section.scss';

interface Props {
  readonly name: string;
}

export const Section: React.FC<Props> = ({ children, name }) => (
  <section>
    <h3>{name}</h3>

    {children}
  </section>
);
