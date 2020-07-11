import React from 'react';

import { Tab } from '../../../shared/enums/Tab';

import './Tabs.scss';

interface Props {
  readonly items: Record<Tab, string>;
  readonly active: Tab;
  onChange(value: Tab): void;
}

const Tabs: React.FC<Props> = ({ items, active, onChange }) => (
  <nav className="tab-navigation">
    {Object.entries(items).map(([key, value]) => (
      <div className="tab-navigation__item" key={key}>
        <input
          name={name}
          value={key}
          type="radio"
          id={key}
          checked={active === key}
          onChange={(e) => onChange(e.target.value as Tab)}
        />

        <label htmlFor={key}>{value}</label>
      </div>
    ))}
  </nav>
);

export default Tabs;
