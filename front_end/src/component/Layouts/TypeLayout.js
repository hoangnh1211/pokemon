import React, { useEffect } from 'react'
import Axios from 'axios'
import { listinf} from '../ShowPokemon/inforbasic'
import { callApidata } from '../../api/callAPI'
import ShowPokemon from '../ShowPokemon/ShowPokemon'
function Type(props){
    useEffect(()=>{
        callApidata(props.match.params.id,'type').then(res=>{
            listinf.changelist([])
            res.data.pokemon.forEach(async (value) => {
                Axios.get(value.pokemon.url).then(res=>{
                    let img=res.data.sprites.front_default || ''
                    if (res.data.name===res.data.species.name) listinf.addTodo({id:res.data.id,img:img,name:res.data.name})
                })
            });
        })
    },[props.match.params.id])
    return(
        <ShowPokemon hash={props.location.hash} name='Type'/>
    )
}
export default Type