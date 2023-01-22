import React, { useState } from "react";
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';


const AddTuto = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  let navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
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

          <button onClick={saveTutorial} className="btn btn-success m-3">
            Submit
          </button>
        </div>
      )}
    </div>
  )
};

export default AddTuto;
