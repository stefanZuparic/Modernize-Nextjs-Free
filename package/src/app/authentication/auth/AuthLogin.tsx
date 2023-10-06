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

const passwordRules = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
const schema = yup.object().shape({
  name: yup.string().required("Ime je obavezno polje!"),
  username: yup.string().required("Korisničko ime je obavezno polje!"),
  email: yup
    .string()
    .email("Molim vas unesite pravilno imejl!")
    .required("Imejl je obavezno polje!"),
  password: yup
    .string()
    .min(6, "Lozinka mora sadržati bar 6 karaktera!")
    .matches(
      passwordRules,
      "Lozinka mora u sebi sadržati bar mala slova i brojeve!"
    )
    .required("Lozinka je obavezno polje!"),
  phone: yup
    .string()
    .length(10, "Telefon mora sadžrati 10 karaketra!")
    .nullable(),
  jmbg: yup.string().length(13, "Jmbg mora sadžati 13 brojeva!").nullable(),

  pib: yup.string().nullable(),
});

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userNameRef = useRef("");
  const passRef = useRef("");

  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/protected/home";

  //login
  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     try {
  //         setLoading(true);

  //         const result = await signIn("credentials", {
  //             redirect: false,
  //             username: userNameRef.current,
  //             password: passRef.current,
  //             callbackUrl,
  //         });

  //         setLoading(false);

  //         console.log("form login", result);

  //         if (!result?.error) {
  //             router.push(callbackUrl);
  //             router.refresh();
  //         } else {
  //             setError("Neispravan email ili lozinka!");
  //         }
  //     } catch (error: any) {
  //         setLoading(false);
  //         setError(error);
  //     }
  // };

  //registracija
  // const onSubmit = async (
  //   values: Values,
  //   { setSubmitting }: FormikHelpers<Values>
  // ) => {
  //   try {
  //     debugger;
  //     const res = await axiosAuth.post("/auth/register", {
  //       name: values.name,
  //       username: values.username,
  //       email: values.email,
  //       password: values.password,
  //       phone: values.phone,
  //       jmbg: values.jmbg,
  //       pib: values.pib,
  //     });

  //     router.push("/api/auth/signin");
  //   } catch (error: any) {
  //     setError(true);
  //     setErrorText(error.response.data.message);
  //     setSubmitting(false);
  //   }
  // };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={schema}
      onSubmit={() => {}}
    >
      <>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}
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
                component={CustomTextField}
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
                component={CustomTextField}
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
              // component={Link}
              // href="/"
              type="submit"
              // disabled={isSubmitting}
            >
              Sign In
            </Button>
          </Box>
        </Form>

        {subtitle}
        {error && <Alert severity="error">{error}</Alert>}
      </>
    </Formik>
  );
};

export default AuthLogin;
