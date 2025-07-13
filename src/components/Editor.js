import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

function Editor({ code, handleCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    Prism.highlightElement(editorRef.current);
  }, [code]);

  return (
    <div className="editor-holder">
      <pre className="line-numbers">
        <code className="language-javascript" ref={editorRef}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default Editor;
