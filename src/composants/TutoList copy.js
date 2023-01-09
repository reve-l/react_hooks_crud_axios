import React, { useState, useEffect } from "react";
import TutorialService from "../Services/TutoServices";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams, useNavigate } from 'react-router-dom';

const TutoList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    findByTitle();
    //console.log(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialService.getAll()
      .then(response => {
        setTutorials(response.data);
        //console.log("AFFICHEAGE:")
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

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
        navigate("/tutorials");
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })

  };

  
  
  
  
  /*FONCTION DE RECHERCHE PAR LE TITRE*/
  const findByTitle = () => {
    TutorialService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (

  <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">

      
            <h4>Tutorials List</h4>

            <ul className="list-group">
              {tutorials &&
                tutorials.map((tutorial, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllTutorials}
            >
              Remove All
            </button>
    </div>

    <div className="col-md-6">
      {currentTutorial ? (
        <div>
          <h4>Tutorial</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentTutorial.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentTutorial.description}
          </div>
          <div>
            <label>
              <strong>Date création:</strong>
            </label>{" "}
            {currentTutorial.createdAt}
          </div>
          <div>
            <label>
              <strong>Date modif:</strong>
            </label>{" "}
            {currentTutorial.updatedAt}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentTutorial.published ? "Published" : "Pending"}
          </div>

          <Link
            to={"/tuto/" + currentTutorial.id}
            className="edit-btn"
          >
            Edit
            <i class="fas fa-edit"></i>
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default TutoList;
