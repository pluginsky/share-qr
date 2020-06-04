import React from 'react';

import { useTabs } from '../../hooks/useTabs';

import { Tab } from '../../../shared/enums/Tab';

import './Tabs.scss';

interface Props {
  readonly items: string[];
}

const Tabs: React.FC<Props> = ({ items }) => {
  const { tab, setTab } = useTabs();

  return (
    <nav className="tab-navigation">
      {items.map((item) => (
        <div className="tab-navigation__item" key={item}>
          <input
            name={name}
            value={item}
            type="radio"
            id={item}
            checked={tab === item}
            onChange={(e) => setTab(e.target.value as Tab)}
          />

          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </nav>
  );
};

export default Tabs;
