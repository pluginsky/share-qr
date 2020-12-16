import React, { useState, useEffect, lazy, Suspense } from 'react';

import Tabs from './components/Tabs';
import OutOfLimit from './components/OutOfLimit';

import { useTabs } from './hooks/useTabs';
import { useText } from './hooks/useText';
import { useUrl } from './hooks/useUrl';

import { tabNames } from './constants/tabNames';

import { t } from '../shared/helpers/translate';

import { Tab } from '../shared/enums/Tab';

import './popup.scss';

const CodePreview = lazy(() => import('./components/CodePreview'));
const Details = lazy(() => import('./components/Details'));
const ErrorMessage = lazy(() => import('./components/ErrorMessage'));

const LETTER_LIMIT = 1000;

export const Popup = () => {
  const [decoded, setDecoded] = useState('');

  const [message, setMessage] = useState('');

  const { tab, setTab } = useTabs();

  const { text, setText, clearText } = useText();

  const { url, unsupportedProtocol } = useUrl();

  useEffect(() => {
    const handlePaste = (e: Event) => {
      setTab(Tab.Text);

      setText((e as ClipboardEvent).clipboardData.getData('text'));
    };

    const handleCopy = (e: Event) => {
      if (tab === Tab.Text) {
        (e as ClipboardEvent).clipboardData.setData('text/plain', decoded);
      }
    };

    const handleCut = (e: Event) => {
      if (tab === Tab.Text) {
        (e as ClipboardEvent).clipboardData.setData('text/plain', decoded);

        clearText();
      }
    };

    window.addEventListener('paste', handlePaste);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCut);

    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCut);
    };
  }, [tab]);

  useEffect(() => {
    if (tab) {
      setDecoded(tab === Tab.Text ? text : url);

      if (tab === Tab.Text && !text) {
        setMessage(t('selectTextToEncode'));
      } else if (tab === Tab.Url && !url) {
        setMessage(
          t('protocolNotSupported', unsupportedProtocol.toUpperCase())
        );
      }
    }
  }, [tab, text, url]);

  const trimmed = decoded.substr(0, LETTER_LIMIT);

  return (
    <div className="popup">
      <header className="popup__header">
        <Tabs
          items={tabNames}
          onChange={(value) => setTab(value)}
          active={tab}
        />
      </header>

      <main className="popup__main">
        <Suspense fallback={<p className="popup__loader">{t('appLoading')}</p>}>
          {decoded ? (
            <>
              <CodePreview decoded={trimmed} />

              <div className="popup__details">
                {tab === Tab.Text && (
                  <button className="clear" onClick={clearText}>
                    {t('detailsClear')}
                  </button>
                )}

                <Details summary={t('detailsSummary', tabNames[tab])}>
                  {trimmed}

                  <OutOfLimit decoded={decoded} limit={LETTER_LIMIT} />
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
