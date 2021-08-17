export const UPLOAD_STEPS = [
  { sCode: "UPLOADED", sLabel: "Upload File" },
  { sCode: "INIT", sLabel: "Initializing" },
  { sCode: "THUMB_DONE", sLabel: "Generate thumbnail", fCode: "THUMB_FAIL", fLabel: "Generating thumbnail failed!" },
  { sCode: "DB_DONE", sLabel: "Save to database", fCode: "DB_FAIL", fLabel: "Saving to database failed!" },
  { sCode: "FILE_DONE", sLabel: "Save to file system", fCode: "FILE_FAIL", fLabel: "Saving to file system failed!" },
  { sCode: "ALL_DONE", sLabel: "Finishing" }
];

export const getMediaTypeError = () => {
  return "Select only image or video files";
}
export const getUploadServiceError = () => {
  return "Upload service is down. try again after some time";
}
export const getExpiredProgressError = () => {
  return "Progress id is either expired or is invalid";
}
export const getProgressServiceError = () => {
  return "Progress service is down. try again after some time";
}

export const getFirstStep = () => {
  return "UPLOADED";
}
export const isCompleted = (status) => {
  return status === "ALL_DONE";
}
