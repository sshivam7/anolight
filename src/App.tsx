import browser, { Tabs } from 'webextension-polyfill';
import { useEffect } from 'react';

function App() {
  const colorOptions: string[] = ['red', 'yellow', 'green', 'blue', 'purple'];

  useEffect(() => {
    let highlightStatus = false;
    let toggleHighlight = document.getElementById(
      'toggle-highlight',
    ) as HTMLInputElement;

    browser.storage.local.get().then((store) => {
      highlightStatus = store.highlight_status || false;
      toggleHighlight.checked = highlightStatus;
    });

    toggleHighlight.addEventListener('click', () => {
      highlightStatus = !highlightStatus;
      browser.storage.local.set({ highlight_status: highlightStatus });

      let queryOptions = { active: true, currentWindow: true };
      browser.tabs.query(queryOptions).then((tabs: Tabs.Tab[]) => {
        const currentTab: Tabs.Tab | undefined = tabs[0];
        if (currentTab.id !== undefined) {
          browser.tabs
            .sendMessage(currentTab.id, {
              action: 'TOGGLE_HIGHLIGHT',
              data: { highlightStatus: highlightStatus },
            })
            .then((response) => {
              if (response.data === 'ERR') {
                alert('ANOLIGHT ERROR');
              }
            });
        }
      });
    });
  });

  return (
    <>
      <h2>Anolight</h2>
      <p>Select Highlighter Color</p>
      <div className="color-row">
        {colorOptions.map((color) => (
          <>
            <label className="color-label">
              <input type="radio" name="color" value={color} />
              <div className={color}></div>
            </label>
          </>
        ))}
      </div>

      <div className="row">
        <p>
          <strong>Toggle Highlight</strong>
        </p>
        <label className="switch">
          <input id="toggle-highlight" type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </>
  );
}

export default App;
