/**/
import { useState } from "react";
import Editor from "../components/Editor";
import Output from "../components/Output";
import Preview from "../components/Preview";
import RightMenu from "../components/RightMenu";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";

function IDE() {
    const [code, setCode] = useState('// start coding!');
    const [output, setOutput] = useState('');
    //const [previewContent, setPreviewContent] = useState('');
		const [previewUrl, setPreviewUrl] = useState(null);


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
        //setPreviewContent(newCode); // removing  Update preview content
    };

    return (
        <div className="ide">
            <Sidebar onProjectSelect={handleProjectSelect}/>
            <div className="editor-container">
                <Toolbar runCode={runCode} />
                <div style={{ display: 'flex', flexGrow: 1}}> {/* Horizontal layout */}
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}> {/* Vertical layout for editor and output */}
                        <Editor code={code} handleCodeChange={handleCodeChange} />
                        <Output output={output} />
                    </div>
                    <Preview url={previewUrl} />
                </div>
            </div>
            <RightMenu />
        </div>
    );
}

export default IDE;