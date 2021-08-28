import SyncDownIcon from '@material-ui/icons/GetApp';
import SyncUpIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/CloudDownload';

export const ACTIVITIES = {
    "GEN_THUMBS" : {
        name: "Generate Thumbnails",
        description: "To sync the media files from the permanent storage to the file system. Media files served from file system are optimized and are availble for offline access.",
        icon: <SyncDownIcon />,
        path: 'generate/thumbs'
    },
    "GEN_DURATIONS": {
        name: "Generate Durations",
        description: "To sync the media files from the file system to the permanent storage. This can be used as a restore media files to the database.",
        icon: <SyncUpIcon/>,
        path: 'generate/durations',
    },
    "SYNC_UP": {
        name: "Sync Up",
        description: "To sync the media files from the file system to the permanent storage. This can be used as a restore media files to the database.",
        icon: <SyncUpIcon />,
        path: 'sync/up'
    },
    "SYNC_DOWN": {
        name: "Sync Down",
        description: "To sync the media files from the permanent storage to the file system. Media files served from file system are optimized and are availble for offline access.",
        icon: <SyncDownIcon />,
        path: 'sync/down'
    },
    "REPLICATE": {
        name: "Download",
        description: "To download the media files for offline viewing",
        icon: <DownloadIcon />,
        path: 'replicate'
    }
};

  
export const getName = (activity) => {
    return ACTIVITIES[activity].name;
}
export const getDescription = (activity) => {
    return ACTIVITIES[activity].description;
}
export const getIcon = (activity) => {
    return ACTIVITIES[activity].icon;
}
export const getPath = (activity) => {
    return ACTIVITIES[activity].path;
}
