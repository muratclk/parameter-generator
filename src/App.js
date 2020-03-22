import React, { useState, Fragment } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { railscasts } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  const [inputFields, setInputFields] = useState([
    { parameterName: "", parameterType: "" }
  ]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "parameterName") {
      values[index].parameterName = event.target.value;
    } else if (event.target.value === "object") {
      console.log(values);
      values[index].parameterType = { parameterName: "", parameterType: "" };
    } else if (event.target.value === "array") {
      //
      values[index].parameterType = event.target.value;
    } else {
      values[index].parameterType = event.target.value;
    }
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ parameterName: "", parameterType: "" });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  let obj = {};
  const resultObj = val => {
    obj[val.parameterName] = val.parameterType;
    return obj;
  };

  return (
    <>
      <h3 className="ml-3 mt-3 text">JSON Parameter Generator</h3>
      <form>
        <div className="form-row ml-3 mt-4">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  id="parameterName"
                  name="parameterName"
                  placeholder="Parameter Name"
                  value={inputField.parameterName}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>

              <div className="form-group col-sm-2">
                <select
                  className="form-control"
                  id="parameterType"
                  name="parameterType"
                  value={inputField.parameterType}
                  onChange={event => handleInputChange(index, event)}
                >
                  <option value="">Parameter Type</option>
                  <option value="string">string</option>
                  <option value="number">number </option>
                  <option value="boolean">boolean</option>
                  <option value="null">null</option>
                  <option value="object">object</option>
                  <option value="array">array</option>
                </select>
              </div>

              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
      </form>
      <br />
      <div className="snippet ml-3">
        <SyntaxHighlighter language="json" style={railscasts}>
          {JSON.stringify(inputFields.map(resultObj)[0], null, 2)}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default App;
