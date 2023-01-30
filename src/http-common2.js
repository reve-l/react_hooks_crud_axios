import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/pdf",
    //'Authorization' : 'Basic [AuthKey]',
    //'Access-Control-Allow-Origin':'*',
    //'Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT',
    "responseType" : 'blob'
    //'document'
    //'json'
    // 'blob'
//'arraybuffer'
  }
});
