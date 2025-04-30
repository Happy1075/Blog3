import * as React from 'react';
import axios from 'axios';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content', position: 'absolute', top: 24, right: 24 }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

export default function Signup(props) {
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/auth/signup', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      setSuccess('Account created successfully!');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'white' }}>
      <CssVarsProvider {...props}>
        <CssBaseline />
        <ModeToggle />
        <Sheet
          sx={{
            width: 340,
            mx: 'auto',
            my: 8,
            py: 4,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            borderRadius: 'lg',
            boxShadow: 'xl',
            background: '#fff',
            alignItems: 'center',
          }}
          variant="outlined"
        >
          <Typography
            level="h3"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              letterSpacing: 1,
              mb: 1,
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Blog <span style={{ color: '#FFD600' }}>App</span>
          </Typography>
          <div style={{ width: '100%' }}>
            <Typography level="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Create Account
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Sign up to get started.
            </Typography>
          </div>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl sx={{ mb: 1.5 }}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </FormControl>
            <FormControl sx={{ mb: 1.5 }}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </FormControl>
            <FormControl sx={{ mb: 1.5 }}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </FormControl>
            {error && (
              <Typography color="danger" level="body-sm" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success" level="body-sm" sx={{ mb: 1 }}>
                {success}
              </Typography>
            )}
            <Button type="submit" sx={{ mt: 1, width: '100%' }} variant="solid" color="primary">
              Sign up
            </Button>
          </form>
          <Typography
            endDecorator={<Link href="/login">Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center', mt: 1 }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
}
