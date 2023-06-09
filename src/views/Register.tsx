import { useRef, useState } from 'react';
import {
  InputLabel,
  OutlinedInput,
  Stack,
  Button,
  Link,
  Typography,
  Alert,
  Collapse,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../server/client';


export const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
        setTimeout(() => {navigate('/login')}, 3000);
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
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
              inputRef={emailRef}
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              type="password"
              inputRef={passwordRef}
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="confirmPassword"
              type="password"
              inputRef={confirmPasswordRef}
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography>Already a member?</Typography>
            <Link fontWeight="bold" href="/login">
              Log in
            </Link>
          </Stack>
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            fullWidth
          >
            Sign up
          </Button>
          <Collapse sx={{width: '100%'}} in={errorMsg !== '' || msg !== ''}>
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
              {errorMsg || msg}
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