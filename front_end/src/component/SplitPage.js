import React from 'react'
import './splitpage.css'
function SplitPage(props){
    // console.log(props)
    function Showpage(length,abc1){
        // console.log(length)
        var result=null;
        var a=[];
        for (var i=1;i<=length;i++){
            a[i]=i;
        }
        if (a.length>0){
            result=a.map((menu,index)=>{
                var a="#"+index;
                abc1=parseInt(abc1)
                // console.log(abc1,index)
                if (index===abc1){
                    return(
                        <a href={a} key={a} ><li className="pagelink hvr-grow-shadow pagelink_click" > {index}</li></a>
                        )
                } else 
                return(
                    <a href={a} key={a}><li className="pagelink hvr-grow-shadow" > {index}</li></a>
                    )
            })   
        }
        return result;
    }
    return(
        <div className="page">
            <ul className="col">
                {Showpage(props.length,props.hash)}
            </ul>
        </div>
    )
}
export default SplitPage