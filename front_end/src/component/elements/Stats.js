import React from 'react'
import { Progress, Row, Col } from 'antd'
function Stats(props){
    function showStats(data){
        let result=null
        result=data.map((value,index)=>{
            let d=Number.parseInt(value.base_stat/2.25)
            return(
                <Row key={index}>
                    <Col span={6}> {value.stat.name}</Col>
                    <Col span={18}><Progress percent={d} steps={18} /> <br/></Col>
                </Row>
            )
        })
        return result
    }
    return(
        <div className="skill">
            <h2><b>Stats</b></h2>
            {showStats(props.data)}
        </div>
    )
}
export default Stats