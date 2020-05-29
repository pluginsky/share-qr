import React, { useState, useEffect } from 'react';
import extension from 'extensionizer';

import { Section } from '../../components/Section';
import { Option } from '../../components/Option';

import { StoreKey } from '../../../shared/enums/StoreKey';

import './options.scss';

export const Actions: React.FC = () => {
  const [copy, setCopy] = useState();
  const [paste, setPaste] = useState();
  const [cut, setCut] = useState();

  useEffect(() => {
    if (copy || paste || cut) {
      extension.storage.local.set({
        [StoreKey.Clipboard]: { copy, paste, cut },
      });
    }
  }, [copy, paste, cut]);

  useEffect(() => {
    extension.storage.local.get(
      [StoreKey.Clipboard, StoreKey.History, StoreKey.Memory],
      (res: any) => {
        setCopy(res.clipboard?.copy);
        setPaste(res.clipboard?.paste);
        setCut(res.clipboard?.cut);
      }
    );
  }, []);

  return (
    <Section name="Actions">
      <Option
        title="Copy"
        checked={copy}
        onClick={(e: any) => setCopy(e.target.checked)}
      />

      <Option
        title="Paste"
        checked={paste}
        onClick={(e: any) => setPaste(e.target.checked)}
      />

      <Option
        title="Cut"
        checked={cut}
        onClick={(e: any) => setCut(e.target.checked)}
      />
    </Section>
  );
};
