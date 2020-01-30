import React, { useEffect, useRef, useContext } from 'react';

import TabItem from './components/TabItem';

import { trimText } from './helpers/trimText';
import { markOutOfLimit } from './helpers/markOutOfLimit';

import { useUrl } from './hooks/useUrl';
import { useSelectedText } from './hooks/useSelectedText';
import { useQrCode } from './hooks/useQrCode';

import { PopupContext } from './context';

import './popup.css';

export const Popup = () => {
  const ref = useRef();

  const { error, tab, setTab } = useContext(PopupContext);

  const { url } = useUrl();
  const { text, clearText } = useSelectedText();

  const { renderQrCode } = useQrCode();

  useEffect(() => {
    if (url || text) {
      renderQrCode(ref.current, trimText(tab === 'url' ? url : text, 1000));
    }
  }, [tab, url, text]);

  return (
    <div className="container">
      <header>
        <nav className="tab-navigation">
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
        </nav>
      </header>

      <main>
        {((tab === 'url' && url) || (tab === 'text' && text)) && (
          <>
            <canvas ref={ref} />

            {tab === 'text' && text && <button onClick={clearText}>X</button>}

            <details>
              <summary>Encoded {tab === 'url' ? 'URL' : 'Text'}</summary>
              <p>{markOutOfLimit(tab === 'url' ? url : text)}</p>
            </details>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
      </main>
    </div>
  );
};
