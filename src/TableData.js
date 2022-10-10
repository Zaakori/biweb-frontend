import React, { useState, useEffect } from 'react';
import './tabledata.css';
 
export default function TableData(props) {

    const [data, getData] = useState([])

    const URL = 'http://localhost:8080/api/extract?message=' + props.id;
 
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
 
    return (
        <>
        <h2></h2>
            <tbody>
                <tr>
                    <th>WORD</th>
                    <th>COUNT</th>
                </tr>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td>{item.word}</td>
                        <td>{item.count}</td>
                    </tr>
                ))}
            </tbody>
 
        </>
    );
}