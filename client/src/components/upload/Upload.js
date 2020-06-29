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

        if(this.props.isChild){
            this.props.handleUpload(formData);
            console.log("sent form to parent");
            console.log(formData);
            console.log("------------------");
        } else {
            formData.append(
                "type",
                "Projeto"//this.props.type
            )
            formData.append(
                "id",
                this.props.id
            )

            // Details of the uploaded file 
            console.log(this.state.selectedFile);

            // Request made to the backend api 
            // Send formData object 
            axios.post("api/upload", formData).then(alert("O seu ficheiro foi guardado!"));
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
                    <p>Por favor, selecione um ficheiro!</p>
                </div>
            );
        }
    };

    render() {

        return (
            <div className="container">
                <div className="card center">
                    <h4>
                        Upload de Ficheiro
                </h4>
                    <div>
                        <input type="file" onChange={this.onFileChange} />
                        <button type="button" onClick={this.onFileUpload}>
                            Guardar!
                        </button>
                    </div>
                    {this.fileData()}
                </div>
            </div>
        );
    }
}

export default Upload;