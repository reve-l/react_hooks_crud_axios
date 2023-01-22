import React, { useEffect,useState,useRef } from "react";
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';


const ImageUploadMultiple = () => {


  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };


  //const [currentFile, setCurrentFile] = useState(undefined);
  //const [previewImage, setPreviewImage] = useState(undefined);
  //const [progress, setProgress] = useState(0);
  //const [message, setMessage] = useState("");

  //const [imageInfos, setImageInfos] = useState([]);


  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const progressInfosRef = useRef(null);



  let navigate = useNavigate();


/**AU CHARGEMENT DU COMPOSANT */
 /* useEffect(() => {
    TutorialService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);*/

  useEffect(() => {
    TutorialService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);



/* CAPTER L'IMAGE UPLOADEE */
  /*const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };*/
  const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setSelectedFiles(event.target.files);
    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
  };




  const uploadImages = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    const uploadPromises = files.map((file, i) => upload(i, file));

    Promise.all(uploadPromises)
      .then(() => TutorialService.getFiles())
      .then((files) => {
        setImageInfos(files.data);
      });

    setMessage([]);
  };






  /** INSERTION DE L'IMAGE DANS LA BD */
  /*const upload = () => {
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
  };*/
  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return TutorialService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        setMessage((prevMessage) => [
          ...prevMessage,
          "Uploaded the image successfully: " + file.name,
        ]);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => [
          ...prevMessage,
          "Could not upload the image: " + file.name,
        ]);
      });
  };












    return (
      <div>
        <div className="row">
          
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={selectFiles}
              />
            </label>
          </div>
  
          <div className="col-4">
              <button
                  className="btn btn-success btn-sm"
                  disabled={!selectedFiles}
                  onClick={uploadImages}
              >
                  Upload
              </button>
          </div>
        </div>
  
        {progressInfos &&
        progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}
  
        {imagePreviews && (
          <div>
            {imagePreviews.map((img, i) => {
              return (
                <img className="preview" src={img} alt={"image-" + i} key={i} />
              );
            })}
          </div>
        )}
  
        {message.length > 0 && (
          <div className="alert alert-secondary mt-2" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}
  

        {imageInfos.length > 0 && (
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
      )}
      </div>
    );
};

export default ImageUploadMultiple;
