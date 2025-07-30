/* [[NabotStudio/src/pages/Studio.js]] */
import RightMenu from "../components/RightMenu";
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";
import { useState } from "react";
import { fetchFileContent } from "../services/fileService";

function IDE() {
  const [code, setCode] = useState("// start coding!");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleProjectSelect = (project) => {
    setPreviewUrl(`http://localhost:${project.port}`);
  };

  const handleFileSelect = async (filePath) => {
    try {
      const content = await fetchFileContent(filePath.path, filePath.project);
      setCode(content);
    } catch (error) {
      console.error("Could not fetch file content:", error);
      setCode(`// ERROR: Could not load file content.\n// ${error.message}`);
    }
  };

  return (
    <div className="ide">
      <Sidebar
        onProjectSelect={handleProjectSelect}
        onFileSelect={handleFileSelect}
      />
      <div className="editor-container">
        <Preview url={previewUrl} />
      </div>
      <RightMenu />
    </div>
  );
}

export default IDE;