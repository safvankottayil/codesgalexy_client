import axios from "axios";
import {userUrl} from '../url'
const instance= axios.create({
    baseURL:userUrl
})
export default instance