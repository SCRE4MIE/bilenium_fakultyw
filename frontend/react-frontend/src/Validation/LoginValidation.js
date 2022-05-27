import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email:Yup.string().required("E-mail field can't be blank.").email("Invalid e-mail address format."),
  password:Yup.string().required("Password field can't be blank"),
})