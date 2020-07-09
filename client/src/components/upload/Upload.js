import axios from 'axios';
import React, { Component } from 'react';

class Upload extends Component {

    state = {
        // Initially, no file is selected 
        selectedFile: null
    };

    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
        onFileUpload(event);

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


        //Sets up to send formData to parent component
        this.props.handleUpload(formData);
    };

    // File content to be displayed after 
    // file upload is complete 
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h5>Detalhes do Ficheiro:</h5>
                    <p>Nome do Ficheiro: {this.state.selectedFile.name}</p>
                    <p>Tipo do Ficheiro: {this.state.selectedFile.type}</p>
                    <p>
                        Data de modificação:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Ficheiro deverá ter no máximo 16 MB</p>
                </div>
            );
        }
    };

    render() {

        return (
            <div className="container">
                <div className="card center">
                    <h4><b>Upload de Ficheiro</b></h4>
                    <div>
                        <input type="file" onChange={this.onFileChange} />
                    </div>
                    {this.fileData()}
                </div>
            </div>
        );
    }
}

export default Upload;