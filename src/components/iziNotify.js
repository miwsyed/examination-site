import "izitoast/dist/css/iziToast.min.css";
const iziToast = require("izitoast");

export const notify2 = () =>
  iziToast.error({
    title: "Error",
    message: "This Email is not registered with us.",
    position: "topRight",
  });

export const notify = () =>
  iziToast.info({
    title: "",
    message: "Logged off.",
    position: "topCenter",
  });
