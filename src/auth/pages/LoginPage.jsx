import { Link as RouterLink } from "react-router-dom";
import {
   Alert,
   Button,
   Grid,
   Link,
   TextField,
   Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import {
   startGoogleSignIn,
   startLoginWithEmailAndPassword,
} from "../../store/auth/";
import { useMemo } from "react";

// import { checkingAuthentication } from '../../store/auth/';

const formData = {
   email: "",
   password: "",
};

export const LoginPage = () => {
   const { status, errorMessage } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const { email, password, onInputChange } = useForm(formData);

   const isAuthenticating = useMemo(() => status === "checking", [status]);

   const onSubmit = (event) => {
      event.preventDefault();
      dispatch(startLoginWithEmailAndPassword({ email, password }));
      console.log({ email, password });
   };

   const onLoginWithExampleUser = () => {
      dispatch(
         startLoginWithEmailAndPassword({
            email: "johndoe1@gmail.com",
            password: "123456",
         })
      );
   };

   const onGoogleSignIn = () => {
      dispatch(startGoogleSignIn());
   };

   // const onSignInWithEmailAndPassword=()=>{
   //   console.log('onSignInWithEmailAndPassword');
   //   dispatch( startLoginWithEmailAndPassword() );
   // };

   return (
      <AuthLayout title="Login">
         <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
         >
            <Grid container>
               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Correo"
                     type="email"
                     placeholder="correo@google.com"
                     fullWidth
                     name="email"
                     value={email}
                     onChange={onInputChange}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Contraseña"
                     type="password"
                     placeholder="Contraseña"
                     fullWidth
                     name="password"
                     value={password}
                     onChange={onInputChange}
                  />
               </Grid>
               <Grid
                  container
                  display={!!errorMessage ? "" : "none"}
                  sx={{ mt: 1 }}
               >
                  <Grid item xs={12}>
                     <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
               </Grid>

               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                     <Button
                        type="submit"
                        variant="contained"
                        disabled={isAuthenticating}
                        fullWidth
                        onClick={onSubmit}
                     >
                        Login
                     </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Button
                        variant="contained"
                        fullWidth
                        onClick={onGoogleSignIn}
                        disabled={isAuthenticating}
                     >
                        <Google />
                        <Typography sx={{ ml: 1 }}>Google</Typography>
                     </Button>
                  </Grid>
               </Grid>
               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} sm={12}>
                     <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={isAuthenticating}
                        fullWidth
                        onClick={onLoginWithExampleUser}
                     >
                        Login with example user
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction="row" justifyContent="end">
                  <Link
                     component={RouterLink}
                     color="inherit"
                     to="/auth/register"
                  >
                     Crear una cuenta
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayout>
   );
};
