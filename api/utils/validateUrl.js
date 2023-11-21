module.exports = (uncheckedUrl) => {
  try {
    new URL(uncheckedUrl);
    return true;
  } catch (error) {
    return false;
  }
};
