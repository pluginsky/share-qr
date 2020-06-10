import React from 'react';

import { Tab } from '../../../shared/enums/Tab';

import './Tabs.scss';

interface Props {
  readonly items: string[];
  readonly active: Tab;
  onChange(value: Tab): void;
}

const Tabs: React.FC<Props> = ({ items, active, onChange }) => (
  <nav className="tab-navigation">
    {items.map((item) => (
      <div className="tab-navigation__item" key={item}>
        <input
          name={name}
          value={item}
          type="radio"
          id={item}
          checked={active === item}
          onChange={(e) => onChange(e.target.value as Tab)}
        />

        <label htmlFor={item}>{item}</label>
      </div>
    ))}
  </nav>
);

export default Tabs;
