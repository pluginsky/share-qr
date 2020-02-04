import React, { useEffect, useRef, useContext } from 'react';

import TabBar from './components/TabBar';
import TabItem from './components/TabItem';
import Details from './components/Details';
import ErrorMessage from './components/ErrorMessage';

import { trimText } from './helpers/trimText';
// import { markOutOfLimit } from './helpers/markOutOfLimit';

import { useUrl } from './hooks/useUrl';
import { useText } from './hooks/useText';
import { useQrCode } from './hooks/useQrCode';

import { PopupContext } from './context';

import './popup.css';

export const Popup = () => {
  const ref = useRef();

  const { error, tab, setTab } = useContext(PopupContext);

  const { url } = useUrl();
  const { text, editText, clearText } = useText();

  const { renderQrCode } = useQrCode();

  useEffect(() => {
    if (url || text) {
      renderQrCode(ref.current, trimText(tab === 'url' ? url : text, 1000));
    }
  }, [tab, url, text]);

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
            <canvas ref={ref} />

            {tab === 'text' && text && <button onClick={clearText}>X</button>}

            {/* {tab === 'text' && text && (
              <button onClick={setEditable}>{editable ? 'Save' : 'Edit'}</button>
            )} */}

            <Details summary={`Encoded ${tab === 'url' ? 'URL' : 'Text'}`}>
              {/* <p>{markOutOfLimit(tab === 'url' ? url : text)}</p> */}

              <input
                type="text"
                placeholder="Add selected text first"
                value={tab === 'url' ? url : text}
                // value={markOutOfLimit(tab === 'url' ? url : text)}
                // onChange={e => editText(e.target.value)}
              />
            </Details>
          </>
        )}

        {error && <ErrorMessage message={error} />}
      </main>
    </div>
  );
};
