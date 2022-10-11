import React, { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';

  export default function SimpleWordcloud(props) {

  console.log('from WORDCLOUD' + props.id);

  const [data, getData] = useState([])

  const URL = 'http://localhost:8080/api/extractWordCloud?message=' + props.id;

  useEffect(() => {
      fetchData()
  }, [])


  const fetchData = () => {
      fetch(URL)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getData(response);
          })

  }

  const size = [800, 400];

  const options = {
    fontSizes: [15,70]
  };


  return (<ReactWordcloud words={data} size={size} options={options}/>)

  }
   
