import axios from "axios";
import {adminUrl} from '../url'
const instance= axios.create({
    baseURL:adminUrl
})
export default instance