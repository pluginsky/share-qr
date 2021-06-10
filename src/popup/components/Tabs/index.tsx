import { memo } from 'react';

import { Tab } from '../../../shared/enums/Tab';

import './Tabs.scss';

interface TabsProps {
  readonly items: Record<Tab, string>;
  readonly active: Tab;
  onChange: (value: Tab) => void;
}

const Tabs = memo<TabsProps>(({ items, active, onChange }) => (
  <nav className="tab-navigation">
    {Object.entries(items).map(([key, value]) => (
      <div className="tab-navigation__item" key={key}>
        <input
          name={key}
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
));

export default Tabs;
