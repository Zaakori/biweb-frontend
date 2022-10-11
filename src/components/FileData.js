import './componentStyling/filedata.css';


export default function	FileData (properties) {

        if ((properties.theFile) && (properties.response === null)) {

              let fileType = String(properties.theFile.type);
              let fileSize = Number(properties.theFile.size);
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
                      
                    <p>File Name: {properties.theFile.name}</p>
                      
                    <p>
                      Last Modified:{" "}
                      {properties.theFile.lastModifiedDate.toDateString()}
                      </p>

                    </div>
                    );
              }

        } else if((properties.theFile) && (properties.response)){

          return (
            <div>
              <h2>
                Your ID for the uploaded text is:
              </h2>
              <h2 className="custom">
                {properties.response}
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