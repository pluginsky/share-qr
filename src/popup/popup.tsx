import React, { useState, useEffect, lazy, Suspense } from 'react';

import Tabs from './components/Tabs';

import { useTabs } from './hooks/useTabs';
import { useText } from './hooks/useText';
import { useUrl } from './hooks/useUrl';

import { Tab } from '../shared/enums/Tab';

import './popup.scss';

const CodePreview = lazy(() => import('./components/CodePreview'));
const Details = lazy(() => import('./components/Details'));
const ErrorMessage = lazy(() => import('./components/ErrorMessage'));

export const Popup: React.FC = () => {
  const [decoded, setDecoded] = useState('');

  const [message, setMessage] = useState('');

  const { tab, setTab } = useTabs();

  const { text, setText, clearText } = useText();

  const { url, unsupportedProtocol } = useUrl();

  useEffect(() => {
    window.addEventListener('paste', (e: ClipboardEvent) => {
      setTab(Tab.Text);

      setText(e.clipboardData.getData('text'));
    });

    window.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', decoded);
    });

    window.addEventListener('cut', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', decoded);

      setDecoded('');
    });

    return () => {
      window.removeEventListener('paste', null);
      window.removeEventListener('copy', null);
      window.removeEventListener('cut', null);
    };
  }, []);

  useEffect(() => {
    if (tab) {
      setDecoded(tab === Tab.Text ? text : url);

      if (tab === Tab.Text && !text) {
        setMessage('First select the text to be encoded');
      } else if (tab === Tab.Url && !url) {
        setMessage(
          `Protocol ${unsupportedProtocol.toUpperCase()} is not supported`
        );
      }
    }
  }, [tab, text, url]);

  const LIMIT = 1000;

  const trimmed = decoded.substr(0, LIMIT);

  return (
    <div className="popup">
      <header className="popup__header">
        <Tabs
          items={Object.values(Tab)}
          onChange={(value) => setTab(value)}
          active={tab}
        />
      </header>

      <main className="popup__main">
        <Suspense fallback={<p className="popup__loader">Loading...</p>}>
          {decoded ? (
            <>
              <CodePreview decoded={trimmed} />

              <div className="popup__details">
                {tab === Tab.Text && (
                  <button className="clear" onClick={clearText}>
                    Clear
                  </button>
                )}

                <Details summary={`Decoded ${tab}`}>
                  {trimmed}
                  <span className="out-of-limit">{decoded.slice(LIMIT)}</span>
                </Details>
              </div>
            </>
          ) : (
            <ErrorMessage message={message} />
          )}
        </Suspense>
      </main>
    </div>
  );
};
