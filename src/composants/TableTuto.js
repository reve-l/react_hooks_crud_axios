import React, { useState, useEffect } from "react";
import TutorialService from "../Services/TutoServices";
import Swal from 'sweetalert2';
import { Link,useParams, useNavigate } from 'react-router-dom';

import { CiWarning,CiPickerHalf,CiViewList,CiPrinting } from 'react-icons/ci';
import {BsFillTrashFill } from 'react-icons/bs';
import {AiFillPrinter} from 'react-icons/ai';

const TableTuto = ({data}) => {


  let navigate = useNavigate();

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
         //refreshList();
         navigate(0);
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




  return (

    <div>
      <h3 className="text-center mt-5">Tutorials List</h3>
      <table className="styled-table">
        <thead>
              <tr className="btn-act">
                <td colSpan={3}>
                      <button className="m-3 btn btn-sm btn-danger"onClick={removeAllTutorials}>Remove All</button> 
                      <button className="m-3 btn btn-sm btn-light">Total: <span className="">{data.length}</span></button> 
                </td>
                <td colSpan={3}></td>        
                <td>
                    <Link className="m-3 btn btn-sm btn-secondary" to={"/add"}>Nouveau</Link> 
                </td>
                <td>
                    <Link className="m-3 btn btn-sm btn-light" to={"/add"}><AiFillPrinter className=""/>IMPRIMER</Link> 
                </td>
              </tr>


              <tr className="tbl-h">
                <td>N°</td>
                <td>Titre</td>
                <td>Pages</td>
                <td>Description</td>
                <td>Auteur</td>
                <td>Parution</td>
                <td>Etat</td>
                <td>Action</td>
              </tr>
        </thead>
        
        <tbody>
          {

        
            data &&
                        
            
            data.map((tutorial, index) => 
            { 
              return (
                  <tr>
                    <td>{index+1}</td>
                    <td>{tutorial.title}</td>
                    <td>{tutorial.nbpage}</td>
                    <td>{tutorial.description}</td>
                    <td>
                      {tutorial.auteur}
                      {/*new Date(tutorial.createdAt).toLocaleDateString()*/}
                      </td>
                    <td>
                      {tutorial.dateEdit?new Date(tutorial.dateEdit).toLocaleDateString():"-"}
                      {/*tutorial.updatedAt?new Date(tutorial.updatedAt).toLocaleDateString():"-"*/}
                      </td>
                    <td>{tutorial.published?"Publié":"Non"}</td>
                    <td>
                      <Link to={"/tuto/" + tutorial.id} className="btn btn-sm" title="modifier"><CiPickerHalf className="btn-edit"/></Link>
                      <Link to={"/details/" + tutorial.id} className="btn btn-sm" title="détails"><CiViewList className="btn-dtls"/></Link>
                      <button onClick={() => deleteTutorial(tutorial.id,tutorial)} className="btn btn-sm" title="supprimer"><BsFillTrashFill className="btn-del"/></button>

                    </td>
                  </tr>
              )
            })

          }
        </tbody>
        
        
      </table>

    
  </div>
  );
};

export default TableTuto;
