import React, { HTMLProps } from 'react';

import './Option.scss';

interface Props extends HTMLProps<HTMLInputElement> {
  title: string;
}

export const Option: React.FC<Props> = ({ title, ...props }) => (
  <label>
    <input type="checkbox" {...props} />

    {title}
  </label>
);
