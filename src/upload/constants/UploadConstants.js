const INIT = "INIT";
const REQUESTED = "REQUESTED";
const PROC_START = "PROC_START";
const THUMB_FAIL = "THUMB_FAIL";
const THUMB_DONE = "THUMB_DONE";
const SAVE_FAIL = "SAVE_FAIL";
const SAVE_DONE = "SAVE_DONE";

const IN_PROGRESS_STATUSES = [ INIT, REQUESTED, PROC_START, THUMB_DONE ];

export const STATUS_ATTIBUTES = {
  INIT:           { value: 5,   color: "green",   label: "Initializing upload" },
  REQUESTED:      { value: 20,  color: "green",   label: "Uploaded the file and processing the file has started" },
  PROC_START:     { value: 40,  color: "green",   label: "Processed the file and generating thumbnails" },
  THUMB_DONE:     { value: 66,  color: "green",   label: "Generated thumbnail and saving content" },
  SAVE_DONE:      { value: 100, color: "green",   label: "Saved all content successfully!" },
  THUMB_FAIL:     { value: 100, color: "red",     label: "Generation of thumbnail has failed" },
  SAVE_FAIL:      { value: 100, color: "red",     label: "Unable to save content/thumbnail" },
}

export const getInitProgress = () => {
  return STATUS_ATTIBUTES[INIT];
}
export const isInProgress = (code) => {
  return IN_PROGRESS_STATUSES.includes(code);
}
export const isSuccessful = (code) => {
  return code === SAVE_DONE;
}
export const getLabel = (code) => {
  return STATUS_ATTIBUTES[code].label;
}
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



export const UPLOAD_STEPS = [
  { code: "INIT",       label: "Upload File" },
  { code: "REQUESTED",  label: "Request Processing" },
  { code: "PROC_START", label: "Process file" },
  { code: "THUMB_DONE", label: "Generate thumbnail", failCode: "THUMB_FAIL" },
  { code: "SAVE_DONE",  label: "Store media", failCode: "SAVE_FAIL" }
];