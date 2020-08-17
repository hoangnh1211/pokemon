import React , { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
function Login(){
    
    function changeUsename(e){
        setusename(e.target.value)
    }
    function changePassword(e){
        setpassword(e.target.value)
    }
    function handleRequert(){
        axios.post('/login1',{username:username,password:password})
         .then(res=>{
          console.log(res.data);
          setT(res.data)
        })
         .catch(err => console.log(err))
       }
    useEffect(()=>{
    axios.get('/test').then(res=>{
        console.log(res.data)
        if (res.data!=='chua dang nhap'){
            setT(res.data)
        } else {
            axios.get('/testgg').then(res=>{
                console.log(res.data)
                if (res.data!==undefined){
                    console.log(res.data)
                } else {
                    setT('chua dang nhap')
                }
            })
        }
    })
        
    })
    let [username,setusename]=useState('')
    let [password,setpassword]=useState('')
    let [status,setT]=useState('chua dang nhap')
    if (status!=='chua dang nhap'){
        return(
            <Redirect to='/'/>
        )
    } else {

    return(
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <form>
                    name : 
                    <input type='text' value={username} onChange={changeUsename}></input>
                    password :
                    <input type="password" value={password} onChange={changePassword}></input>
                    <p>
                        <a href='http://localhost:4000/auth/google'>  google</a>
                    </p>
                    <button onClick={handleRequert}>login</button>
                </form>
            </Col>
            <Col></Col>
        </Row>
    )
}
    
}
export default Login