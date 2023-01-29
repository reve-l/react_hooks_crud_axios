import * as yup from "yup";
//import { yupResolver } from "@hookform/resolvers/yup";


export const schema = yup.object().shape({
    //email: yup.string().email().required(),
    //password: yup.string().min(8).max(32).required(),
    nbpage: yup
                .number("ça doit être un nombre").typeError('age doit etre nombre')
                .integer("nombre entier attendu")
                .min(10,"minimum 10 pages")
                .max(200,"maximum 200 pages")
                .required("nombre de page obligatoire"),
    title: yup.string("doit être un string").required("le tire est obligatoire"),
    description: yup.string().required("la description est obligatoire"),
    auteur: yup.string().required("l'auteur est obligatoire"),
    dateEdit: yup.string().required("la date est obligatoire est obligatoire")
  });
  


  /*
  password: yup
                .string("doit être unstring")
                .min(5,"minimum 5 caractères")
                .max(10,"maximum 10caratères")
                .required("nombre de page obligatoire"),
 confirmPass: yup
                .string()
                .oneOf([yup.ref("password")],"password must be match")
                .required("obli")
  */



/*
email: yup.email("email is not valid")
*/



/*
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
*/



/*
LISTE DEROULANTE

accoutnType: yup
            .string("should be string")
            .oneOf(["personnal","commercial"])
            .required("account type is required")
*/



/*
CHKBOX
remeber: yup.boolean().oneOf([true],"please tick chekbox")
*/


/*
TOOGLE
toggle: yup.boolean().oneOf([true],"please toggle accept")
*/