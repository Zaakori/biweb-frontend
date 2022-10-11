import axios from 'axios';
import React,{Component} from 'react';
import FileData from './components/FileData.js';
import {ShowTable, ShowWordCloud} from './components/ShowResult';

class App extends Component {

	state = {

	// Initially, nothing is there
	selectedFile: null,
  postResponse: null,
  textId: '',
  textForTable: '',
  textForWordCloud: ''
	};
  
	
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
	
	onFileUpload = () => {
	
        const formData = new FormData();
        
        formData.append('file', this.state.selectedFile);
        
        console.log(this.state.selectedFile);

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
                <ShowTable tableText = {this.state.textForTable} id = {this.state.textId} />
              </div>
              <div>
                <ShowWordCloud wordCloudText = {this.state.textForWordCloud} id = {this.state.textId} />
              </div>        
            </div>
            
          );
   }
}

export default App;

