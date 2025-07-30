import { useRef, useEffect } from 'react';

const DEFAULT_URL = "http://localhost:5401";

function Preview({ url }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = url || DEFAULT_URL;
    }
  }, [url]);

  return (
    <div className="preview">
      <iframe
        ref={iframeRef}
        title="External URL Preview"
        style={{ width: '100%', height: '100%', border: 'none !important' }}
      />
    </div>
  );
}

export default Preview;