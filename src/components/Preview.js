import { useRef, useEffect } from 'react';

function Preview({ url }) {
  const iframeRef = useRef(null);
  const defaultURL = "http://localhost:5401";

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = url || defaultURL;
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