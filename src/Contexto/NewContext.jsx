import React, { createContext, useState, useEffect, useLayoutEffect } from 'react'
import {v4 as uuid} from 'uuid'
import { googleProvider, cusAuth, cusDb } from '../Api/Firebaso';
import { signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

export const AppContext = createContext(null);


export const NewContext = ({children}) => {
    const [todoList, setTodoList] = useState([]);

    const [myCredentials, setMyCredentials] = useState({userId:'', displayName:'', loggedIn:false, photo:''});

    const [newTodo, setNewTodo] = useState({userid: myCredentials?.userId , id: uuid(), title:'', 
    priority:'Low Priority', status:'Pending', date:new Date()});

    //for authentication
    const SigninwithGoo = async() =>{
      try{
        await signInWithPopup(cusAuth, googleProvider)
      }catch(err){
        console.error(err)
      }
    };

    const SignoutWithGoo = async() =>{
      try{
        await signOut(cusAuth)
      }catch(err){
        console.error(err)
      }
    };

    useLayoutEffect(()=>{
      onAuthStateChanged(cusAuth, (user) => {
        if (user) {
          setMyCredentials({userId:cusAuth?.currentUser?.uid, displayName:user?.displayName, loggedIn:true, photo:user.photoURL});
          //console.log('uid is :',cusAuth?.currentUser?.uid)   user.uid;
          
        } else {
          // User is signed out
          // ...
          setMyCredentials({userId:'', displayName:'', loggedIn:false, photo:''});
        }
      });
    },[]);

    //crud functions

    //get data from firestore
    const todoCollectionRef = collection(cusDb, "custom_todolist")

    const getTodo =async()=>{
      try {
        const data = await getDocs(todoCollectionRef);
        const FData = data?.docs?.map((doc)=> ({...doc.data(), todo_id:doc.id})).filter((singleData) => (singleData?.userid === myCredentials?.userId))
        //const FilteredData = FData?.filter((singleData) => (singleData?.userid === myCredentials?.userId))
        const sortedData = FData?.slice()?.sort((a, b) => {
          if (a.priority < b.priority) return -1;
          if (a.priority > b.priority || a.status < b.status ) return 1;
          return 0;
        });
        setTodoList(sortedData)
        //console.log(FilteredData)
      } catch (error) {
        console.error(error)
      }
      
    }

    useLayoutEffect(()=>{
      if(myCredentials.loggedIn == true){
        getTodo();
      }
    },[myCredentials])

    //add new todo item

    const AddTodolist = async()=>{
      try {
        await addDoc(todoCollectionRef, {userid: newTodo.userid , id: newTodo.id, title:newTodo.title, 
          priority:newTodo.priority, status:newTodo.status, date:newTodo.date});

        getTodo();
      } 
      catch (error) {
        console.error(error)
      }
      

    }

    //delete doc
    const DeleteDoc = async(current_id)=>{
      const todoref = doc(cusDb, "custom_todolist", current_id)
      try {
        await deleteDoc(todoref);
        getTodo();
      } catch (error) {
        console.log(error);
      }
    }

    // update doc

    const UpdateDoc = async(current_id)=>{
      const todoref = doc(cusDb, "custom_todolist", current_id)
      try {
        await updateDoc(todoref,{title:newTodo.title, status:newTodo.status, priority:newTodo.priority});
        getTodo();
      } catch (error) {
        console.log(error);
      }

    }

   const todocontrols = {todoList, newTodo, setNewTodo, setTodoList, SigninwithGoo, SignoutWithGoo, 
    myCredentials,AddTodolist, DeleteDoc, UpdateDoc}
  return (
    <AppContext.Provider value={todocontrols}>{children}</AppContext.Provider>
  )
}

