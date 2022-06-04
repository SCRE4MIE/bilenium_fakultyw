import * as Yup from 'yup'

export const AddDogSchema = Yup.object({
  name:Yup.string()
            .required("This field cannot be blank.")
            .max(40, "Name cannot be longer than 40 characters"),

  breed: Yup.string()
            .required("This field cannot be blank")
            .max(40, "Breed name cannot be longer than 40 characters."),

  age: Yup.number()
            .required("This field cannot be blank."),

  description: Yup.string()
            .required("This field cannot be blank")
            .max(255, "Description cannot be longer than 255 characters."),


})