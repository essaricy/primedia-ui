import React from 'react';

import './Upload.css';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

import UploadCard from './UploadCard';
import * as UploadService from '../service/UploadService';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      progress: false,
      uploadMessage: null,
      fileInfo: {
        name: '',
        type: '',
        size: 0,
        rating: 3,
        quality: 3,
        tags: [ ]
      }
    };
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.makeMediaName = this.makeMediaName.bind(this);
    //this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  makeMediaName(fileName) {
    return fileName ? fileName.split('.').slice(0, -1).join('.').replace(/([A-Z])/g, ' $1').trim(): '';
  }

  selectFile(event) {
    const file = event.target.files[0];
    this.setState({ selectedFile: file, fileInfo: {
      ...this.state.fileInfo,
      name: this.makeMediaName(file.name),
      type: file.type,
      size: file.size,
      //tags: [this.makeMediaName(file.name)]
    }});
  }

  closeAlert = () => {
    this.setState({ uploadMessage: null });
  };

  handleNameChange = (e) => {
    const oldName = this.state.fileInfo.name;
    const newName = e.target.value;
    const tags = this.state.fileInfo.tags.filter(e => e !== oldName);
    if (newName.includes(",")) {
      newName.split(",").forEach(n => tags.push(n.trim()));
    } else {
      tags.push(newName.trim());
    }
    this.setState((prevState) => ({ fileInfo: { ...prevState.fileInfo, name: newName, tags: tags } }));
  }

  handleRatingChange = (value) => {
    this.setState((prevState) => ({ fileInfo: { ...prevState.fileInfo, rating: value } }));
  }

  handleQualityChange = (value) => {
    this.setState((prevState) => ({ fileInfo: { ...prevState.fileInfo, quality: value } }));
  }

  handleTagAdd = (tag) => {
    const tags = this.state.fileInfo.tags;
    tags.push(tag);
    this.setState((prevState) => ({ fileInfo: { ...prevState.fileInfo, tags: tags } }));
  }

  handleTagDelete = (tag, index) => {
    const tags = this.state.fileInfo.tags.filter(e => e !== tag);
    this.setState((prevState) => ({ fileInfo: { ...prevState.fileInfo, tags: tags } }));
  }

  upload() {
    this.setState({ progress: true });
    const { fileInfo, selectedFile } = this.state;
    UploadService.upload(fileInfo, selectedFile)
    .then(() => {
      this.setState({ progress: false, uploadMessage: 'Uploaded Successfully!' });
    })
    .catch(e => {
      console.log("Upload.js error: ", e);
      this.setState({ progress: false, uploadMessage: e.message });
    });
  }

  render() {
    const {
      selectedFile,
      fileInfo,
      progress,
      uploadMessage
    } = this.state;
    
    return (
      <div className="mg20">
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            disabled={progress}
            onChange={this.selectFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             Choose File
          </Button>
        </label>

        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={selectedFile == null || progress}
          onClick={this.upload}>
          Upload
        </Button>

        {progress && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress color="secondary" /> 
            </Box>
          </Box>)
        }

        {fileInfo && selectedFile && (
          <UploadCard
            src={URL.createObjectURL(selectedFile)}
            type={fileInfo.type}
            size={fileInfo.size}
            name={fileInfo.name}
            rating={fileInfo.rating}
            quality={fileInfo.quality}
            tags={fileInfo.tags}
            onNameChange={this.handleNameChange}
            onRatingChange={this.handleRatingChange}
            onQualityChange={this.handleQualityChange}
            onTagAdd={this.handleTagAdd}
            onTagDelete={this.handleTagDelete}
          />
        )}
        {
        uploadMessage &&
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={true}
          onClose={this.closeAlert}
          message={uploadMessage}
          key='bottom_center_snackbar'
        />
        }
      </div >
    );
  }
}