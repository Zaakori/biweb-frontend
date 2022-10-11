import TableData from './TableData.js';
import SimpleWordcloud from './ReactWordCloud';


 export function ShowTable(properties) {

    let text = String(properties.tableText);

    if(text === 'true'){
        return (
          <div>
            <TableData id = {properties.id} />
          </div>
        );
    } else {
        return (
          <div>
          </div>
          );
    }
}

 export function ShowWordCloud(properties) {

    let text = String(properties.wordCloudText);

    if(text === 'true'){
        return (
          <div>
            <SimpleWordcloud id = {properties.id} />
          </div>
        );
    } else {
        return (
          <div>
          </div>
          );
    }
  }