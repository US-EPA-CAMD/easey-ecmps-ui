export const getActiveData = (data) => {
  return data.filter((m) => m.active === true);
};

export const getInactiveData = (data) => {
  return data.filter((m) => m.active === false);
};
