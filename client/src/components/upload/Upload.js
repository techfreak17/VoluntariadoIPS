import React, { Component } from 'react';
import "../../componentsCSS/Upload.css"

class Upload extends Component {

    state = {
        // Initially, no file is selected 
        selectedFile: null
    };

    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
        this.onFileUpload(event.target.files[0]);

    };

    // On file upload (click the upload button) 
    onFileUpload = (file) => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "myFile",
            file,
            file.name
        );


        //Sets up to send formData to parent component
        this.props.handleUpload(formData);
    };

    // File content to be displayed after 
    // file upload is complete 
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h5><b>Detalhes do Ficheiro</b></h5>
                    <p><b>Nome do Ficheiro:</b> {this.state.selectedFile.name}</p>
                    <p><b>Tipo do Ficheiro:</b> {this.state.selectedFile.type}</p>
                    <p><b>Data de modificação:</b>{" "}{this.state.selectedFile.lastModifiedDate.toDateString()}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <b><p>Ficheiro deverá ter no máximo 16 MB</p></b>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <div className="fileUpload">
                    <input type="file" onChange={this.onFileChange} className="upload hoverable" />
                    <span>Upload</span>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default Upload;