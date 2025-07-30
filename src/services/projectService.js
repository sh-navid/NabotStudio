export const fetchProjects = async () => {
  const response = await fetch("http://localhost:4000/status");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchFileStructure = async (projectName) => {
  const response = await fetch(
    `http://localhost:4000/files?path=${projectName}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
