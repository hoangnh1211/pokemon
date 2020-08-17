import React, { useEffect } from 'react'
import { listinf} from '../ShowPokemon/inforbasic'
import { callApidata } from '../../api/callAPI'
import ShowPokemon from '../ShowPokemon/ShowPokemon'
function Habitat(props){
    // function cut(string){
    //     string=string.slice(0,string.length-1)
    //     let index=string.lastIndexOf('/')
    //     return string.slice(index+1,string.length)
    // }
    useEffect(()=>{
        callApidata(props.match.params.id,'pokemon-habitat').then(res=>{
            listinf.changelist([])
            res.data.pokemon_species.forEach(async (value) => {
                callApidata(value.name,'pokemon').then(res=>{
                    let img=res.data.sprites.front_default || ''
                    if (res.data.name===res.data.species.name) listinf.addTodo({id:res.data.id,img:img,name:res.data.name})
                })
            });
        })
    },[props.match.params.id])
    return(
        <ShowPokemon hash={props.location.hash} name='Habitat'/>
    )
}
export default Habitat