import axios from 'axios'

export default axios.create({
    URL: "http://localhost:8080/api/"
})