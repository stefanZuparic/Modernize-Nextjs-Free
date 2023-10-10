"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { TextField } from "formik-mui";

const passwordRules = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
const schema = yup.object().shape({
  username: yup.string().required("Korisničko ime je obavezno polje!"),
  password: yup
    .string()
    .min(6, "Lozinka mora sadržati bar 6 karaktera!")
    .matches(
      passwordRules,
      "Lozinka mora u sebi sadržati bar mala slova i brojeve!"
    )
    .required("Lozinka je obavezno polje!"),
});

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  interface Values {
    username: string;
    password: string;
  }

  const onSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl,
      });

      if (!result?.error) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError("Neispravan email ili lozinka!");
      }
    } catch (error: any) {
      setSubmitting(false);
      setError(error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="username"
                  mb="5px"
                >
                  Username
                </Typography>
                <Field
                  component={TextField}
                  variant="outlined"
                  name="username"
                  type="text"
                  label="Korisničko ime"
                  fullWidth
                ></Field>
              </Box>
              <Box mt="25px">
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  Password
                </Typography>
                <Field
                  component={TextField}
                  name="password"
                  type="password"
                  label="Lozinka"
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Stack
                justifyContent="space-between"
                direction="row"
                alignItems="center"
                my={2}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remeber this Device"
                  />
                </FormGroup>
                <Typography
                  component={Link}
                  href="/"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {subtitle}
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default AuthLogin;
