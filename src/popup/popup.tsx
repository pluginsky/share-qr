import React, { useContext, Suspense, lazy } from 'react';

import Tabs from './components/Tabs';
import ErrorMessage from './components/ErrorMessage';

import CodePreview from './containers/CodePreview';

import { StateContext } from './context';

// import { useClipboard } from './hooks/useClipboard';

import { Tab } from '../shared/enums/Tab';

import './popup.scss';

// const Url = lazy(() => import('./containers/Url'));
// const Text = lazy(() => import('./containers/Text'));

export const Popup: React.FC = () => {
  const { error, tab } = useContext(StateContext);

  // const { url } = useUrl();

  // const { text } = useText();

  // const x = useClipboard();

  /* <Tabs items={Object.values(Tab)} /> */

  return (
    <div className="popup">
      <header className="popup__header">
        <Tabs items={['URL', 'Text', 'Saved']} />
      </header>

      <main className="popup__main">
        <CodePreview />

        {/* <Suspense fallback="loading">
          {() => {
            switch (tab) {
              case Tab.Url:
                return <Url />;

              case Tab.Text:
                return <Text />;

              case Tab.Saved:
                return <p>aa</p>;
            }
          }}
        </Suspense> */}

        {/* <Details summary={`Encoded ${tab === Tabs.Url ? 'URL' : 'Text'}`}>
          <DecodedPreview text={decoded} />
        </Details> */}

        {error && <ErrorMessage message={error} />}
      </main>
    </div>
  );
};
