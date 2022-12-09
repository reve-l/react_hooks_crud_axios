
import React, { useState } from "react";
//import TutorialDataService from "../services/TutoService";

const AddTuto = () => {
    const initialTutoState = {
      id: null,
      title: "",
      description: "",
      published: false
    };
    
    const [tutorial, setTutorial] = useState(initialTutoState);
    const [submitted, setSubmitted] = useState(false);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setTutorial({ ...tutorial, [name]: value });
    };
  
    const saveTuto = () => {
        var data = {
          title: tutorial.title,
          description: tutorial.description
        };
    
        TutorialDataService.create(data)
          .then(response => {
            setTutorial({
              id: response.data.id,
              title: response.data.title,
              description: response.data.description,
              published: response.data.published
            });
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const newTutorial = () => {
        setTutorial(initialTutoState);
        setSubmitted(false);
      };
    
      return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newTutorial}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
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
                <label htmlFor="description">Description</label>
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
    
              <button onClick={saveTutorial} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    };
    
    export default AddTuto;