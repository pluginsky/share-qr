import React from 'react';

import { Children } from '../../types/Children';

import './TabBar.css';

interface Props {
  children: Children;
}

const TabBar = ({ children }: Props) => (
  <nav className="tab-navigation">{children}</nav>
);

export default TabBar;
