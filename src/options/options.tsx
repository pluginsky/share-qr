import React, { useState, useEffect } from 'react';
import extension from 'extensionizer';

import { Section } from './components/Section';
import { Option } from './components/Option';

import './options.css';

export const Options: React.FC = () => {
  const [history, setHistory] = useState(false);
  const [memory, setMemory] = useState(false);

  const [copy, setCopy] = useState(false);
  const [paste, setPaste] = useState(false);
  const [cut, setCut] = useState(false);

  useEffect(() => {}, []);

  extension.storage.local.set({
    options: null,
  });

  return (
    <div>
      <Section name="Remember Data">
        <Option title="History" />
        <Option title="Memory" />
      </Section>

      <Section name="Actions">
        <Option title="Copy" />
        <Option title="Paste" />
        <Option title="Cut" />
      </Section>
    </div>
  );
};
