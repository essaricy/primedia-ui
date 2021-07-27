import HomeIcon from '@material-ui/icons/Home';
import RecentIcon from '@material-ui/icons/RecentActors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LikeIcon from '@material-ui/icons/ThumbUp';
import RateIcon from '@material-ui/icons/Grade';
import UploadIcon from '@material-ui/icons/Publish';
import HistoryIcon from '@material-ui/icons/History';

export const MENU_ITEMS = [
  { id: "HOME",         text: "Home",           icon: <HomeIcon /> },
  { id: "Divider_1",    text: "-"                                   },
  { id: "MOST_RECENT",  text: "Most Recent",    icon: <RecentIcon /> },
  { id: "MOST_VIEWED",  text: "Most Viewed",    icon: <VisibilityIcon /> },
  { id: "MOST_LIKED",   text: "Most Liked",     icon: <LikeIcon /> },
  { id: "MOST_RATED",   text: "Most Rated",     icon: <RateIcon /> },
  { id: "Divider_1",    text: "-"                                   },
  { id: "UPLOAD",       text: "Upload",         icon: <UploadIcon /> },
  { id: "HISTORY",      text: "Upload History", icon: <HistoryIcon /> },
];
