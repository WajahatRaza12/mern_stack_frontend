import React,{useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {useWorkoutContext} from '../hooks/useWorkoutContext'

export default function Home() {
  const {workouts,dispatch} = useWorkoutContext() 
  useEffect(()=>{
    const fetchWorkouts = async ()=>{
      const response = await fetch('http://localhost:4000/workouts/api/')
      const json = await response.json()

      if(response.ok){
        dispatch({type: "SET_WORKOUTS",payload: json})
      }
    }
    fetchWorkouts();
  },[dispatch])
  return (
    <div className='home'>
      <div className="workouts">
        {
          workouts && workouts.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>
          ))
        }
      </div>
      <WorkoutForm/>
    </div>
  )
}
