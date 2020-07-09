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
                        <br></br>
                        <button type="button" style={{ backgroundColor: "black", color: "white" }} onClick={this.onFileUpload}>
                            <b>Guardar</b>
                        </button>
                    </div>
                    {this.fileData()}
                </div>
            </div>
        );
    }
}

export default Upload;