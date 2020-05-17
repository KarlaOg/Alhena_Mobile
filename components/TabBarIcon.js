import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../assets/styles/';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.TabBar.tabIconSelected : Colors.TabBar.tabIconDefault}
    />
  );
}
