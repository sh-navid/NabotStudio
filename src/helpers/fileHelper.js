export const getFilePath = (item, basePath) => {
    let path = item.name;
    let parent = item.parent;

    while (parent && parent.name) {
      path = `${parent.name}/${path}`;
      parent = parent.parent;
    }

    return `${path}`;
  };
