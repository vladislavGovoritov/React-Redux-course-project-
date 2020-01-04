import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-ec123.firebaseio.com/'
})