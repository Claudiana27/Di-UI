import React, { useState } from "react";
import { Box, Typography, Stack, TextField, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.email || !form.password) {
      setErrorMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
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
        Log In
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={{ xs: 1.2, md: 2.5 }}>
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
            type="password"
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

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: { xs: "stretch", md: "center" },
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: 13, textAlign: { xs: "center", sm: "left" } }}>
              <a href="#">Forgot Password?</a>
            </Typography>
            <Button
              type="submit"
              disabled={loading}
              sx={{
                color: "white",
                width: { xs: "100%", sm: 120 },
                height: { xs: 34, md: 36 },
                fontSize: 12,
                borderRadius: 999,
                background: "linear-gradient(100deg, #0ea5e9, #14b8a6)",
              }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </Box>

          {errorMessage && (
            <Typography sx={{ color: "#fda4af", fontSize: 13, textAlign: "center" }}>
              {errorMessage}
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
            onClick={handleGoogleLogin}
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
