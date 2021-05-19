import "izitoast/dist/css/iziToast.min.css";
const iziToast = require("izitoast");

export const notify2 = () =>
  iziToast.info({
    title: "",
    message: "Exam is Already Created.",
    position: "topCenter",
  });

export const notify = () =>
  iziToast.info({
    title: "Success",
    message: "Exam Created Successfully",
    position: "topRight",
    timeout: 2000,
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
export const notifyUpdatedQuestion = () =>
  iziToast.success({
    title: "Success",
    message: "Question Updated",
    position: "topRight",
    timeout: 2000,
  });

export const notifyAddedQuestion = () =>
  iziToast.success({
    title: "Success",
    message: "Question Added",
    position: "topRight",
    timeout: 2000,
  });
