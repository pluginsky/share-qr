import React, { useState, useMemo } from 'react';

import { Tab } from '../../../shared/enums/Tab';

import './Tabs.scss';

interface Props {
  readonly items: Record<Tab, string>;
  readonly active: Tab;
  onChange(value: Tab): void;
}

const Tabs: React.FC<Props> = ({ items, active, onChange }) => {
  const [position, setPosition] = useState(0);

  const size = useMemo(() => 100, []);

  return (
    <nav className="tab-navigation">
      <div
        className="tab-navigation__selector"
        style={{ width: size, left: size * Object.keys(items).indexOf(active) }}
      />

      {Object.entries(items).map(([key, value]) => (
        <div className="tab-navigation__item" key={key}>
          <input
            name={name}
            value={key}
            type="radio"
            id={key}
            checked={active === key}
            onClick={(e) => console.log(e.target)}
            onChange={(e) => onChange(e.target.value as Tab)}
          />

          <label htmlFor={key}>{value}</label>
        </div>
      ))}
    </nav>
  );
};

export default Tabs;
