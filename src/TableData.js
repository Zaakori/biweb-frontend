import React, { useState, useEffect } from 'react';
import './tabledata.css';
 
export default function TableData() {

    const [data, getData] = useState([])

    const URL = 'http://localhost:8080/api/extract?message=355786ce-a16f-4279-901e-a3c7394a093b';
    //const URL = 'https://jsonplaceholder.typicode.com/posts';
 
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
            <h1>How to display JSON data to table in React JS</h1>
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