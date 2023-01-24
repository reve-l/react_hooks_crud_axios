import React, { useState } from "react";
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";


const AddTuto = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    nbpage:"",
    description: "",
    auteur:"",
    published: false,
    dateEdit:new Date()
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
 // const [fromDate, setFromDate] = useState(new Date())

  let navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      nbpage: tutorial.nbpage,
      description: tutorial.description,
      auteur: tutorial.auteur,
      dateEdit: tutorial.dateEdit
//      dateEdit: fromDate,
    };
    TutorialService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        Swal.fire({
          title: 'Success!',
          text: 'Enregistré',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        navigate("/tutorialslist");
        //setSubmitted(true);
        //console.log(response.data);
        //console.log("CREATE: ",data);


      })
      .catch(e => {
        console.log(e);
      });
    };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success m-3" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h3>Nouveau Tuto</h3>
          <div className="form-group">
            <label htmlFor="title" className="mt-3">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>


          <div className="form-group">
            <label htmlFor="auteur" className="mt-3">Auteur</label>
            <input
              type="text"
              className="form-control"
              id="auteur"
              required
              value={tutorial.auteur}
              onChange={handleInputChange}
              name="auteur"
            />
          </div>


          <div className="form-group">
            <label htmlFor="nbpage" className="mt-3">Nombre de page</label>
            <input
              type="text"
              className="form-control"
              id="nbpage"
              required
              value={tutorial.nbpage}
              onChange={handleInputChange}
              name="nbpage"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="mt-3">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="datedit" className="mt-3">Date édition</label>
            <input
              type="date"
              className="form-control"
              id="datedit"
              required
              value={tutorial.dateEdit}
              onChange={/*(e)=>setFromDate(e.target.value)*/ handleInputChange}
              name="dateEdit"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success m-3">
            Submit
          </button>
        </div>
      )}
    </div>
  )
};

export default AddTuto;
