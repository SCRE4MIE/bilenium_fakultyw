import * as Yup from 'yup'

export const registerSchema = Yup.object({
  email:Yup.string()
            .required("E-mail field cannot be blank.")
            .email("Invalid e-mail address format.")
            .max(40, "E-mail cannot be longer than 40 characters."),

  username: Yup.string()
            .required("Username field cannot be blank")
            .max(20, "Username cannot be longer than 20 characters.")
            .min(3, "Username has to be at least 3 characters long."),

  password: Yup.string()
            .required("Password field cannot be blank.")
            .max(24, "Password cannot be longer than 24 characters.")
            .min(8, "Password has to be at least 8 characters long."),

  repeatPassword: Yup.string().required("Please repeat your password.")
            .oneOf([Yup.ref('password'), null], 'Passwords must match.'),

  phoneNumber: Yup.string()
            .matches(/^\d{9}$/, "Phone number has to be exactly 9 digits long")
            .required("Phone number cannot be blank."),
})