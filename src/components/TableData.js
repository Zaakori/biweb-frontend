import React, { useState, useEffect } from 'react';
import './componentStyling/tabledata.css';
 
export default function TableData(props) {

    console.log(props.id);

    const [data, getData] = useState([])

    const URL = 'http://localhost:8080/api/extractTable?message=' + props.id;
 
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
        <table>
            <tbody>
                <tr>
                    <th>WORD</th>
                    <th>COUNT</th>
                </tr>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td>{item.text}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
            </table>
 
        </>
    );
}