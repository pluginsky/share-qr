import {
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

import { Tab } from '../shared/constants/Tab';

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
    try {
      const clipboardData = await clipboardy.read();

      setText(clipboardData);
    } catch (err) {
      // TODO handle
      console.error('Failed to paste: ', err);
    }
  }, [setText]);

  const handleCopy = useCallback(async () => {
    if (isActiveTextTab) {
      try {
        await clipboardy.write(decodedText);
      } catch (err) {
        // TODO handle
        console.error('Failed to copy: ', err);
      }
    }
  }, [decodedText, isActiveTextTab]);

  const handleCut = useCallback(async () => {
    if (isActiveTextTab) {
      try {
        await clipboardy.write(decodedText);

        clearText();
      } catch (err) {
        // TODO handle
        console.error('Failed to cut: ', err);
      }
    }
  }, [clearText, decodedText, isActiveTextTab]);

  useClipboard({
    onPaste: handlePaste,
    onCopy: handleCopy,
    onCut: handleCut,
  });

  // TODO? clean up
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

  // TODO fix prettier
  const trimmedText = useMemo(
    () => decodedText.substr(0, LETTER_LIMIT),
    [decodedText]
  );

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
