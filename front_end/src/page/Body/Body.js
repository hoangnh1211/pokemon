import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from '../../component/Layouts/HomeLayout'
import Login from '../../component/Login/Login'
import Detail from '../../component/DetailPokemon/DetailPokemon'
import Ability from '../../component/Layouts/AbilityLayout'
import Type from '../../component/Layouts/TypeLayout'
import Habitat from '../../component/Layouts/HabitatLayout'
import { Row, Col  } from 'antd'
import './Body.css'
import Profile from '../../component/Layouts/ProfileLayout'
function Body() {
    function search() {
        setT('')
    }
    function changtextSearch(e) {
        setT(e.target.value)
    }
    const [textSearch, setT] = useState('')
    function showType(stt) {
        let arrType = ['bug', 'dragon', 'fairy', 'fire', 'ghost', 'ground', 'normal', 'psychic', 'steel', 'dark', 'electric', 'fighting', 'flying', 'grass', 'ice', 'poison', 'rock', 'water']
        let result = null;
        result = arrType.map((value, index) => {
            if (index >= 6 * stt && index < 6 * (stt + 1)) {
                return (
                    <p key={index} ><Link to={'/type/' + value}>{value}</Link></p>
                )
            } 
            return null
        })
        return result
    }
    return (
        <Row>
            <Col span={5}></Col>
            <Col span={14}>
                <input type='text' value={textSearch} onChange={changtextSearch}></input><Link to={'/pokemon/' + textSearch}><button onClick={search}>search</button></Link>
                <div className='navbar1'>
                    <div className="subnav">
                        <button className="subnavbtn">
                            <Link to="/" ><b className="size25"><i className="fas fa-home">Home</i></b></Link>
                        </button>

                    </div>
                    <div className="subnav">
                        <button className="subnavbtn">
                            <Link ><b className="size25">Type</b></Link>
                        </button>
                        <div className=" subnav-content ">
                            <Row>
                                <Col span={8}>
                                    {showType(0)}
                                </Col>
                                <Col span={8}>
                                    {showType(1)}
                                </Col>
                                <Col span={8}>
                                    {showType(2)}
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="subnav">
                        <button className="subnavbtn">
                            <Link to="/profile" ><b className="size25"><i className="fas fa-home">profile</i></b></Link>
                        </button>
                    </div>
                </div>
                <Switch>
                    <Route path='/' exact render={props => <Home {...props} />} />
                    <Route path='/profile' exact render={props => <Profile {...props} />} />
                    <Route path='/login' exact><Login /></Route>
                    <Route path='/pokemon/:id' exact render={props => <Detail {...props} />} />
                    <Route path='/ability/:id' exact render={props => <Ability {...props} />} />
                    <Route path='/type/:id' exact render={props => <Type {...props} />} />
                    <Route path='/habitat/:id' exact render={props => <Habitat {...props} />} />
                </Switch>
            </Col>
        </Row>
    )
}
export default Body