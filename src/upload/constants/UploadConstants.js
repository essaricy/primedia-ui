export const INIT = "INIT";
export const INIT_FAIL = "INIT_FAIL";
export const REQUESTED = "REQUESTED";
export const PROC_START = "PROC_START";
export const THUMB_FAIL = "THUMB_FAIL";
export const THUMB_DONE = "THUMB_DONE";
export const SAVE_FAIL = "SAVE_FAIL";
export const SAVE_DONE = "SAVE_DONE";

export const STATES_IN_PROGRESS = [ INIT, REQUESTED, PROC_START, THUMB_DONE ];
export const STATES_FAIL = [ INIT_FAIL, THUMB_FAIL, SAVE_FAIL ];
export const STATES_COMPLETE = [ INIT_FAIL, THUMB_FAIL, SAVE_FAIL, SAVE_DONE ];

export const STATUS_ATTIBUTES = {
    INIT:       { value: 5,   color: "green",    label: "Initializing upload" },
    INIT_FAIL:  { value: 10,  color: "red",     label: "Service is not available" },
    REQUESTED:  { value: 20,  color: "green",   label: "Started uploading the file" },
    PROC_START: { value: 40,  color: "green",   label: "Processing of file has started" },
    THUMB_FAIL: { value: 50,  color: "red",     label: "Generation of thumbnail has failed" },
    THUMB_DONE: { value: 66,  color: "green",   label: "Generated thumbnail successfully" },
    SAVE_FAIL:  { value: 85,  color: "red",     label: "Saving content/thumbnail has failed" },
    SAVE_DONE:  { value: 100, color: "green",   label: "Saved all content successfully!" },
  }

export const isInProgress = (code) => {
    return STATES_IN_PROGRESS.includes(code);
  }
  