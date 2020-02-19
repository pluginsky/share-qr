import React, { useState, useEffect, useContext } from 'react';
import { useQrEncode } from 'react-qr-hooks';

import TabBar from './components/TabBar';
import TabItem from './components/TabItem';
import Details from './components/Details';
import ErrorMessage from './components/ErrorMessage';

import { trimText } from './helpers/trimText';
import { markOutOfLimit } from './helpers/markOutOfLimit';

import { useUrl } from './hooks/useUrl';
import { useText } from './hooks/useText';

import { PopupContext } from './context';

import './popup.css';

export const Popup = () => {
  const { error, tab, setTab } = useContext(PopupContext);

  const { url } = useUrl();

  const {
    text,
    setText,
    // debounced,
    clearText,
    toggleEitable,
    editable
  } = useText();

  const [decoded, setDecoded] = useState('');

  useEffect(() => {
    setDecoded(tab === 'url' ? url : text);
  }, [tab, url, text]);

  const trimmed = trimText(decoded, 1000);

  const encoded = useQrEncode(trimmed, {
    width: 360
  } as any);

  return (
    <div className="container">
      <header>
        <TabBar>
          <TabItem
            name="tab"
            value="url"
            checked={tab === 'url'}
            onChange={e => setTab(e.target.value)}
            title="Current URL"
          />

          <TabItem
            name="tab"
            value="text"
            checked={tab === 'text'}
            onChange={e => setTab(e.target.value)}
            title="Selected Text"
          />
        </TabBar>
      </header>

      <main>
        {((tab === 'url' && url) || (tab === 'text' && text)) && (
          <>
            <img src={encoded} alt={trimmed} />

            {/* {tab === 'text' && text && (
              <button className="button--clear" onClick={clearText} />
            )}

            {tab === 'text' && text && (
              <button className="button--editable" onClick={toggleEitable}>
                Edit
              </button>
            )} */}

            <Details summary={`Encoded ${tab === 'url' ? 'URL' : 'Text'}`}>
              <p>{markOutOfLimit(tab === 'url' ? url : text)}</p>

              {/* <textarea
                placeholder="Add selected text first"
                value={decoded}
                disabled={!editable}
                // value={markOutOfLimit(decoded)}
                onChange={e => setText(e.target.value)}
              /> */}
            </Details>
          </>
        )}

        {error && <ErrorMessage message={error} />}
      </main>
    </div>
  );
};
