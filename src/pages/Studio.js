/**/
import { useState } from "react";
import Editor from "../components/Editor";
import Output from "../components/Output";
import Preview from "../components/Preview";
import RightMenu from "../components/RightMenu";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Tabs from "../components/Tabs"; // Import Tabs component

function IDE() {
  const [code, setCode] = useState("// start coding!");
  const [output, setOutput] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("code"); // Default active tab

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(String(error));
    }
  };

  const handleProjectSelect = (project) => {
    setPreviewUrl(`http://localhost:${project.port}`);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
  };

  const handleFileSelect = async (filePath) => {
    try {
      const response = await fetch(
        `http://localhost:4000/file-content?path=${filePath.path}&project=${filePath.project}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCode(data.content);
    } catch (error) {
      console.error("Could not fetch file content:", error);
      setOutput(String(error));
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabsData = [
    { id: "preview", label: "Preview" },
    { id: "code", label: "Code" },
    { id: "terminal", label: "Terminal" },
  ];

  return (
    <div className="ide">
      <Sidebar
        onProjectSelect={handleProjectSelect}
        onFileSelect={handleFileSelect}
      />
      <div className="editor-container">
        
        <Tabs
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabsData={tabsData}
        />


        <div className="tab-content" style={{ display: activeTab === "preview" ? "block" : "none", flexGrow: 1 }}>
          <Preview url={previewUrl} />
        </div>

        

        <div
          className="tab-content"
          style={{
            display: activeTab === "code" ? "block" : "none",
            position: "relative",
            flexGrow: 1,
          }}
        >
          <Editor code={code} handleCodeChange={handleCodeChange} />
        </div>

        <div
          className="tab-content"
          style={{ display: activeTab === "terminal" ? "block" : "none" }}
        >
          <Output output={output} />
        </div>

        <Toolbar runCode={runCode} />
      </div>
      <RightMenu />
    </div>
  );
}

export default IDE;