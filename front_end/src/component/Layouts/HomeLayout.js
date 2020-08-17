import React, { useEffect } from 'react'
// import Axios from 'axios'
import { listinf} from '../ShowPokemon/inforbasic'
import { callApidata } from '../../api/callAPI'
import ShowPokemon from '../ShowPokemon/ShowPokemon'
function Home(props){
    useEffect(()=>{
                listinf.changelist([])
                // res.data.forEach(async (value) => {
                //     await callApidata(value.id,'pokemon').then(res=>{
                //         console.log(value.id)
                //         listinf.addTodo({id:res.data.id,img:res.data.sprites.front_default,name:res.data.name})
                //     })
                // });
                let arr=[1,2,3,4,5,6,7,8]
                for (let i=0;i<8;i++){
                     callApidata(arr[i],'pokemon').then(res=>{
                        let img=res.data.sprites.front_default || ''
                    if (res.data.name===res.data.species.name) listinf.addTodo({id:res.data.id,img:img,name:res.data.name})
                    })
                }
    },[])
    return(
        <ShowPokemon hash={props.location.hash}/>
    )
}
export default Home