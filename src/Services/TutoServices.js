import HTTP from "../http-common";
import axios from "axios";


class TutorialService{
getAll(){
  return HTTP.get("/Tutorials");
  //return axios.get("http://localhost:8080/api/Tutorials")  
    //"http://localhost:8080/api/Tutorials"    
};

get(id){
  return HTTP.get(`/Tutorials/${id}`);
};

create(data){
  return HTTP.post("/Tutorials", data);
};

update(id, data){
  return HTTP.put(`/Tutorials/${id}`, data);
};

remove(id){
  return HTTP.delete(`/Tutorials/${id}`);
};

removeAll(){
  return HTTP.delete(`/Tutorials`);
};

findByTitle(title){
  return HTTP.get(`/Searcht?title=${title}`);
};

}

export default new TutorialService();
