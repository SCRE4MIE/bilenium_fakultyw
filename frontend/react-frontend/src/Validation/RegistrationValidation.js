import * as Yup from 'yup'

export const registerSchema = Yup.object({
  email:Yup.string()
            .required("This field cannot be blank.")
            .email("Invalid e-mail address format.")
            .max(40, "E-mail cannot be longer than 40 characters"),

  username: Yup.string()
            .required("This field cannot be blank")
            .max(20, "Username cannot be longer than 20 characters.")
            .min(3, "Username has to be at least 3 characters long."),

  password: Yup.string()
            .required("This field cannot be blank.")
            .max(24, "Password cannot be longer than 24 characters.")
            .min(8, "Password has to be at least 8 characters long."),

  repeatPassword: Yup.string().required("This field cannot be blank")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

  phoneNumber: Yup.string()
            .matches(/^[0-9]{9}$/, "Phone number has to be exactly 9 characters long")
            .required("This field cannot be blank"),
})