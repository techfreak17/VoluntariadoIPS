import axios from 'axios';
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

    };

    // On file upload (click the upload button) 
    onFileUpload = (event) => {
        event.preventDefault();

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        if (this.props.isChild) {
            //Sets up to send formData to parent component
            this.props.handleUpload(formData);
        } else {
            //Else, Builds rest of info for Post
            formData.append(
                "type",
                this.props.type
            )
            formData.append(
                "id",
                this.props.id
            )

            // Request made to the backend api 
            // Send formData object 
            axios.post("api/upload", formData);
        }
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