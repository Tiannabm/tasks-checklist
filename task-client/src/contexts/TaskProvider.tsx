import React, { useState, useEffect } from "react"
import axios from "axios"
import TaskContext from "./TaskContext";


export const TaskProvider = (props: any) => {

  const [tasks, setTasks] = useState([])

  const baseUrl = "http://localhost:3000/api/tasks";

  useEffect(() => {
    async function getTasks() {
      await refreshTasks()
    }
    getTasks()
  }, []);

  function refreshTasks() {
    
    return axios.get(baseUrl)
        .then(response => {
            setTasks(response.data)
            })
            .catch (error => {
                console.error('Error refreshing tasks', error);
                throw error;
            });
  }


  function deleteTask(taskId: number) {
    
    return axios.delete(`${baseUrl}/${taskId}`)
        .then(refreshTasks)

        .catch (error => {
            console.error('Error deleting tasks', error);
            throw error;
        });
  }

  function addTask(tasks: any) {
    return axios.post(baseUrl, tasks)
            .then(response => {
                refreshTasks()
                return new Promise((resolve) => resolve(response.data))
            })
    .catch (error => {
        console.error('Error adding tasks', error);
        throw error;
    });
  }


  function updateTask(tasks: any, taskId: number) {
    
    return axios.put(`http://localhost:3000/api/tasks/${taskId}`, tasks)
        .then(response => {
            console.log(taskId);
            refreshTasks()
            return response.data;
            })
            .catch (error => {
                console.error('Error updatng tasks', error);
                throw error;
            });
    
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        refreshTasks,
        deleteTask,
        addTask,
        updateTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}