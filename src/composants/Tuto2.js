import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const Tuto = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    TutorialService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  
  
  
  /*FONCTION DE PUBLICATION D'UN ARTICLE */
  const updatePublished = status => {

    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    Swal.fire({
      title: status===1?'Publier ce Tutoriel':'Dépublier',
      icon:'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: status===1?'Publier':'Dépublier',
      denyButtonText: `Annuler`,
    })
    
    .then((result) => {
      
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        TutorialService.update(currentTutorial.id, data)
        .then(response => {
          setCurrentTutorial({ ...currentTutorial, published: status });
          status===1?
          Swal.fire('Publié!', '', 'success'):Swal.fire('Dépublié!', '', 'success');
          navigate("/tutorials");
          //console.log(response.data);
          //setMessage("The tutorial was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
      } else if (result.isDenied) {
        //navigate("/tutorials");
        navigate("/tuto/" + currentTutorial.id);
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })

  };



  /*FONCTION DE MODIFICATION D'UN TUTO*/
  const updateTutorial = () => {

    Swal.fire({
      title: 'Modifier ce Tutoriel',
      icon:'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Modifier',
      denyButtonText: `Annuler`,
    }).then((result) => {

      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        TutorialService.update(currentTutorial.id, currentTutorial)
        .then(response => {
          //Swal.fire('Modifié!', '', 'success')
          navigate("/tutorials");
          //console.log(response.data);
          //setMessage("The tutorial was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
      } else if (result.isDenied) {
        //navigate("/tutorials");
        navigate("/tuto/" + currentTutorial.id);
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })

  };




  /*FONCTION DE SUPPRESION D'UN TUTORIEL*/
  const deleteTutorial = () => {

    Swal.fire({
      title: 'Supprimer ce Tutoriel',
      icon:'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Supprimer',
      denyButtonText: `Annuler`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        TutorialService.remove(currentTutorial.id)
          .then(response => {
            //Swal.fire('Supprimé!', '', 'success')
          navigate("/tutorials");
          
      })
      .catch(e => {
        console.log(e);
      });
      } else if (result.isDenied) {
        //navigate("/tutorials");
        navigate("/tuto/" + currentTutorial.id);
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })

  };



  return (
    <div>
    {currentTutorial ? (
      <div className="edit-form">
        <h4>Tutorial</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentTutorial.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentTutorial.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mt-2">
            <label>
              <strong>Status:</strong>
            </label>
            {currentTutorial.published ? "Published" : "Pending"}
          </div>
        </form>

        {currentTutorial.published ? (
          <button
            className="m-3 btn btn-sm btn-primary"
            onClick={() => updatePublished(0)}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="m-3 btn btn-sm btn-primary"
            onClick={() => updatePublished(1)}
          >
            Publish
          </button>
        )}

        <button className="m-3 btn btn-sm btn-danger" onClick={deleteTutorial}>
          Delete
        </button>

        <button
          type="submit"
          className="m-3 btn btn-sm btn-success"
          onClick={updateTutorial}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    )}
  </div>
  );
};

export default Tuto;
