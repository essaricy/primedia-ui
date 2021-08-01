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
  REQUESTED:      { value: 20,  color: "green",   label: "Started uploading the file" },
  PROC_START:     { value: 40,  color: "green",   label: "Processing of file has started" },
  THUMB_DONE:     { value: 66,  color: "green",   label: "Generated thumbnail successfully" },
  SAVE_DONE:      { value: 100, color: "green",   label: "Saved all content successfully!" },
  THUMB_FAIL:     { value: 100, color: "red",     label: "Generation of thumbnail has failed" },
  SAVE_FAIL:      { value: 100, color: "red",     label: "Saving content/thumbnail has failed" },
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
  return IN_PROGRESS_STATUSES[code].label;
}
export const getMediaTypeError = () => {
  return "Select only image or video files";
}
export const getUploadServiceError = () => {
  return "Upload service is down. try again after some time";
}