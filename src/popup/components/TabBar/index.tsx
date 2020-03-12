import React, { FunctionComponent } from 'react';

import './TabBar.css';

const TabBar: FunctionComponent = ({ children }) => (
  <nav className="tab-navigation">{children}</nav>
);

export default TabBar;
