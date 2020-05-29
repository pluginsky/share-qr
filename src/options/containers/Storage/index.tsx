import React, { useState, useEffect } from 'react';
import extension from 'extensionizer';

import { Section } from '../../components/Section';
import { Option } from '../../components/Option';

import { StoreKey } from '../../../shared/enums/StoreKey';

import './options.scss';

export const Storage: React.FC = () => {
  const [history, setHistory] = useState();
  const [memory, setMemory] = useState();

  useEffect(() => {
    if (history || memory) {
      extension.storage.local.set({
        [StoreKey.History]: history,
        [StoreKey.Memory]: memory,
      });
    }
  }, [history, memory]);

  useEffect(() => {
    extension.storage.local.get(
      [StoreKey.History, StoreKey.Memory],
      (res: any) => {
        setMemory(res?.memory);
        setHistory(res?.history);
      }
    );
  }, []);

  return (
    <Section name="Remember Data">
      <Option
        title="History"
        checked={history}
        onClick={(e: any) => setHistory(e.target.checked)}
      />

      <Option
        title="Memory"
        checked={memory}
        onClick={(e: any) => setMemory(e.target.checked)}
      />
    </Section>
  );
};
