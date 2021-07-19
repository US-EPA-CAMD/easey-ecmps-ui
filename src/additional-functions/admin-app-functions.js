export const logOut = () => {
  sessionStorage.removeItem("cdx_user");
  window.location = "/";
};
