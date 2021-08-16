export const getActiveData = (data) => data.filter((m) => m.active === true);
export const getInactiveData = (data) => data.filter((m) => m.active === false);
