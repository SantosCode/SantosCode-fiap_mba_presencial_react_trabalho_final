import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  phone: yup.string()
    .required("Telefone é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória")
})

export interface RegisterFormValues extends yup.InferType<typeof registerSchema> {}
