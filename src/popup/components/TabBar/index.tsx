import React from 'react';

import './TabBar.css';

const TabBar: React.FC = ({ children }) => (
  <nav className="tab-navigation">{children}</nav>
);

export default TabBar;
