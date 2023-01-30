import React, { useState, useEffect } from "react";
import TutorialService from "../Services/TutoServices";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';




const Print = () => {
    
    const [tutorialsPrint, setTutorialsPrint] = useState();

    
    useEffect(() => {
        retrievePrint();
      }, []);
    
    
    
    /*FONCTION DE CHARGEMENT DE TOUS LES TUTORIELS*/
      const retrievePrint = () => {
        TutorialService.generatePdf()
          .then(response => {
            //setTutorialsPrint(response.data);
            //console.log("PDF/",response.data);

            //const file = new Blob([response.data],{type: "application/pdf"});
            //console.log(file);
            //var link = document.createElement("a");
            //link.href = window.URL.createObjectURL(file);
            //link.download ="listTuto.pdf";
            //link.click();

            //const fileURL = URL.createObjectURL(new Blob([response.data]));
            //setTutorialsPrint(fileURL);
            //window.open(fileURL);
            //console.log(fileURL);

            //const url =  window.URL.createObjectURL(new Blob([response.data]));
            //const link = document.createElement("a");
            //link.href = url;
            //link.setAttribute('download', 'listTuto.pdf');
            //document.body.appendChild(link);
            //link.click();
            //console.log(response.data);
            //console.log(crypto.createHash('md5').update(response.data).digest('hex'));

          })
          .catch(e => {
            console.log(e);
          });
      };



return (
  <div
  className="modal show"
  style={{ display: 'block', position: 'initial' }}
>
  <Modal.Dialog>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>

    
)

    
}


export default Print;