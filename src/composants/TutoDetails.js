import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from 'react-router-dom';
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import {BsReplyAllFill,BsPinAngleFill} from 'react-icons/bs';



const TutoDetails = props => {
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
        //console.log(response.data);
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
    {currentTutorial ? (<>
      <BsPinAngleFill className="dtls-point"/>
      <div className="dtls-form">
        <h2 className="text-center">Tutorial</h2>
        <ul>
          <li className="form-group mt-2">
            <p><span> Titre:</span> {currentTutorial.title}</p>
          </li>
          <li className="form-group mt-2">
            <p><span>Description:</span> {currentTutorial.description}</p>
          </li>
          <li className="form-group mt-2">
            <p><span>Statut:</span> {currentTutorial.published ? "Published" : "Pending"}</p>
          </li>
          <li className="form-group mt-2">
            <p><span>Date création:</span> {new Date(currentTutorial.createdAt).toLocaleDateString()}</p>
          </li>
          <li className="form-group mt-2">
            <p><span>Date maj:</span> {currentTutorial.updatedAt?new Date(currentTutorial.updatedAt).toLocaleDateString():""}</p>
          </li>
        </ul>
        
        {<Link to={"/tutorialslist"} className="btn btn-sm" ><BsReplyAllFill className="btn-back"/></Link>}

        
      </div>

      </>
    ) : ""}

  </div>
  );
};

export default TutoDetails;
