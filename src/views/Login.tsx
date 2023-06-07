import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  OutlinedInput,
  InputLabel,
  Button,
  Stack,
  styled,
  Link,
  Alert,
  Collapse,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthProvider';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in the fields");
        return;
      }
      const {
        data: { user, session },
        error
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/home");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }

    setLoading(false);
  }

  return (
    <PageContainer>
      <FormContainer gap={2}>
        <Form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <OutlinedInput
              fullWidth
              id="email"
              name="email"
              inputRef={emailRef}
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              name="password"
              type="password"
              inputRef={passwordRef}
            />
          </Stack>
          <Stack direction="row">
            <Link fontWeight="bold" href="/register">
              New User?
            </Link>
          </Stack>
          <Button variant="contained" disabled={loading} size="large" type="submit" fullWidth>
            Sign in
          </Button>
          <Collapse sx={{width: '100%'}} in={errorMsg !== ''}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorMsg('');
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {errorMsg}
            </Alert>
          </Collapse>
        </Form>
      </FormContainer>
    </PageContainer>
  );
}


const Form = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '1rem',
});

const PageContainer = styled('div')({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0',
});

const FormContainer = styled(Stack)(({theme}) => ({
  maxWidth: '20000px',
  alignItems: 'center',
  padding: '2rem',
  border: '2px solid #e0e0e0',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  margin: '0 16px',
}));