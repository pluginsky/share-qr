import React from 'react';

import './TabBar.scss';

const TabBar: React.FC = ({ children }) => (
  <nav className="tab-navigation">{children}</nav>
);

export default TabBar;
