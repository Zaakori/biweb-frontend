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
            <div style={{
              marginLeft: 330,
              justifyContent: 'center',
              alignItems: 'center'}}>

              <h1>
              Text Processing App
              </h1>
              <h2>Upload a .txt file up to 100 MB in size and see how often each word comes up</h2>
              <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload} className="button">
                UPLOAD
                </button>
              </div>
              <div>
                <FileData theFile = {this.state.selectedFile} response = {this.state.postResponse}/>
                <h2>
                  Type the ID for your uploaded text here to get the result (result might take a bit of time):
                </h2>
                <input type= "text" onChange={evt => this.updateInputValue(evt)} />
                <h2></h2>
                <button onClick={evt => this.toggleTableState(evt)} className="button"> 
                GET RESULT AS A TABLE
                </button>
                <h2>
                </h2>
                <button onClick={evt => this.toggleWordCloudState(evt)} className="button">
                  GET RESULT AS A WORD CLOUD
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

