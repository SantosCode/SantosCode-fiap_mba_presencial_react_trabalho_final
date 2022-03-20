import {
  Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField, Typography
} from "@mui/material";
import { useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { styles } from "./login-view.styles";
import { LoginFormValues, loginSchema } from "./validation";

interface Props {
  handleLogin: (values: LoginFormValues) => Promise<void>;
  isLoading: boolean;
  externalError?: string;
  handleRegister: () => void;
}

const LoginView = ({ handleLogin, isLoading, externalError, handleRegister }: Props): ReactElement => {
  const [isPasswordVisible] = useState(false)

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
  } = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: handleLogin,
    validationSchema: loginSchema,
  })

  const hasErrors = errors.email !== undefined || errors.password !== undefined

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
        xs={8}
        direction="column"
      >
        <Typography variant="h2">Store FIAP</Typography>
        <Typography variant="subtitle2">
          Entre com o seu login
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
            <FormControl variant="outlined" style={styles.input}>
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
            >{isLoading ? "Logando" : "Entrar"}</Button>
          </Grid>
        </form>
        <Button
          variant="text"
          style={styles.registerButton}
          size="large"
          onClick={handleRegister}
        >
          Cadastrar
        </Button>
      </Grid>
    </Grid>
  )
}

export default LoginView