import React from 'react';

class FileUpload extends React.Component {
  state = {
    imageURL: ''
  };

  handleUploadImage = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: data
    }).then(response => {
      response.json().then(body => {
        this.setState({ imageURL: `http://localhost:5000/${body.file}` });
      });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <input
          ref={ref => {
            this.uploadInput = ref;
          }}
          type='file'
        />

        <input
          ref={ref => {
            this.fileName = ref;
          }}
          type='text'
          placeholder='Enter the name and extension of the file'
        />

        <button>Upload</button>
        <div>
          {this.state.imageURL && (
            <img src={this.state.imageURL} alt='upload preview' />
          )}
        </div>
      </form>
    );
  }
}

export default FileUpload;
