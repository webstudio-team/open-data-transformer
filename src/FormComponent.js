import {useState} from "react";

export default function FormComponent ({index, headerData, handleState}) {
    const [inputData, setInputData] = useState({
        index: index,
        name: headerData,
        datatype: "",
        description: "",
    })

    const handleInput = (event) => {
        setInputData({
            ...inputData,

            [event.target.name]: event.target.value
        });
        handleState(inputData)
    }

    return (
        <div >
            <input name="name" type="text" defaultValue={headerData}
                   onChange={handleInput}/>
            <select name="datatype" id="datatype" onChange={handleInput}>
                <option value="none">none</option>
                <option value="integer">integer</option>
                <option value="string">string</option>
            </select>
            <input name="description" type="text" onChange={handleInput}/>
        </div>
    )
}