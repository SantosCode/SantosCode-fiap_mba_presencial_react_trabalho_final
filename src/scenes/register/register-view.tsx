import {
  Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField, Typography
} from "@mui/material";
import { useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import InputMask from "react-input-mask";
import { styles } from "./register-view.styles";
import { RegisterFormValues, registerSchema } from "./validation";

interface Props {
  handleRegister: (values: RegisterFormValues) => Promise<void>;
  isLoading: boolean;
  handleBack: () => void;
  externalError?: string;
}

const RegisterView = ({
  handleRegister,
  isLoading,
  handleBack,
  externalError
}: Props): ReactElement => {
  const [isPasswordVisible] = useState(false)

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
  } = useFormik<RegisterFormValues>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phone: ""
    },
    onSubmit: handleRegister,
    validationSchema: registerSchema
  })

  const hasErrors = errors.email !== undefined ||
    errors.name !== undefined ||
    errors.password !== undefined ||
    errors.phone !== undefined

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <Grid
        container
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        xs={6}
        direction="column"
      >
        <Typography variant="h2">Store FIAP</Typography>
        <Typography variant="subtitle1">
          Cadastro
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <Grid
            xs={6}
            container
            direction="column"
          >
            <TextField
              label="Nome"
              value={values.name}
              name="name"
              type="text"
              margin="dense"
              error={touched.name === true && errors.name !== undefined && errors.name.length > 0}
              onBlur={handleBlur("name")}
              onChange={handleChange("name")}
              helperText={touched.name === true && errors.name}
              style={styles.input}
            />
            <TextField
              label="E-Mail"
              value={values.email}
              name="email"
              type="email"
              margin="dense"
              error={touched.email === true && errors.email !== undefined && errors.email.length > 0}
              onBlur={handleBlur("email")}
              onChange={handleChange("email")}
              helperText={touched.email === true && errors.email}
              style={styles.input}
            />
            <FormControl variant="outlined" style={styles.input} margin="dense">
              <InputLabel
                htmlFor="password"
                error={touched.password === true && errors.password !== undefined && errors.password.length > 0}
                style={{
                  zIndex: 1,
                  backgroundColor: "white",
                }}>Senha</InputLabel>
              <OutlinedInput
                value={values.password}
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                margin="dense"
                error={touched.password === true && errors.password !== undefined && errors.password.length > 0}
                onBlur={handleBlur("password")}
                onChange={handleChange("password")}
              />
              {touched.password === true &&
                (
                  <FormHelperText
                    error={touched.password === true && errors.password !== undefined && errors.password.length > 0}
                  >{errors.password}</FormHelperText>
                )
              }
            </FormControl>
            <InputMask
              mask={"(99)99999-9999"}
              onChange={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            >
              <TextField
                label="Telefone"
                name="phone"
                type="phone"
                margin="dense"
                error={touched.phone === true && errors.phone !== undefined && errors.phone.length > 0}
                helperText={touched.phone === true && errors.phone}
                style={styles.input}
              />
            </InputMask>
            {externalError !== undefined && (
              <Typography variant="subtitle2" color="#d32f2f">
                {externalError}
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              style={styles.button}
              disabled={hasErrors || isLoading}
              size="large"
            >{isLoading ? "Cadastrando..." : "Cadastrar"}</Button>
          </Grid>
        </form>
        <Button
          variant="text"
          style={styles.backButton}
          size="large"
          onClick={handleBack}
        >
          Voltar
        </Button>
      </Grid>
    </Grid>
  )
}

export default RegisterView