import React from 'react';

interface Props {
  title: string;
}

export const Option: React.FC<Props> = ({ title }) => (
  <label>
    <input type="checkbox" />
    {title}
  </label>
);
