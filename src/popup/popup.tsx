import React, { useState, useEffect, useContext } from 'react';
import { useQrEncode } from 'react-qr-hooks';

import TabBar from './components/TabBar';
import TabItem from './components/TabItem';
import Details from './components/Details';
import ErrorMessage from './components/ErrorMessage';
import DecodedPreview from './components/DecodedPreview';

import { trimText } from './helpers/trimText';

import { useUrl } from './hooks/useUrl';
import { useText } from './hooks/useText';

import { StateContext } from './context';

import { Tabs } from './enums/Tabs';

import './popup.css';

export const Popup: React.FC = () => {
  const { error, tab, setTab } = useContext(StateContext);

  const { url } = useUrl();

  const { text } = useText();

  const [decoded, setDecoded] = useState('');

  useEffect(() => {
    setDecoded(tab === Tabs.Url ? url : text);
  }, [tab, url, text]);

  const trimmed = trimText(decoded, 1000);

  const encoded = useQrEncode(trimmed, {
    width: 360,
  });

  return (
    <div className="container">
      <header>
        <TabBar>
          <TabItem
            name="tab"
            value="url"
            checked={tab === Tabs.Url}
            onChange={(e) => setTab(e.target.value)}
            title="Current URL"
          />

          <TabItem
            name="tab"
            value="text"
            checked={tab === Tabs.Text}
            onChange={(e) => setTab(e.target.value)}
            title="Selected Text"
          />
        </TabBar>
      </header>

      <main>
        {((tab === Tabs.Url && url) || (tab === Tabs.Text && text)) && (
          <>
            <img src={encoded} alt={trimmed} />

            <Details summary={`Encoded ${tab === Tabs.Url ? 'URL' : 'Text'}`}>
              <DecodedPreview text={decoded} />
            </Details>
          </>
        )}

        {error && <ErrorMessage message={error} />}
      </main>
    </div>
  );
};
