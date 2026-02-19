import React from "react";
import { Box, Typography, Button, Stack, TextField, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function SignupForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      navigate("/dashboard");
      return;
    }

    setSuccessMessage("Account created. Check your email to confirm your account.");
  };

  const handleGoogleSignup = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 420,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          color: "#e2f6ff",
          mb: { xs: 1, md: 3 },
          textAlign: { xs: "center", md: "left" },
          letterSpacing: "0.02em",
          fontSize: { xs: 24, md: 30 },
        }}
      >
        Sign Up
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={{ xs: 1.2, md: 2.5 }}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            variant="standard"
            sx={{
              input: { color: "white", fontSize: { xs: 13, md: 13 } },
              label: { color: "rgba(226, 232, 240, 0.9)", fontSize: { xs: 13, md: 12 } },
              "& .MuiInput-underline:before": { borderBottomColor: "rgba(148, 163, 184, 0.55)" },
              "& .MuiInput-underline:after": { borderBottomColor: "#22d3ee" },
            }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            variant="standard"
            sx={{
              input: { color: "white", fontSize: { xs: 13, md: 13 } },
              label: { color: "rgba(226, 232, 240, 0.9)", fontSize: { xs: 13, md: 12 } },
              "& .MuiInput-underline:before": { borderBottomColor: "rgba(148, 163, 184, 0.55)" },
              "& .MuiInput-underline:after": { borderBottomColor: "#22d3ee" },
            }}
          />
          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            variant="standard"
            sx={{
              input: { color: "white", fontSize: { xs: 13, md: 13 } },
              label: { color: "rgba(226, 232, 240, 0.9)", fontSize: { xs: 13, md: 12 } },
              "& .MuiInput-underline:before": { borderBottomColor: "rgba(148, 163, 184, 0.55)" },
              "& .MuiInput-underline:after": { borderBottomColor: "#22d3ee" },
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            variant="standard"
            sx={{
              input: { color: "white", fontSize: { xs: 13, md: 13 } },
              label: { color: "rgba(226, 232, 240, 0.9)", fontSize: { xs: 13, md: 12 } },
              "& .MuiInput-underline:before": { borderBottomColor: "rgba(148, 163, 184, 0.55)" },
              "& .MuiInput-underline:after": { borderBottomColor: "#22d3ee" },
            }}
          />

          <Button
            type="submit"
            disabled={loading}
            sx={{
              color: "white",
              width: { xs: "100%", sm: 120 },
              alignSelf: { xs: "stretch", sm: "center" },
              height: { xs: 34, md: 36 },
              fontSize: 12,
              borderRadius: 999,
              background: "linear-gradient(100deg, #0ea5e9, #14b8a6)",
            }}
          >
            {loading ? "Creating..." : "Sign up"}
          </Button>

          {errorMessage && (
            <Typography sx={{ color: "#fda4af", fontSize: 13, textAlign: "center" }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography sx={{ color: "#86efac", fontSize: 13, textAlign: "center" }}>
              {successMessage}
            </Typography>
          )}

          <Divider
            sx={{
              my: { xs: 0.2, md: 1 },
              color: "white",
              "&::before, &::after": { borderColor: "rgba(255, 255, 255, 0.3)" },
            }}
          >
            or
          </Divider>

          <Button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            sx={{
              color: "white",
              width: "100%",
              height: { xs: 34, md: 38 },
              fontSize: 12,
              borderRadius: 999,
              border: "1px solid rgba(125, 211, 252, 0.35)",
              background: "rgba(15, 23, 42, 0.45)",
            }}
          >
            Continuer avec Google
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
