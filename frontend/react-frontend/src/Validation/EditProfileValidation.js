import * as Yup from 'yup'

export const editProfileSchema = Yup.object({
  phone_number: Yup.string()
          .matches(/^\d{9}$/, "Phone number has to be exactly 9 digits long"),
})