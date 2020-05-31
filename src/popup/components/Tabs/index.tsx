import React, { useContext } from 'react';

import { StateContext } from '../../context';

import './Tabs.scss';

interface Props {
  readonly items: string[];
}

const Tabs: React.FC<Props> = ({ items }) => {
  const { tab, setTab } = useContext(StateContext);

  return (
    <nav className="tab-navigation">
      {items.map((item) => (
        <div className="tab-navigation__item">
          <input
            name={name}
            value={item}
            type="radio"
            id={item}
            checked={tab === item}
            onChange={(e) => setTab(e.target.value)}
          />

          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </nav>
  );
};

export default Tabs;
