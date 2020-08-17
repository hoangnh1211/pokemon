import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { listinf} from './inforbasic'
import { show } from './show'
import { Row , Col } from 'antd'
import SplitPage from '../SplitPage'
function ShowPokemon(props){
    let hash=props.hash;
    let length=Math.ceil(listinf.list.length/8)
    if (hash === "") hash=1; else  hash=hash.slice(1)
    const [select,setS]=useState('ten-az')
    function changeS(e){
        setS(e.target.value)
        listinf.setlist(e.target.value)
    }
    return(
        <div>
            <Row>
                <Col span={12}>
                    <h3><b>{props.name}</b></h3>
                </Col>
                <Col span={12} className="right ">
                    <select id="lang"  onChange={changeS} value={select} >
                        <option value="ten-az" >Tên : A ---> Z</option>
                        <option value="ten-za">Tên : Z ---> A</option>
                        <option value="idtang">ID : Tăng Dần</option>
                        <option value="idgiam">ID : Giảm Dần</option>
                    </select>
                </Col>
            </Row>
            <Row>
                {show(listinf.shop,hash)}
            </Row>
            <SplitPage length={length} hash={hash}/>
        </div>
    )
}
export default observer(ShowPokemon)