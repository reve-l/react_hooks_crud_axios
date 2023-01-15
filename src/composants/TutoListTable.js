import React, { useState, useEffect } from "react";
import TutorialService from "../Services/TutoServices";
//import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
//import Moment from 'moment';
//import dayjs from "dayjs";
import { CiSearch } from 'react-icons/ci';
//import {BsFillTrashFill } from 'react-icons/bs';
import TableTuto from "./TableTuto";


const TutoListTable = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [trouve, setTrouve] = useState(false);

  let navigate = useNavigate();
  //const history = useHistory();

  useEffect(() => {
    retrieveTutorials();
  }, []);



/*FONCTION DE CHARGEMENT DE TOUS LES TUTORIELS*/
  const retrieveTutorials = () => {
    TutorialService.getAll()
      .then(response => {
        setTutorials(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };





/*RAFRAICHIER TOUTE LA LISTE*/
const refreshList = () => {
  retrieveTutorials();
  setCurrentTutorial(null);
  setCurrentIndex(-1);
};


/* OBTENIR LA LIGNE COURANTE ET SON INDEX AU CLIC */
const setActiveTutorial = (tutorial, index) => {
  setCurrentTutorial(tutorial);
  setCurrentIndex(index);
};


/*FONCTION DE RECHERCHE */
const search = (data)=>{

    return data
    .sort((a,b) => (new Date(a.createdAt).toLocaleDateString())<(new Date(b.createdAt).toLocaleDateString()) ? 1:-1)
    .filter(tuto=>
      tuto.title.toLowerCase().includes(searchQuery.toLowerCase())||
      tuto.description.toLowerCase().includes(searchQuery.toLowerCase())||
      new Date(tuto.createdAt).toLocaleDateString().includes(searchQuery)
      )
    
    /*data.filter(tuto=>
        tuto.title.toLowerCase().includes(searchQuery.toLowerCase())||
        tuto.description.toLowerCase().includes(searchQuery.toLowerCase())||
        new Date(tuto.createdAt).toLocaleDateString().includes(searchQuery)
      ).length> 0 ?*/
      

      //: '<h4 className="r-warning-1"><CiWarning className="r-warning"/> INTROUVABLE !</h4>'


}
  
  


  return (

    <div>
        <div className="list row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="mb-3  search-txt2">
                <input
                  type="text"
                  className=""
                  placeholder="Recherchez par le titre, description, date création..."
                  value={searchQuery}
                  onChange={ (e) => setSearchQuery(e.target.value) }
                />
                <CiSearch className="r-icon"/>
              </div>
            </div>
            
            <div className="col-md-2"></div>
        </div>

        <TableTuto data={search(tutorials)} />
  </div>
  );
};

export default TutoListTable;
