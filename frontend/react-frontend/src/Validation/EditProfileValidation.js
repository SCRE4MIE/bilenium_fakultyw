import * as Yup from 'yup'

export const editProfileSchema = Yup.object({
  phone_number: Yup.string()
          .matches(/^[0-9]{9}$/, "Phone number has to be exactly 9 characters long"),
})