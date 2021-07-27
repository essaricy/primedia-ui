import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import * as MediaUtil from '../../app/util/MediaUtil';

function Gallery(props) {
  const { items, media, handleNavigation } = props;

  const renderVideo = (item) => {
    console.log("renderVideo", item);
    return <video controls src={item.original} height={498} />;
  }

  const gallery = [];
  let index = 0;
  items.forEach((item, i) => {
    gallery.push({
      original: MediaUtil.getContentUrl(item.type, item.id),
      thumbnail: MediaUtil.getThumbnailUrl(item.type, item.id),
      description: item.name,
      thumbnailHeight: 80,
      renderItem: item.type === "V" ? renderVideo : null
      //thumbnailLabel: item.name,
      //originalHeight: 360
    });
    if (item.id === media.id) {
      index = i;
    }
  })
  return (
    <ImageGallery
      items={gallery}
      lazyLoad={true}
      thumbnailPosition="bottom"
      showBullets={false}
      showPlayButton={false}
      startIndex={index}
      showIndex={true}
      slideOnThumbnailOver={true}
      onThumbnailClick={handleNavigation}
      showFullscreenButton={media.type==="I"}
      renderLeftNav={(onClick, disabled) => {
        return (
          <button
            type="button"
            className="image-gallery-icon image-gallery-left-nav"
            aria-label="Previous Slide"
            disabled={disabled}
            onClick={(e) => handleNavigation(e, index === 0 ? 0 : index-1, onClick) }
          >
            <LeftArrowIcon fontSize="large" />
          </button>
        )
      }}
      renderRightNav={(onClick, disabled) => {
        return (
          <button
            type="button"
            className="image-gallery-icon image-gallery-right-nav"
            aria-label="Next Slide"
            disabled={disabled}
            onClick={(e) => handleNavigation(e, index === gallery.length-1 ? gallery.length-1 : index+1, onClick) }
          >
            <RightArrowIcon fontSize="large" />
          </button>
        )
      }}
      // renderFullscreenButton={(onClick, isFullscreen) => {
      //   return (
      //     <button
      //       type='button'
      //       className={"image-gallery-icon image-gallery-fullscreen-button"}
      //       onClick={onClick}
      //     >
      //     { isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon /> }
      //     </button>
      //   );
      // }}
    />
  );
}

export default Gallery;