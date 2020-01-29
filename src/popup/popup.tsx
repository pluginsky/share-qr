import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import extension from 'extensionizer';

import TabItem from './components/TabItem';

import { renderQrCode } from './helpers/renderQrCode';
import { trimText } from './helpers/trimText';
import { markOutOfLimit } from './helpers/markOutOfLimit';

import { supportedProtocols } from './constants/supportedProtocols';

import './popup.css';

const Popup = () => {
  const ref = useRef();

  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const [tab, setTab] = useState('url');

  useEffect(() => {
    const getDataFromCurrentUrl = () => {
      extension.tabs.query(
        { currentWindow: true, active: true },
        (res: any) => {
          const currentPageProtocol = res[0].url.split(':')[0];

          if (supportedProtocols.includes(currentPageProtocol)) {
            setUrl(res[0].url);
            setError('');
          } else {
            setError(`Protocol ${currentPageProtocol} is not supported`);
          }
        }
      );
    };

    const getDataFromSelectedText = () => {
      extension.storage.local.get('selectedText', (res: any) => {
        if (res.selectedText) {
          setText(res.selectedText);
          setError('');
        } else {
          setError('Add selected text first');
        }
      });
    };

    if (tab === 'url') {
      getDataFromCurrentUrl();
    } else {
      getDataFromSelectedText();
    }
  }, [tab]);

  useEffect(() => {
    extension.storage.local.get('currentTab', (res: any) => {
      if (res.currentTab) {
        setTab(res.currentTab);
      }
    });
  }, []);

  useEffect(() => {
    if (url || text) {
      renderQrCode(ref.current, trimText(tab === 'url' ? url : text, 1000));
    }
  }, [tab, url, text]);

  useEffect(() => {
    extension.storage.local.set({ currentTab: tab });
  }, [tab]);

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

ReactDOM.render(<Popup />, document.getElementById('root'));
