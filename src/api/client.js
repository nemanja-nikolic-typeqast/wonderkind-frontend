import axios from 'axios'

const httpClient = axios.create({
  headers: {
    "Content-Type": "application/json" ,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  }
})

export {
  httpClient
}
