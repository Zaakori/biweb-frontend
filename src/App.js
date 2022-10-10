import axios from 'axios';
import React,{Component} from 'react';
import TableData from './TableData.js';

class App extends Component {

	state = {

	// Initially, nothing is there
	selectedFile: null,
  postResponse: null,
  textId: '',
  getResponse: null
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
        console.log('AM I EVEN HERE?');

        
        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:8080/api/upload", formData).then((repos) => {
          console.log('GOT RESPONSE', repos.data);
        this.setState({postResponse : repos.data});
        });


        };

  getTextId = ()=> {
          return this.state.textId;
      } 
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {

        if ((this.state.selectedFile) && (this.state.postResponse === null)) {

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

        } else if((this.state.selectedFile) && (this.state.postResponse) && (this.state.getResponse === null)){
          console.log('reached this part 1')

          return (
            <div>
              <h3>
                Your ID for the uploaded text is:
              </h3>
              <h2>
                {this.state.postResponse}
              </h2>
            </div>
          );

        } else {
            return (
            <div>
            </div>
            );
        }
    };   

  sendTableGetRequest =() => {

    console.log('this is the text from input: ' + this.state.textId);

    axios.get(`http://localhost:8080/api/extract?message=${this.state.textId}`).then((response) => {
      this.setState({getResponse : response.data});
    }

    )

  }

    sendCloudGetRequest() {

  }

  updateInputValue(evt) {
    const val = evt.target.value;
    console.log(val);
    // ...       
    this.setState({
      textId: val
    });
  }

  showTable() {

    if(this.state.getResponse === null){
      return (
        <div>
        </div>
        );
    } else if(this.state.getResponse){
      return (
        <div>
          <TableData id = {this.state.textId} />
        </div>
      );
    }
  }


	
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
              <div>
                  {this.fileData()}  
                <h2>
                  Type the ID for your uploaded text here to get the result (might take a bit of time):
                </h2>
                <input type= "text" value={this.state.textId} onChange={evt => this.updateInputValue(evt)} />
                <h2></h2>
                <button onClick={this.sendTableGetRequest} > 
                Get result as a table!
                </button>
                <h2>
                </h2>
                <button onClick={this.sendCloudGetRequest} >
                  Get result as a word cloud!
                </button>
              </div>
              <div>
                {this.showTable()}
              </div>
              <div>
              </div>


        
            </div>
            
          );
   }
}

export default App;

