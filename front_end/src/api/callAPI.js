import axios from "axios"
export async function callApidata(value,type) {
    const data =await axios.get(`https://pokeapi.co/api/v2/${type}/${value}`)
    return data
  }