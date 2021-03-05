import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from 'react';
import * as clipboardy from 'clipboardy';

import Tabs from './components/Tabs';
import OutOfLimit from './components/OutOfLimit';

import { useClipboard } from './hooks/useClipboard';
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

  const handlePaste = useCallback(async () => {
    setActiveTab(Tab.Text);

    try {
      const clipboardData = await clipboardy.read();

      setText(clipboardData);
    } catch (err) {
      console.error('Failed to paste: ', err);
    }
  }, [setActiveTab, setText]);

  const handleCopy = useCallback(async () => {
    if (isActiveTextTab) {
      try {
        await clipboardy.write(decodedText);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  }, [decodedText, isActiveTextTab]);

  const handleCut = useCallback(async () => {
    // alert(isActiveTextTab);

    if (isActiveTextTab) {
      try {
        await clipboardy.write(decodedText);

        clearText();
      } catch (err) {
        console.error('Failed to cut: ', err);
      }
    }
  }, [clearText, decodedText, isActiveTextTab]);

  useClipboard({
    onPaste: handlePaste,
    onCopy: handleCopy,
    onCut: handleCut,
  });

  // TODO
  useEffect(() => {
    if (!activeTab) {
      return;
    }

    setDecodedText(isActiveTextTab ? text : url);

    if (isActiveTextTab && !text) {
      return setMessage(t('selectTextToEncode'));
    }

    if (activeTab === Tab.Url && !url) {
      return setMessage(
        t('protocolNotSupported', unsupportedProtocol.toUpperCase())
      );
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
        {/* TODO move fallback to separate component */}
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

              {/* TODO local message (Clipboard) */}
              {/* <ErrorMessage message={message} /> */}
            </>
          ) : (
            <ErrorMessage message={message} />
          )}
        </Suspense>
      </main>
    </div>
  );
};
