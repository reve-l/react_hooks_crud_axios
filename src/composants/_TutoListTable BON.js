import React, { useState, useEffect } from "react";
import TutorialService from "../Services/TutoServices";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
//import Moment from 'moment';
//import dayjs from "dayjs";
import { CiWarning,CiSearch,CiPickerHalf,CiViewList } from 'react-icons/ci';
import {BsFillTrashFill } from 'react-icons/bs';


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



/*FONCTION DE SUPPRESION DE TOUS LES TUTORIELS*/
  const removeAllTutorials = () => {

   Swal.fire({
      title: 'Attention vider tous les Tutoriels',
      icon:'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Supprimer tout',
      denyButtonText: `Annuler`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        TutorialService.removeAll()
        .then(response => {
          //console.log(response.data);
          Swal.fire('Tous ont été supprimés!', '', 'success')
          refreshList();
        })
        .catch(e => {
          console.log(e);
        });

      } else if (result.isDenied) {
        navigate("/tutorialslist");
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })

  };


/*FONCTION DE SUPPRESION D'UN TUTORIEL*/
const deleteTutorial = (id,t) => {

  Swal.fire({
    title: 'Supprimer '+t.title,
    icon:'question',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Supprimer',
    denyButtonText: `Annuler`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      TutorialService.remove(id)
        .then(response => {
          //Swal.fire('Supprimé!', '', 'success')
        navigate(0);
        
    })
    .catch(e => {
      console.log(e);
    });
    } else if (result.isDenied) {
      //navigate("/tutorials");
      navigate("/tutorialslist");
      //Swal.fire('Changes are not saved', '', 'info')
    }
  })

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


  
  


  return (

    <div>
        <div className="list row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="mb-3  search-txt2">
                <input
                  type="text"
                  className=""
                  placeholder="Recherchez par le titre, description, date creation..."
                  value={searchQuery}
                  onChange={ (e) => setSearchQuery(e.target.value) }
                />
                <CiSearch className="r-icon"/>
              </div>
            </div>
            
            <div className="col-md-2"></div>
        </div>





  <h3 className="text-center mt-5">Tutorials List</h3>
  <table className="styled-table">
              <tr className="btn-act">
                <td colSpan={3}>
                      <button className="m-3 btn btn-sm btn-danger"onClick={removeAllTutorials}>Remove All</button> 
                </td>
                <td colSpan={3}></td>        
                <td>
                    <Link className="m-3 btn btn-sm btn-secondary" to={"/add"}>Nouveau</Link> 
                </td>
              </tr>


              <tr className="tbl-h">
                <td>N°</td>
                <td>Titre</td>
                <td>Description</td>
                <td>Date création</td>
                <td>Date à jour</td>
                <td>Etat</td>
                <td>Action</td>
              </tr>
        
        
          {
            tutorials &&
                        
            tutorials.filter(tuto=>
              tuto.title.toLowerCase().includes(searchQuery.toLowerCase())||
              tuto.description.toLowerCase().includes(searchQuery.toLowerCase())||
              new Date(tuto.createdAt).toLocaleDateString().includes(searchQuery)
              )
            .map((tutorial, index) => 
            { 
              return (
              <tr
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                <td>{index}</td>
                <td>{tutorial.title}</td>
                <td>{tutorial.description}</td>
                <td>{new Date(tutorial.createdAt).toLocaleDateString()}</td>
                <td>{new Date(tutorial.updatedAt).toLocaleDateString()}</td>
                <td>{tutorial.published?"Publié":"Non"}</td>
                <td>
                  <Link to={"/tuto/" + tutorial.id} className="btn btn-sm" ><CiPickerHalf className="btn-edit"/></Link>
                  <Link to={"/details/" + tutorial.id} className="btn btn-sm" ><CiViewList className="btn-dtls"/></Link>
                  <button onClick={() => deleteTutorial(tutorial.id,tutorial)} className="btn btn-sm" ><BsFillTrashFill className="btn-del"/></button>

                </td>

              </tr>
            )
          })
          
          }
        
      </table>

      {tutorials.filter(tuto=>tuto.title.toLowerCase().includes(searchQuery.toLowerCase())).length ? ""
                          : <h4 className="r-warning-1"><CiWarning className="r-warning"/> INTROUVABLE !</h4>}

  </div>
  );
};

export default TutoListTable;
