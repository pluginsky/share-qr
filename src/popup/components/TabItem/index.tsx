import React, { ChangeEvent } from 'react';

import './TabItem.css';

interface Props {
  value: string;
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const TabItem = ({ value, name, checked, onChange, title }: Props) => (
  <div className="tab-item">
    <input
      type="radio"
      name={name}
      value={value}
      id={value}
      checked={checked}
      onChange={onChange}
    />

    <label htmlFor={value}>{title}</label>
  </div>
);

export default TabItem;