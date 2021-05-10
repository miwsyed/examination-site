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
export const notifyAdded = () =>
  iziToast.success({
    title: "Success",
    message: "Student Added Successfully",
    position: "topRight",
    timeout: 1000,
  });

export const notifyUpdated = () =>
  iziToast.success({
    title: "Success",
    message: "Student details Updated",
    position: "topRight",
    timeout: 2000,
  });
