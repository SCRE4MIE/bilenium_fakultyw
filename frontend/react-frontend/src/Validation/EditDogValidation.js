import * as Yup from 'yup'

export const EditDogSchema = Yup.object({
  name:Yup.string()
            .max(40, "Name cannot be longer than 40 characters"),

  breed: Yup.string()
            .max(40, "Breed name cannot be longer than 40 characters."),

  age: Yup.number()
            .max(99),

  description: Yup.string()
            .max(200, "Description cannot be longer than 255 characters."),


})