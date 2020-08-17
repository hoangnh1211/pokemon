import React from 'react'
import { Col } from 'antd'
import { Link } from 'react-router-dom'
function Type(props){
    let arrType=['bug','dragon','fairy','fire','ghost','ground','normal','psychic','steel','dark','electric','fighting','flying','grass','ice','poison','rock','water']
    let arrColor=['#729f3f','linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)','#fdb9e9','#fd7d24','#7b62a3','linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)','#a4acaf','#f366b9','#9eb7b8','#707070','#eed535','#d56723','linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)','#9bcc50','#51c4e7','#b97fc9','#a38c21','#4592c4']
    let index=arrType.findIndex(value=>value===props.values)
    let divStyle = {
        background:arrColor[index]
      };
    return(
        <Col span={11} className="abilities" style={divStyle}>
            <Link to={'/type/'+props.values}>{props.values}</Link>
        </Col>
    )
}
export default Type