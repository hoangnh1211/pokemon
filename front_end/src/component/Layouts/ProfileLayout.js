import React, { useEffect } from 'react'
import Axios from 'axios'
import { listinf} from '../ShowPokemon/inforbasic'
import { callApidata } from '../../api/callAPI'
import ShowPokemon from '../ShowPokemon/ShowPokemon'
function Profile(props){
    useEffect(()=>{
        Axios.get('/profile').then(res=>{
            listinf.changelist([])
            res.data.forEach(async (value) => {

                callApidata(value.name,'pokemon').then(res=>{
                    let img=res.data.sprites.front_default || ''
                if (res.data.name===res.data.species.name) listinf.addTodo({id:res.data.id,img:img,name:res.data.name})
                })
            });
        })
    },[props.match.params.id])
    return(
        <ShowPokemon hash={props.location.hash} name='profile'/>
    )
}
export default Profile