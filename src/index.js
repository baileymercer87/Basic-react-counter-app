import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const URL = 'https://counters-dot-sse-2021-jk.appspot.com'

function Counter({ name, value, addValue, setValue, handleDelete }) {
  const [inputVal, setInputVal] = useState(0);

  return (
    <p id='option'>
      <span>Counter {name}: {parseInt(value)}</span>

      <input type='number' id='counterInput' onChange={e => {setInputVal(e.target.value)}}></input>

      <button onClick={() => addValue(name, inputVal)}>Add</button>

      <button onClick={()=> setValue(name, inputVal)}>Set</button>

      <button onClick={() => handleDelete(name)}>Delete</button>
    </p>
  )
}


function App() {
  const [counters, setCounters] = useState([])
  const [counterName, setCounterName] = useState('')
  const [error, setError] = useState(null)

  async function getValue () {
    
    const response = await fetch(URL + `/api/${encodeURIComponent(counterName)}`);

    if (!response.ok) {
      setError(`There was an error retrieving the value for ${counterName}`)
      return
    }
    const value = parseInt(await response.text(), 10)

    setError(null)
    setCounters((current) => [...current, {
      name: counterName,
      value,
    }])
    console.log(counters);
  }
  

  async function refreshValues (name) {
    const response = await fetch(URL + `/api/${encodeURIComponent(name)}`);

    if (!response.ok) {
      setError(`There was an error retrieving the value for ${name}`)
      return
    }
    const value = parseInt(await response.text(), 10)

    setError(null)
    setCounters(updateCounter(name, value));
  }


  async function addValue (name, value) {
    const response = await fetch(URL + `/api/${encodeURIComponent(name)}`, { method: 'POST', body: value });

    if (!response.ok) {
      setError(`There was an error retrieving the value for ${name}`)
      return
    }
    const currentValue = parseInt(await response.text(), 10)
    setError(null)

    setCounters(updateCounter(name, currentValue));

    setCounterName('')
  }


  async function setValue (name, newVal) {
    const response = await fetch(URL + `/api/${encodeURIComponent(name)}`, { method: 'PUT', body: newVal });

    if (!response.ok) {
      setError(`There was an error retrieving the value for ${name}`)
      return
    }
    setError(null)
    const value = parseInt(await response.text(), 10)
    
    setCounters(updateCounter(name, value));

  }

  const updateCounter = (name, value) => {
    const current = counters.findIndex(counters => counters.name === name);
    const tempCounters = [...counters]
    tempCounters[current] = {name, value};
    return tempCounters;
  }

  async function handleDelete (name) {
    const response = await fetch(URL + `/api/${encodeURIComponent(name)}`, { method: 'DELETE'});
    
    if (!response.ok) {
      setError(`There was an error retrieving the value for ${name}`)
      return
    }
    setError(null);
    setCounters((current) => [...current.filter((c) => c.name !== name)])
  }

  React.useEffect(() => {
    const update = () => {
      for (let i=0; i < counters.length; i++) {
        refreshValues(counters[i].name)
      }

    }
    const interval = setInterval(update, 1000);
    return() => clearInterval(interval);
  },[counters])


  return (
    <div>
      <h1>
      SSE Sign Off 3 - REACT JS Counters App
      </h1>
      <p>Add Counter: 
        <input placeholder='Enter name' value={counterName} onChange={(e) => setCounterName(e.target.value)} id='counterName'/>
        <button id='btn_add' onClick={getValue}>Add</button>
      </p>
      {error && <p>{error}</p>}

    {counters.map((counter => {
      return (
        <Counter 
          name={counter.name} 
          handleDelete={handleDelete}
          addValue={addValue}
          setValue={setValue}
          value={counter.value}
        />
      );
      }))};
      
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('main'),
);

