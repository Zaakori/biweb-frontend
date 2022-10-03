import axios from 'axios';

import React,{Component} from 'react';

class App extends Component {

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
	onFileUpload = () => {
	
        // Create an object of formData
        const formData = new FormData();
        
        // Update the formData object
        formData.append('file', this.state.selectedFile);
        
        // Details of the uploaded file
        console.log(this.state.selectedFile);

        
        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:8080/api/upload", formData);

        // my little thingy for checking frontend-bakend connection
        // let name = String(this.state.selectedFile.name);
        // axios.get("http://localhost:8080/api/publish?message=hello from React, here is file name: " + name);
        };
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {

        if (this.state.selectedFile) {

              let fileType = String(this.state.selectedFile.type);
              let fileSize = Number(this.state.selectedFile.size);
              let fileSizeInMB = ((fileSize /1024)/1024).toFixed(3);


            if(fileType !== "text/plain"){

                    return (
                      <div>
                        <h2>Please upload a file of type ".txt"!</h2>
                      </div>
                    )

              } else if(fileSizeInMB > 100){

                    return (
                      <div>
                        <h2>Your file size is {fileSizeInMB} MB and that exceeded the sizelimit of 100MB! 
                          Please upload a file up to 100MB in size.
                        </h2>
                      </div>
                    )

              }else {

                    return (
                    <div>
                      <h2>File Details: </h2>
                      
                    <p>File Name: {this.state.selectedFile.name}</p>
                      
                    <p>
                      Last Modified:{" "}
                      {this.state.selectedFile.lastModifiedDate.toDateString()}
                      </p>

                    </div>
                    );
              }

          } else {
            return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
            );
          }
          };
	
	render() {
	
          return (
            <div>
              <h1>
              Text Processing App
              </h1>
              <p>Upload a .txt file up to 100 MB in size and see how often each word comes up</p>
              <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                Upload!
                </button>
              </div>
            {this.fileData()}
            </div>
          );
   }
}

export default App;

