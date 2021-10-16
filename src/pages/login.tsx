import Head from 'next/head';
import { Paper, TextField, Button } from '@mui/material';
import { signIn } from 'next-auth/client';
import { Google } from '@mui/icons-material';

import { Layout } from '@components/Layout';
import { useForm } from '@hooks/useForm';
import logo from '@assets/logo.png';
import { styled } from '@mui/system';

type LoginFormValues = {
  email: string;
  password: string;
};

const LogoImage = styled('img')({
  margin: '0 auto',
});

export default function Login() {
  const { formValues, handleChange, onSubmit } = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Layout.Center>
      <Head>
        <title>Homepage - GW.Organizer</title>
      </Head>
      <Paper
        component="form"
        onSubmit={onSubmit((formValues) => {
          console.log('FORM VALUES', formValues);
        })}
        sx={{
          width: 500,
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
          padding: '1rem',
        }}
      >
        <LogoImage src={logo.src} width={100} />

        {/* <TextField
          name="email"
          type="email"
          label="Email"
          value={formValues.email}
          onChange={handleChange}
        />

        <TextField
          name="password"
          type="password"
          label="Password"
          value={formValues.password}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Login
        </Button> */}

        <Button
          sx={{ display: 'flex', alignItems: 'center' }}
          type="button"
          variant="contained"
          startIcon={<Google />}
          onClick={() => signIn("google")}
        >
          Login with Google
        </Button>
      </Paper>
    </Layout.Center>
  );
}
