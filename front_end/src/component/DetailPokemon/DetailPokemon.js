import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './DetailPokemon.css'
import { callApidata } from '../../api/callAPI';
import { Link } from 'react-router-dom'
import { DetailInfor } from './DPstore';
import { observer } from 'mobx-react'
import Type from '../elements/Type';
import Stats from '../elements/Stats';
import Axios from 'axios';
function Detail(props) {
    function habitat(habitat) {
        if (habitat !== null) {
            return (
                <Col span={12}><Link to={'/habitat/' + habitat.name}>habitat : {habitat.name}</Link></Col>
            )
        }
    }
    function eve(string) {
        Axios.get(string).then(res => {
            if (res.data.evolves_from_species !== null) {
                let name = res.data.evolves_from_species.name
                callApidata(name, 'pokemon').then(res => {
                    DetailInfor.addEvolution({ name: res.data.name, img: res.data.sprites.front_default })
                    eve(res.data.species.url)
                })
            }
        })
    }
    function showflavor_text() {
        if (detail !== {}) {
            return (
                <p>{detail.flavor_text_entries[0].flavor_text}</p>
            )
        }
    }
    function show(list) {
        let result = null
        if (list.length > 0) {
            result = list.map((value, index) => {
                return (
                    <Link to={'/pokemon/'+value.name}>
                        <li key={index}>
                            <p>{value.name}</p>
                            <img src={value.img} alt={value.name}></img>
                        </li>
                    </Link>
                )
            })
        }
        return result
    }
    function showvarieties() {
        let result = null
        result = detail.varieties.map(value => {
            return (
                <option value={value.pokemon.name}>{value.pokemon.name}</option>
            )
        })
        return result
    }
    function changevarieties(e) {
        setS(e.target.value)
        callApidata(e.target.value, 'pokemon').then(res => {
            setIF(res.data)
        })
    }
    function add(){
        console.log(detail.name)
        Axios.post('/add',{name:detail.name})
    }
    useEffect(() => {
        callApidata(props.match.params.id, 'pokemon').then(res => {
            setIF(res.data)
            callApidata(res.data.id + 1, 'pokemon').then(res => {
                setN(res.data.name)
            })
            callApidata(res.data.id - 1, 'pokemon').then(res => {
                setP(res.data.name)
            })
            DetailInfor.changelist([], [])
            let type = res.data.types

            res.data.types.forEach(element => {
                callApidata(element.type.name, 'type').then(res => {
                    res.data.damage_relations.double_damage_from.forEach((value, index) => {
                        if (type.findIndex(data => data.type.name === value.name) === -1) {
                            DetailInfor.addWeaknesses(value.name)
                        }
                    })
                })
            });
            DetailInfor.addEvolution({ name: res.data.name, img: res.data.sprites.front_default })
            eve(res.data.species.url)
            Axios.get(res.data.species.url).then(res => {
                setD(res.data)
                setS(res.data.name)
            })
        })
    }, [props])
    const [inforPokemon, setIF] = useState({})
    const [detail, setD] = useState({})
    const [next, setN] = useState('')
    const [prev, setP] = useState('')
    const [select, setS] = useState('')
    if (inforPokemon.sprites !== undefined && detail.flavor_text_entries !== undefined) {
        return (
            <div className="detail">
                <Link to={'/pokemon/' + prev}><button>prev</button></Link>
                <Link to={'/pokemon/' + next}><button>next</button></Link>
                <button>compare</button>
                <button onClick={add}>add</button>
                <div className='nameP'>
                    <p ><b>{detail.name} #{detail.id}</b></p>
                    <select id="lang" value={select} onChange={changevarieties} >
                        {showvarieties()}
                    </select>
                </div>
                <Row gutter={[16, 16]}>
                    <Col span={12} >
                        <img className="gray" src={inforPokemon.sprites.front_default} alt="abc"></img>
                        <Stats data={inforPokemon.stats} />
                    </Col>
                    <Col span={12}>
                        {showflavor_text()}
                        <Row className="inforbasic" >
                            <Col span={12}>height : {inforPokemon.height}</Col>
                            <Col span={12}>width : {inforPokemon.weight}</Col>
                            <Col span={12}>experience : {inforPokemon.base_experience}</Col>
                            {habitat(detail.habitat)}
                        </Row>
                        <p>abilities :</p>
                        <Row >
                            {inforPokemon.abilities.map((values, index) =>
                                <Col key={index} span={11} className="abilities">
                                    <Link to={'/ability/' + values.ability.name}>{values.ability.name}</Link>
                                </Col>
                            )}
                        </Row>
                        <p>types :  </p>
                        <Row>
                            {inforPokemon.types.map((values, index) =>
                                <Type key={index} values={values.type.name} />
                            )}
                        </Row>
                        <p>Weaknesses :</p>
                        <Row>
                            {DetailInfor.Weaknesses.map((values, index) =>
                                <Type key={index} values={values} />
                            )}
                        </Row>
                    </Col>
                </Row>
                <p><b>Evolutions</b></p>
                <ul>
                    {show(DetailInfor.Evolution)}
                </ul>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}
export default observer(Detail)