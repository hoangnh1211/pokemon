import React from 'react'
import { Col } from 'antd'
import { Link } from 'react-router-dom'
export function show(list,hash){
    
    if (list.length>0){
        let result=list.map((value,index)=>{
            if (index>=(hash-1)*8 && index <= hash*8-1)
            {
                return(
                    <Col span={6} key={index}>
                        <Link to={'/pokemon/'+value.name}>
                            <img src={value.img} alt={index}></img>
                            <p>{value.id}</p>
                            <p>{value.name}</p>
                        </Link>
                    </Col>
                )
            }
            return null
            
        })
        return result
    }
}