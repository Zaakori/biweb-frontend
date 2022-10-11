import axios from 'axios';
import React,{Component} from 'react';
import TableData from './components/TableData.js';
import SimpleWordcloud from './components/ReactWordCloud';
import FileData from './components/FileData.js';

class App extends Component {

	state = {

	// Initially, nothing is there
	selectedFile: null,
  postResponse: null,
  textId: '',
  textForTable: '',
  textForWordCloud: ''
	};
	
	// On file select (from the pop up)
	onFileChange = event => {

    const val = '';
	
      // Update the state and null everything else in case some file has been previously active on the page
      this.setState({
         selectedFile: event.target.files[0],
         postResponse: null,
         textId: val,
         textForTable: val,
         textForWordCloud: val
        });
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

  updateInputValue(evt) {
    const val = evt.target.value;
    console.log(val);
    // ...       
    this.setState({
      textId: val
    });
  }

  showTable() {

    let text = String(this.state.textForTable);

    if(text === 'true'){
        return (
          <div>
            <TableData id = {this.state.textId} />
          </div>
        );
    } else {
        return (
          <div>
          </div>
          );
    }
  }

  showWordCloud() {

    let text = String(this.state.textForWordCloud);

    if(text === 'true'){
        return (
          <div>
            <SimpleWordcloud id = {this.state.textId} />
          </div>
        );
    } else {
        return (
          <div>
          </div>
          );
    }
  }



  toggleTableState(evt) {
    const trueVal = 'true';
    const emptyVal = '';

    this.setState({
      textForTable: trueVal,
      textForWordCloud: emptyVal,
    });
  }

  toggleWordCloudState(evt) {

    const trueVal = 'true';
    const emptyVal = '';

    this.setState({
      textForWordCloud: trueVal,
      textForTable: emptyVal
    });

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
                <FileData theFile = {this.state.selectedFile} response = {this.state.postResponse}/>
                <h2>
                  Type the ID for your uploaded text here to get the result (result might take a bit of time):
                </h2>
                <input type= "text" onChange={evt => this.updateInputValue(evt)} />
                <h2></h2>
                <button onClick={evt => this.toggleTableState(evt)} > 
                Get result as a table!
                </button>
                <h2>
                </h2>
                <button onClick={evt => this.toggleWordCloudState(evt)} >
                  Get result as a word cloud!
                </button>
              </div>
              <div>
                {this.showTable()}
              </div>
              <div>
                {this.showWordCloud()}
              </div>        
            </div>
            
          );
   }
}

export default App;

