import React from 'react';

interface Props {
  name: string;
}

export const Section: React.FC<Props> = ({ children, name }) => (
  <section>
    <h3>{name}</h3>

    {children}
  </section>
);
