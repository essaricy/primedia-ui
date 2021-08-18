export const UPLOAD_STEPS = [
  { sCode: "UPLOADED", sLabel: "Upload File" },
  { sCode: "INIT", sLabel: "Initializing" },
  { sCode: "THUMB_DONE", sLabel: "Generate thumbnail", fCode: "THUMB_FAIL", fLabel: "Generating thumbnail failed!" },
  { sCode: "DB_DONE", sLabel: "Save to database", fCode: "DB_FAIL", fLabel: "Saving to database failed!" },
  { sCode: "FILE_DONE", sLabel: "Save to file system", fCode: "FILE_FAIL", fLabel: "Saving to file system failed!" },
  { sCode: "ALL_DONE", sLabel: "Finilizing" }
];

export const SELECT_FILE_ERROR = "Select a file";
export const MEDIA_SELECTION_ERROR = "Select only image or video files";
export const UPLOAD_SERVICE_ERROR = "Upload service is down. try again after some time";
export const EXPIRED_PROGRESS_ERROR = "Progress id is either expired or is invalid";
export const PROGRESS_SERVICE_ERROR = "Progress service is down. try again after some time";

export const getFirstStep = () => {
  return "UPLOADED";
}
export const isCompleted = (status) => {
  return status === "ALL_DONE";
}
