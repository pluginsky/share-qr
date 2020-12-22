import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';

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
  const [decodedText, setDecodedText] = useState('');

  const [message, setMessage] = useState('');

  const { activeTab, setActiveTab } = useTabs();

  const { text, setText, clearText } = useText();

  const { url, unsupportedProtocol } = useUrl();

  const isActiveTextTab = useMemo(() => activeTab === Tab.Text, [activeTab]);

  useEffect(() => {
    const handlePaste = async () => {
      setActiveTab(Tab.Text);

      const clipboardData = await navigator.clipboard.readText();

      setText(clipboardData);
    };

    const handleCopy = async () => {
      if (isActiveTextTab) {
        try {
          await navigator.clipboard.writeText(decodedText);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
    };

    const handleCut = async () => {
      if (isActiveTextTab) {
        try {
          await navigator.clipboard.writeText(decodedText);

          clearText();
        } catch (err) {
          console.error('Failed to cut: ', err);
        }
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
  }, [
    activeTab,
    clearText,
    decodedText,
    isActiveTextTab,
    setActiveTab,
    setText,
  ]);

  useEffect(() => {
    if (activeTab) {
      setDecodedText(isActiveTextTab ? text : url);

      if (isActiveTextTab && !text) {
        setMessage(t('selectTextToEncode'));
      } else if (activeTab === Tab.Url && !url) {
        setMessage(
          t('protocolNotSupported', unsupportedProtocol.toUpperCase())
        );
      }
    }
  }, [activeTab, isActiveTextTab, text, unsupportedProtocol, url]);

  const trimmedText = useMemo(() => decodedText.substr(0, LETTER_LIMIT), [
    decodedText,
  ]);

  return (
    <div className="popup">
      <header className="popup__header">
        <Tabs
          items={tabNames}
          onChange={(value) => setActiveTab(value)}
          active={activeTab}
        />
      </header>

      <main className="popup__main">
        <Suspense fallback={<p className="popup__loader">{t('appLoading')}</p>}>
          {decodedText ? (
            <>
              <CodePreview decoded={trimmedText} />

              <div className="popup__details">
                {isActiveTextTab && (
                  <button className="clear" onClick={clearText}>
                    {t('detailsClear')}
                  </button>
                )}

                <Details summary={t('detailsSummary', tabNames[activeTab])}>
                  {trimmedText}

                  <OutOfLimit decoded={decodedText} limit={LETTER_LIMIT} />
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
