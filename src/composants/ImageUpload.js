import React, { useEffect,useState } from "react";
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';


const ImageUpload = () => {


  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };


  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const [imageInfos, setImageInfos] = useState([]);



  let navigate = useNavigate();


/**AU CHARGEMENT DU COMPOSANT */
  useEffect(() => {
    TutorialService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);



/* CAPTER L'IMAGE UPLOADEE */
  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };



  /** INSERTION DE L'IMAGE DANS LA BD */
  const upload = () => {
    setProgress(0);

    TutorialService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return TutorialService.getFiles();
      })
      .then((files) => {
        setImageInfos(files.data);
      })
      .catch((err) => {

        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }

        setCurrentFile(undefined);
      });
  };












    return (
      <div>
        <div className="row">
          
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*" onChange={selectFile} />
            </label>
          </div>
  
          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={upload}
            >
              Upload
            </button>
          </div>
        </div>
  
        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
  
        {previewImage && (
          <div className="p-image">
            <img className="preview" src={previewImage} alt="" />
          </div>
        )}
  
        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}
  
        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    <a href={img.url}>{img.name}</a>
                  </p>
                  <img src={img.url} alt={img.name} height="80px" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
};

export default ImageUpload;
