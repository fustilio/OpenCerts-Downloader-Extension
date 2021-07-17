import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [resolution, setResolution] = useState<number>(2);
  const [defaultFileName, setDefaultFileName] = useState<string>("document");
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        storedResolution: resolution,
        storedDefaultFileName: defaultFileName,
      },
      (items) => {
        setResolution(items.storedResolution);
        setDefaultFileName(items.storedDefaultFileName);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        storedResolution: resolution,
        storedDefaultFileName: defaultFileName,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus(undefined);
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div>
        Export resolution:&nbsp;
        <select
          value={resolution}
          onChange={(event) => setResolution(parseInt(event.target.value))}
        >
          <option value={1}>low</option>
          <option value={2}>default</option>
          <option value={3}>high</option>
          <option value={4}>highest</option>
        </select>
      </div>
      {/* <div>
        <label>
          <input
            type="checkbox"
            checked={like}
            onChange={(event) => setLike(event.target.checked)}
          />
          I like colors.
        </label>
      </div> */}
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
