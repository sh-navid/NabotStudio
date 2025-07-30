export const fetchFileContent = async (filePath, projectName) => {
    const response = await fetch(
      `http://localhost:4000/file-content?path=${filePath}&project=${projectName}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.content;
  };
