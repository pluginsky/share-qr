import React, { ReactChildren } from 'react';

import './TabBar.css';

interface Props {
  children: ReactChildren | ReactChildren[] | any;
}

const TabBar = ({ children }: Props) => (
  <nav className="tab-navigation">{children}</nav>
);

export default TabBar;
