import { red } from "@mui/material/colors"
import { CSSProperties } from "react"

export const styles: {[key: string]: CSSProperties} = {
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "32px",
  },
  input: {
    minHeight: "80px",
  },
  registerButton: {
    marginTop: "16px"
  },
  button: {
    marginTop: "28px",
    color: "white"
  }
}