import React,{useState} from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export default function WorkoutForm() {
  const {dispatch} = useWorkoutContext()
  const [title, settitle] = useState("");
  const [load, setload] = useState("");
  const [reps, setreps] = useState("");
  const [error, seterror] = useState(null);
  const [emptyFields,setEmptyFields] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/workouts/api/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();


    if(!response.ok){
        seterror(json.error);
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        settitle('')
        setreps('')
        setload('')
        seterror(null)
        setEmptyFields([]);
        console.log('new workout added', json);
        dispatch({type:"CREATE_WORKOUT",payload: json})
    }
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout </h3>

        <label>Exercise Title</label>
        <input
          onChange={(e) => settitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title")? 'error' : ''}
          type="text"
        />

        <label>Loads (in Kg):</label>
        <input
          onChange={(e) => setload(e.target.value)}
          value={load}
          className={emptyFields.includes("load")? 'error' : ''}
          type="number"
        />

        <label>Reps:</label>
        <input
          onChange={(e) => setreps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps")? 'error' : ''}
          type="number"
        />

        <button> Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}


