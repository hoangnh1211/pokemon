import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
function Header(){
    useEffect(()=>{
        Axios.get('/test').then(res=>{
            if (res.data!=='chua dang nhap'){
                setN(`xin chao ${res.data}`)
            } else {
                setN('')
            }
        })
        
    })
    function logout(){
        Axios.get('/logout').then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    const [name,setN]=useState('')
    return(
        <div>
            <p>{name}</p>
            <Link to='/login'>
                <button>login</button>
            </Link>
            <button onClick={logout}>logout</button>
        </div>
    )
}
export  default Header