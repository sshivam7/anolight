import React, { useEffect } from 'react';
import { setupHighlighting } from './services/setup/highlight_setup_service';
import { setupColorUsage } from './services/setup/color_setup_service';
import { ColorDescription } from './common/types';

function App() {
  const colorOptions = [
    { name: 'red', val: 'FAA99D' },
    { name: 'yellow', val: 'FDDF7E' },
    { name: 'green', val: 'CCE29C' },
    { name: 'blue', val: '67EBFA' },
    { name: 'purple', val: 'CE97FB' },
  ];

  useEffect(() => {
    setupHighlighting();
    setupColorUsage(colorOptions);
  });

  return (
    <>
      <h2>Anolight</h2>
      <p>Select Highlighter Color</p>
      <div id="color-row">
        {colorOptions.map((color: ColorDescription) => (
          <>
            <label className="color-label">
              <input
                type="radio"
                name="color"
                id={color.val}
                value={color.val}
              />
              <div style={{ background: `#${color.val}` }}></div>
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
