export const checkValue = (key, expectedVal) => {
  try {
    const item = localStorage.getItem(key);
    if (item === expectedVal) {
    } else {
      localStorage.clear();
    }
  } catch (error) {
    localStorage.clear();
  }
};
