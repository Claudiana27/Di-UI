import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  TextField,
  Paper,
  Drawer,
  List,
  ListItemButton,
} from "@mui/material";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import { useNavigate } from "react-router-dom";
import { zipSync, strToU8 } from "fflate";
import { supabase } from "../lib/supabase";

const frameworks = [
  { key: "html", label: "HTML" },
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "next", label: "Next.js" },
];

const previewModes = [
  { key: "desktop", label: "Desktop", width: "100%", icon: <DesktopWindowsRoundedIcon sx={{ fontSize: 16 }} /> },
  { key: "mobile", label: "Mobile", width: 390, icon: <PhoneIphoneRoundedIcon sx={{ fontSize: 16 }} /> },
];

const themePresets = [
  {
    key: "ocean",
    label: "Ocean",
    gradient: ["#0ea5e9", "#14b8a6"],
    accent: "#67e8f9",
    bg: "#020617",
    bgSoft: "#0f172a",
    bgStrong: "#1d4ed8",
  },
  {
    key: "sunset",
    label: "Sunset",
    gradient: ["#f97316", "#ef4444"],
    accent: "#fdba74",
    bg: "#1f0a06",
    bgSoft: "#3a0f12",
    bgStrong: "#b91c1c",
  },
  {
    key: "violet",
    label: "Violet",
    gradient: ["#8b5cf6", "#ec4899"],
    accent: "#c4b5fd",
    bg: "#180b2a",
    bgSoft: "#2a1040",
    bgStrong: "#6d28d9",
  },
  {
    key: "forest",
    label: "Forest",
    gradient: ["#22c55e", "#16a34a"],
    accent: "#86efac",
    bg: "#062012",
    bgSoft: "#0c2a18",
    bgStrong: "#166534",
  },
  {
    key: "mono",
    label: "Mono",
    gradient: ["#64748b", "#334155"],
    accent: "#cbd5e1",
    bg: "#0b1020",
    bgSoft: "#111827",
    bgStrong: "#1f2937",
  },
];

const LOCAL_SAVED_WORKS_KEY = "builder_saved_works_v1";

const templateCatalog = {
  navbar: [
    {
      id: "aurora",
      label: "Aurora",
      templates: {
        html: `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; font-family: "Segoe UI", sans-serif; background: #020617; color: #e2e8f0; }
    nav { display: flex; justify-content: space-between; align-items: center; padding: 14px 22px; border-bottom: 1px solid rgba(125, 211, 252, .3); background: rgba(15, 23, 42, .9); }
    .logo { font-size: 20px; font-weight: 800; color: #67e8f9; }
    .links { display: flex; gap: 18px; }
    .links a { color: #cbd5e1; text-decoration: none; font-weight: 600; }
    button { border: 0; border-radius: 999px; padding: 9px 16px; color: white; background: linear-gradient(100deg, #0ea5e9, #14b8a6); }
  </style>
</head>
<body>
  <nav>
    <div class="logo">Aurora UI</div>
    <div class="links">
      <a href="#">Accueil</a>
      <a href="#">Features</a>
      <a href="#">Pricing</a>
      <a href="#">Docs</a>
    </div>
    <button>Demarrer</button>
  </nav>
</body>
</html>`,
        react: `const App = () => {
  const nav = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px", borderBottom: "1px solid rgba(125,211,252,.3)", background: "rgba(15,23,42,.9)" };
  const links = { display: "flex", gap: "18px" };
  const a = { color: "#cbd5e1", textDecoration: "none", fontWeight: 600 };
  const btn = { border: 0, borderRadius: 999, padding: "9px 16px", color: "white", background: "linear-gradient(100deg, #0ea5e9, #14b8a6)" };
  return (
    <div style={{ margin: 0, fontFamily: "Segoe UI, sans-serif", background: "#020617", minHeight: "100vh", color: "#e2e8f0" }}>
      <nav style={nav}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#67e8f9" }}>Aurora UI</div>
        <div style={links}>
          <a style={a} href="#">Accueil</a>
          <a style={a} href="#">Features</a>
          <a style={a} href="#">Pricing</a>
          <a style={a} href="#">Docs</a>
        </div>
        <button style={btn}>Demarrer</button>
      </nav>
    </div>
  );
};`,
        vue: `const App = {
  template: '<div style="margin:0;font-family:Segoe UI,sans-serif;background:#020617;min-height:100vh;color:#e2e8f0"><nav style="display:flex;justify-content:space-between;align-items:center;padding:14px 22px;border-bottom:1px solid rgba(125,211,252,.3);background:rgba(15,23,42,.9)"><div style="font-size:20px;font-weight:800;color:#67e8f9">Aurora UI</div><div style="display:flex;gap:18px"><a href="#" style="color:#cbd5e1;text-decoration:none;font-weight:600">Accueil</a><a href="#" style="color:#cbd5e1;text-decoration:none;font-weight:600">Features</a><a href="#" style="color:#cbd5e1;text-decoration:none;font-weight:600">Pricing</a><a href="#" style="color:#cbd5e1;text-decoration:none;font-weight:600">Docs</a></div><button style="border:0;border-radius:999px;padding:9px 16px;color:white;background:linear-gradient(100deg,#0ea5e9,#14b8a6)">Demarrer</button></nav></div>'
};`,
        next: `const Page = () => {
  const nav = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px", borderBottom: "1px solid rgba(125,211,252,.3)", background: "rgba(15,23,42,.9)" };
  return (
    <main style={{ margin: 0, fontFamily: "Segoe UI, sans-serif", background: "#020617", minHeight: "100vh", color: "#e2e8f0" }}>
      <nav style={nav}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#67e8f9" }}>Aurora UI</div>
        <div style={{ display: "flex", gap: 18 }}>
          <a style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600 }} href="#">Accueil</a>
          <a style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600 }} href="#">Features</a>
          <a style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600 }} href="#">Pricing</a>
          <a style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: 600 }} href="#">Docs</a>
        </div>
        <button style={{ border: 0, borderRadius: 999, padding: "9px 16px", color: "white", background: "linear-gradient(100deg,#0ea5e9,#14b8a6)" }}>Demarrer</button>
      </nav>
    </main>
  );
};`,
      },
    },
    {
      id: "glass",
      label: "Glass",
      templates: {
        html: `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: radial-gradient(circle at top, #1d4ed8 0, #020617 60%); min-height: 100vh; }
    nav { margin: 18px auto; width: min(980px, calc(100% - 26px)); display: flex; justify-content: space-between; align-items: center; border-radius: 16px; padding: 12px 16px; border: 1px solid rgba(255,255,255,.22); background: rgba(15, 23, 42, .5); backdrop-filter: blur(10px); }
    .group { display: flex; gap: 12px; }
    a { color: #e2e8f0; text-decoration: none; }
  </style>
</head>
<body>
  <nav>
    <strong style="color:#67e8f9">Glass Nav</strong>
    <div class="group">
      <a href="#">Accueil</a>
      <a href="#">A propos</a>
      <a href="#">Templates</a>
    </div>
    <a href="#" style="padding:8px 12px;border-radius:999px;background:#0ea5e9;color:white;">Sign In</a>
  </nav>
</body>
</html>`,
        react: `const App = () => (
  <div style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "radial-gradient(circle at top, #1d4ed8 0, #020617 60%)", minHeight: "100vh", paddingTop: 18 }}>
    <nav style={{ margin: "0 auto", width: "min(980px, calc(100% - 26px))", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 16, padding: "12px 16px", border: "1px solid rgba(255,255,255,.22)", background: "rgba(15,23,42,.5)", backdropFilter: "blur(10px)" }}>
      <strong style={{ color: "#67e8f9" }}>Glass Nav</strong>
      <div style={{ display: "flex", gap: 12 }}>
        <a style={{ color: "#e2e8f0", textDecoration: "none" }} href="#">Accueil</a>
        <a style={{ color: "#e2e8f0", textDecoration: "none" }} href="#">A propos</a>
        <a style={{ color: "#e2e8f0", textDecoration: "none" }} href="#">Templates</a>
      </div>
      <a href="#" style={{ padding: "8px 12px", borderRadius: 999, background: "#0ea5e9", color: "white", textDecoration: "none" }}>Sign In</a>
    </nav>
  </div>
);`,
        vue: `const App = {
  template: '<div style="margin:0;font-family:Arial,sans-serif;background:radial-gradient(circle at top,#1d4ed8 0,#020617 60%);min-height:100vh;padding-top:18px"><nav style="margin:0 auto;width:min(980px, calc(100% - 26px));display:flex;justify-content:space-between;align-items:center;border-radius:16px;padding:12px 16px;border:1px solid rgba(255,255,255,.22);background:rgba(15,23,42,.5);backdrop-filter:blur(10px)"><strong style="color:#67e8f9">Glass Nav</strong><div style="display:flex;gap:12px"><a href="#" style="color:#e2e8f0;text-decoration:none">Accueil</a><a href="#" style="color:#e2e8f0;text-decoration:none">A propos</a><a href="#" style="color:#e2e8f0;text-decoration:none">Templates</a></div><a href="#" style="padding:8px 12px;border-radius:999px;background:#0ea5e9;color:white;text-decoration:none">Sign In</a></nav></div>'
};`,
        next: `const Page = () => (
  <div style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "radial-gradient(circle at top, #1d4ed8 0, #020617 60%)", minHeight: "100vh", paddingTop: 18 }}>
    <nav style={{ margin: "0 auto", width: "min(980px, calc(100% - 26px))", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 16, padding: "12px 16px", border: "1px solid rgba(255,255,255,.22)", background: "rgba(15,23,42,.5)", backdropFilter: "blur(10px)" }}>
      <strong style={{ color: "#67e8f9" }}>Glass Nav</strong>
      <div style={{ display: "flex", gap: 12 }}>
        <a style={{ color: "#e2e8f0", textDecoration: "none" }} href="#">Accueil</a>
        <a style={{ color: "#e2e8f0", textDecoration: "none" }} href="#">A propos</a>
        <a style={{ color: "#e2e8f0", textDecoration: "none" }} href="#">Templates</a>
      </div>
      <a href="#" style={{ padding: "8px 12px", borderRadius: 999, background: "#0ea5e9", color: "white", textDecoration: "none" }}>Sign In</a>
    </nav>
  </div>
);`,
      },
    },
    {
      id: "minimal",
      label: "Minimal",
      templates: {
        html: `<!doctype html>
<html>
<head>
  <style>
    body { margin: 0; font-family: Inter, sans-serif; color: #0f172a; }
    nav { display:flex; justify-content:space-between; align-items:center; padding:14px 20px; border-bottom:1px solid #e2e8f0; }
    ul { display:flex; gap:14px; list-style:none; margin:0; padding:0; }
    a { color:#334155; text-decoration:none; }
  </style>
</head>
<body>
  <nav>
    <strong>Minimal</strong>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Work</a></li>
      <li><a href="#">About</a></li>
    </ul>
    <a href="#">Contact</a>
  </nav>
</body>
</html>`,
        react: `const App = () => (
  <div style={{ margin: 0, fontFamily: "Inter, sans-serif", color: "#0f172a" }}>
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #e2e8f0" }}>
      <strong>Minimal</strong>
      <ul style={{ display: "flex", gap: 14, listStyle: "none", margin: 0, padding: 0 }}>
        <li><a style={{ color: "#334155", textDecoration: "none" }} href="#">Home</a></li>
        <li><a style={{ color: "#334155", textDecoration: "none" }} href="#">Work</a></li>
        <li><a style={{ color: "#334155", textDecoration: "none" }} href="#">About</a></li>
      </ul>
      <a style={{ color: "#334155", textDecoration: "none" }} href="#">Contact</a>
    </nav>
  </div>
);`,
        vue: `const App = {
  template: '<div style="margin:0;font-family:Inter,sans-serif;color:#0f172a"><nav style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #e2e8f0"><strong>Minimal</strong><ul style="display:flex;gap:14px;list-style:none;margin:0;padding:0"><li><a href="#" style="color:#334155;text-decoration:none">Home</a></li><li><a href="#" style="color:#334155;text-decoration:none">Work</a></li><li><a href="#" style="color:#334155;text-decoration:none">About</a></li></ul><a href="#" style="color:#334155;text-decoration:none">Contact</a></nav></div>'
};`,
        next: `const Page = () => (
  <div style={{ margin: 0, fontFamily: "Inter, sans-serif", color: "#0f172a" }}>
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #e2e8f0" }}>
      <strong>Minimal</strong>
      <ul style={{ display: "flex", gap: 14, listStyle: "none", margin: 0, padding: 0 }}>
        <li><a style={{ color: "#334155", textDecoration: "none" }} href="#">Home</a></li>
        <li><a style={{ color: "#334155", textDecoration: "none" }} href="#">Work</a></li>
        <li><a style={{ color: "#334155", textDecoration: "none" }} href="#">About</a></li>
      </ul>
      <a style={{ color: "#334155", textDecoration: "none" }} href="#">Contact</a>
    </nav>
  </div>
);`,
      },
    },
  ],
  footer: [
    {
      id: "default",
      label: "Standard",
      templates: {
        html: `<!doctype html><html><body style="margin:0;min-height:100vh;display:grid;place-items:end stretch;background:#0f172a;color:#e2e8f0;font-family:Arial,sans-serif;"><footer style="display:flex;justify-content:space-between;padding:20px;border-top:1px solid rgba(125,211,252,.3);background:#0b1220;"><span>MonProjet UI</span><span>Support • Confidentialite • Docs</span></footer></body></html>`,
        react: `const App = () => <div style={{ margin:0,minHeight:"100vh",display:"grid",placeItems:"end stretch",background:"#0f172a",color:"#e2e8f0",fontFamily:"Arial,sans-serif" }}><footer style={{ display:"flex",justifyContent:"space-between",padding:20,borderTop:"1px solid rgba(125,211,252,.3)",background:"#0b1220" }}><span>MonProjet UI</span><span>Support • Confidentialite • Docs</span></footer></div>;`,
        vue: `const App = { template: '<div style="margin:0;min-height:100vh;display:grid;place-items:end stretch;background:#0f172a;color:#e2e8f0;font-family:Arial,sans-serif"><footer style="display:flex;justify-content:space-between;padding:20px;border-top:1px solid rgba(125,211,252,.3);background:#0b1220"><span>MonProjet UI</span><span>Support • Confidentialite • Docs</span></footer></div>' };`,
        next: `const Page = () => <div style={{ margin:0,minHeight:"100vh",display:"grid",placeItems:"end stretch",background:"#0f172a",color:"#e2e8f0",fontFamily:"Arial,sans-serif" }}><footer style={{ display:"flex",justifyContent:"space-between",padding:20,borderTop:"1px solid rgba(125,211,252,.3)",background:"#0b1220" }}><span>MonProjet UI</span><span>Support • Confidentialite • Docs</span></footer></div>;`,
      },
    },
  ],
  accueil: [
    {
      id: "hero",
      label: "Hero",
      templates: {
        html: `<!doctype html><html><body style="margin:0;display:grid;place-items:center;min-height:100vh;background:radial-gradient(circle at top right,#1d4ed8 0,#020617 60%);font-family:Segoe UI,sans-serif;color:#f8fafc;"><section style="text-align:center;padding:24px;"><h1 style="font-size:clamp(30px,7vw,60px);margin:0 0 12px;">Build web UI fast</h1><p style="max-width:700px;color:#cbd5e1;">Choisissez un bloc, modifiez le code et exportez.</p><button style="border:0;border-radius:999px;padding:11px 18px;color:white;background:linear-gradient(100deg,#0ea5e9,#14b8a6)">Commencer</button></section></body></html>`,
        react: `const App = () => <section style={{ margin:0,display:"grid",placeItems:"center",minHeight:"100vh",background:"radial-gradient(circle at top right,#1d4ed8 0,#020617 60%)",fontFamily:"Segoe UI,sans-serif",color:"#f8fafc",textAlign:"center",padding:24 }}><div><h1 style={{ fontSize:"clamp(30px,7vw,60px)", margin:"0 0 12px" }}>Build web UI fast</h1><p style={{ maxWidth:700,color:"#cbd5e1" }}>Choisissez un bloc, modifiez le code et exportez.</p><button style={{ border:0,borderRadius:999,padding:"11px 18px",color:"white",background:"linear-gradient(100deg,#0ea5e9,#14b8a6)" }}>Commencer</button></div></section>;`,
        vue: `const App = { template: '<section style="margin:0;display:grid;place-items:center;min-height:100vh;background:radial-gradient(circle at top right,#1d4ed8 0,#020617 60%);font-family:Segoe UI,sans-serif;color:#f8fafc;text-align:center;padding:24px"><div><h1 style="font-size:clamp(30px,7vw,60px);margin:0 0 12px">Build web UI fast</h1><p style="max-width:700px;color:#cbd5e1">Choisissez un bloc, modifiez le code et exportez.</p><button style="border:0;border-radius:999px;padding:11px 18px;color:white;background:linear-gradient(100deg,#0ea5e9,#14b8a6)">Commencer</button></div></section>' };`,
        next: `const Page = () => <section style={{ margin:0,display:"grid",placeItems:"center",minHeight:"100vh",background:"radial-gradient(circle at top right,#1d4ed8 0,#020617 60%)",fontFamily:"Segoe UI,sans-serif",color:"#f8fafc",textAlign:"center",padding:24 }}><div><h1 style={{ fontSize:"clamp(30px,7vw,60px)", margin:"0 0 12px" }}>Build web UI fast</h1><p style={{ maxWidth:700,color:"#cbd5e1" }}>Choisissez un bloc, modifiez le code et exportez.</p><button style={{ border:0,borderRadius:999,padding:"11px 18px",color:"white",background:"linear-gradient(100deg,#0ea5e9,#14b8a6)" }}>Commencer</button></div></section>;`,
      },
    },
  ],
  login: [
    {
      id: "card",
      label: "Card",
      templates: {
        html: `<!doctype html><html><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(155deg,#0f172a,#020617);font-family:Segoe UI,sans-serif;"><form style="width:min(90vw,340px);padding:22px;border-radius:14px;background:rgba(15,23,42,.8);border:1px solid rgba(125,211,252,.25);"><h2 style="margin-top:0;color:#f8fafc;">Login</h2><input placeholder="Email" style="width:100%;margin-bottom:10px;padding:9px;border-radius:8px;border:1px solid #334155;background:#0b1220;color:#e2e8f0;"><input type="password" placeholder="Password" style="width:100%;margin-bottom:10px;padding:9px;border-radius:8px;border:1px solid #334155;background:#0b1220;color:#e2e8f0;"><button type="button" style="width:100%;padding:10px;border:0;border-radius:999px;background:linear-gradient(100deg,#0ea5e9,#14b8a6);color:white;font-weight:700;">Se connecter</button></form></body></html>`,
        react: `const App = () => <main style={{ margin:0,minHeight:"100vh",display:"grid",placeItems:"center",background:"linear-gradient(155deg,#0f172a,#020617)",fontFamily:"Segoe UI,sans-serif" }}><form style={{ width:"min(90vw,340px)",padding:22,borderRadius:14,background:"rgba(15,23,42,.8)",border:"1px solid rgba(125,211,252,.25)" }}><h2 style={{ marginTop:0,color:"#f8fafc" }}>Login</h2><input placeholder="Email" style={{ width:"100%",marginBottom:10,padding:9,borderRadius:8,border:"1px solid #334155",background:"#0b1220",color:"#e2e8f0" }} /><input type="password" placeholder="Password" style={{ width:"100%",marginBottom:10,padding:9,borderRadius:8,border:"1px solid #334155",background:"#0b1220",color:"#e2e8f0" }} /><button type="button" style={{ width:"100%",padding:10,border:0,borderRadius:999,background:"linear-gradient(100deg,#0ea5e9,#14b8a6)",color:"white",fontWeight:700 }}>Se connecter</button></form></main>;`,
        vue: `const App = { template: '<main style="margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(155deg,#0f172a,#020617);font-family:Segoe UI,sans-serif"><form style="width:min(90vw,340px);padding:22px;border-radius:14px;background:rgba(15,23,42,.8);border:1px solid rgba(125,211,252,.25)"><h2 style="margin-top:0;color:#f8fafc">Login</h2><input placeholder="Email" style="width:100%;margin-bottom:10px;padding:9px;border-radius:8px;border:1px solid #334155;background:#0b1220;color:#e2e8f0"/><input type="password" placeholder="Password" style="width:100%;margin-bottom:10px;padding:9px;border-radius:8px;border:1px solid #334155;background:#0b1220;color:#e2e8f0"/><button type="button" style="width:100%;padding:10px;border:0;border-radius:999px;background:linear-gradient(100deg,#0ea5e9,#14b8a6);color:white;font-weight:700">Se connecter</button></form></main>' };`,
        next: `const Page = () => <main style={{ margin:0,minHeight:"100vh",display:"grid",placeItems:"center",background:"linear-gradient(155deg,#0f172a,#020617)",fontFamily:"Segoe UI,sans-serif" }}><form style={{ width:"min(90vw,340px)",padding:22,borderRadius:14,background:"rgba(15,23,42,.8)",border:"1px solid rgba(125,211,252,.25)" }}><h2 style={{ marginTop:0,color:"#f8fafc" }}>Login</h2><input placeholder="Email" style={{ width:"100%",marginBottom:10,padding:9,borderRadius:8,border:"1px solid #334155",background:"#0b1220",color:"#e2e8f0" }} /><input type="password" placeholder="Password" style={{ width:"100%",marginBottom:10,padding:9,borderRadius:8,border:"1px solid #334155",background:"#0b1220",color:"#e2e8f0" }} /><button type="button" style={{ width:"100%",padding:10,border:0,borderRadius:999,background:"linear-gradient(100deg,#0ea5e9,#14b8a6)",color:"white",fontWeight:700 }}>Se connecter</button></form></main>;`,
      },
    },
  ],
};

const categories = [
  { key: "navbar", label: "Navbar" },
  { key: "footer", label: "Footer" },
  { key: "accueil", label: "Accueil" },
  { key: "login", label: "Login" },
];

const comboKey = (category, styleId, framework) => `${category}::${styleId}::${framework}`;

const getStyleOptions = (category) => templateCatalog[category] || [];

const getTemplateCode = (category, styleId, framework) => {
  const options = getStyleOptions(category);
  const style = options.find((item) => item.id === styleId) || options[0];
  return style?.templates?.[framework] || "";
};

const getInitialStyle = (category) => getStyleOptions(category)[0]?.id || "";

const buildPreviewDoc = (framework, code) => {
  if (framework === "html") return code;

  if (framework === "vue") {
    return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body style="margin:0">
  <div id="app"></div>
  <script>
    try {
      ${code}
      Vue.createApp(App).mount('#app');
    } catch (e) {
      document.body.innerHTML = '<pre style="padding:12px;color:#dc2626;font-family:monospace">Erreur Vue: ' + (e && e.message ? e.message : e) + '</pre>';
    }
  </script>
</body>
</html>`;
  }

  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body style="margin:0">
  <div id="root"></div>
  <script type="text/babel">
    try {
      ${code}
      const RootComponent = typeof App !== "undefined" ? App : (typeof Page !== "undefined" ? Page : null);
      if (!RootComponent) throw new Error("Component introuvable. Definis App ou Page.");
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<RootComponent />);
    } catch (e) {
      document.body.innerHTML = '<pre style="padding:12px;color:#dc2626;font-family:monospace">Erreur JSX: ' + (e && e.message ? e.message : e) + '</pre>';
    }
  </script>
</body>
</html>`;
};

const formatHtml = (input) => {
  const lines = input
    .replace(/>\s+</g, ">\n<")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let indent = 0;
  const formatted = lines.map((line) => {
    const isClosing = /^<\//.test(line);
    const isOpeningTag = /^<[^!/][^>]*[^/]?>$/.test(line);
    const isVoidTag = /^<[^>]+\/>$/.test(line) || /^<(meta|img|input|br|hr|link)/.test(line);
    const currentIndent = isClosing ? Math.max(indent - 1, 0) : indent;
    const padded = `${"  ".repeat(currentIndent)}${line}`;
    if (isClosing) {
      indent = Math.max(indent - 1, 0);
    } else if (isOpeningTag && !isVoidTag && !line.includes("</")) {
      indent += 1;
    }
    return padded;
  });

  return formatted.join("\n");
};

const formatJsLike = (input) => {
  const prepared = input
    .replace(/;\s*(?=[^\n])/g, ";\n")
    .replace(/{\s*(?=[^\n])/g, "{\n")
    .replace(/}\s*(?=[^\n])/g, "}\n");
  const lines = prepared.split("\n");
  let indent = 0;
  const result = [];

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      result.push("");
      return;
    }
    const startsWithClose = /^[}\])]/.test(line);
    if (startsWithClose) indent = Math.max(indent - 1, 0);
    result.push(`${"  ".repeat(indent)}${line}`);
    const opens = (line.match(/{/g) || []).length;
    const closes = (line.match(/}/g) || []).length;
    indent = Math.max(indent + opens - closes, 0);
  });

  return result.join("\n");
};

const formatCodeByFramework = (framework, input) => {
  if (framework === "html") return formatHtml(input);
  return formatJsLike(input);
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const applyThemeToSnippet = (snippet, preset) => {
  if (!snippet || !preset) return snippet;
  const [from, to] = preset.gradient;
  const replacements = [
    ["#0ea5e9", from],
    ["#14b8a6", to],
    ["#67e8f9", preset.accent],
    ["#7dd3fc", preset.accent],
    ["#020617", preset.bg],
    ["#0f172a", preset.bgSoft],
    ["#0b1220", preset.bgSoft],
    ["#1d4ed8", preset.bgStrong],
  ];

  let themed = snippet.replace(
    /linear-gradient\((?:100|60|35|155)deg,\s*[^,]+,\s*[^)]+\)/g,
    `linear-gradient(100deg, ${from}, ${to})`
  );

  replacements.forEach(([search, value]) => {
    themed = themed.replace(new RegExp(escapeRegExp(search), "gi"), value);
  });

  return themed;
};

const parseTitleFallback = (title = "") => {
  const parts = title.split("•").map((item) => item.trim());
  return {
    category: parts[0] || "navbar",
    styleId: parts[1] || "aurora",
    framework: parts[2] || "html",
  };
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [category, setCategory] = React.useState("navbar");
  const [styleId, setStyleId] = React.useState(getInitialStyle("navbar"));
  const [framework, setFramework] = React.useState("html");
  const [code, setCode] = React.useState(getTemplateCode("navbar", getInitialStyle("navbar"), "html"));
  const [customCodes, setCustomCodes] = React.useState({});
  const [profileAnchor, setProfileAnchor] = React.useState(null);
  const [categoryAnchor, setCategoryAnchor] = React.useState(null);
  const [copyLabel, setCopyLabel] = React.useState("Copier");
  const [previewMode, setPreviewMode] = React.useState("desktop");
  const [savedWorks, setSavedWorks] = React.useState([]);
  const [savedPanelOpen, setSavedPanelOpen] = React.useState(false);
  const [saveLabel, setSaveLabel] = React.useState("Sauvegarder");
  const [themeKey, setThemeKey] = React.useState("ocean");

  React.useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;

      if (!data.user) {
        navigate("/login");
        return;
      }
      setUser(data.user);
    };

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  React.useEffect(() => {
    const raw = window.localStorage.getItem(LOCAL_SAVED_WORKS_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setSavedWorks(parsed);
    } catch {
      // Ignore malformed local data
    }
  }, []);

  React.useEffect(() => {
    const loadCloudWorks = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from("projects")
        .select("id,name,content,framework,category,updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(30);

      if (error || !Array.isArray(data)) return;

      const cloudWorks = data.map((row) => {
        const fallback = parseTitleFallback(row.name || "");
        return {
          id: `cloud-${row.id}`,
          title: row.name || `${fallback.category} • ${fallback.styleId} • ${fallback.framework}`,
          category: row.category || fallback.category,
          styleId: fallback.styleId,
          framework: row.framework || fallback.framework,
          code: row.content || "",
          updatedAt: row.updated_at || new Date().toISOString(),
        };
      });

      setSavedWorks((prev) => {
        const merged = [...cloudWorks, ...prev];
        const unique = [];
        const seen = new Set();
        for (const item of merged) {
          const key = `${item.title}-${item.updatedAt}`;
          if (seen.has(key)) continue;
          seen.add(key);
          unique.push(item);
        }
        return unique.slice(0, 30);
      });
    };

    loadCloudWorks();
  }, [user?.id]);

  React.useEffect(() => {
    if (!getStyleOptions(category).some((item) => item.id === styleId)) {
      setStyleId(getInitialStyle(category));
    }
  }, [category, styleId]);

  React.useEffect(() => {
    const key = comboKey(category, styleId, framework);
    const saved = customCodes[key];
    const base = getTemplateCode(category, styleId, framework);
    const nextCode = saved ?? base;
    setCode(formatCodeByFramework(framework, nextCode));
  }, [category, styleId, framework, customCodes]);

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.user_metadata?.photo_url ||
    "";

  const previewDoc = React.useMemo(() => buildPreviewDoc(framework, code), [framework, code]);
  const previewWidth = previewModes.find((item) => item.key === previewMode)?.width || "100%";
  const currentTheme = themePresets.find((item) => item.key === themeKey) || themePresets[0];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleCodeChange = (nextCode) => {
    setCode(nextCode);
    const key = comboKey(category, styleId, framework);
    setCustomCodes((prev) => ({ ...prev, [key]: nextCode }));
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopyLabel("Copie");
    window.setTimeout(() => setCopyLabel("Copier"), 1500);
  };

  const handleDownloadZip = () => {
    const ext = framework === "html" ? "html" : "txt";
    const fileName = `${category}-${styleId}-${framework}.${ext}`;
    const zipped = zipSync({ [fileName]: strToU8(code) });
    const blob = new Blob([zipped], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${category}-${styleId}-${framework}.zip`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFormatCode = () => {
    handleCodeChange(formatCodeByFramework(framework, code));
  };

  const handleApplyTheme = (nextThemeKey) => {
    const preset = themePresets.find((item) => item.key === nextThemeKey);
    if (!preset) return;
    setThemeKey(nextThemeKey);
    handleCodeChange(applyThemeToSnippet(code, preset));
  };

  const handleSaveCurrentWork = async () => {
    const entry = {
      id: `${Date.now()}`,
      title: `${category} • ${styleId} • ${framework}`,
      category,
      styleId,
      framework,
      code,
      updatedAt: new Date().toISOString(),
    };
    const nextWorks = [entry, ...savedWorks.filter((item) => item.id !== entry.id)].slice(0, 30);
    setSavedWorks(nextWorks);
    window.localStorage.setItem(LOCAL_SAVED_WORKS_KEY, JSON.stringify(nextWorks));

    if (user?.id) {
      const { data, error } = await supabase
        .from("projects")
        .insert({
        user_id: user.id,
        name: entry.title,
        content: entry.code,
        framework: entry.framework,
        category: entry.category,
      })
        .select("id,updated_at")
        .single();

      if (!error && data?.id) {
        const cloudEntry = {
          ...entry,
          id: `cloud-${data.id}`,
          updatedAt: data.updated_at || entry.updatedAt,
        };
        setSavedWorks((prev) => [cloudEntry, ...prev].slice(0, 30));
      }
    }

    setSaveLabel("Sauvegarde");
    window.setTimeout(() => setSaveLabel("Sauvegarder"), 1500);
  };

  const handleLoadSavedWork = (item) => {
    setCategory(item.category);
    setStyleId(item.styleId);
    setFramework(item.framework);
    const key = comboKey(item.category, item.styleId, item.framework);
    setCustomCodes((prev) => ({ ...prev, [key]: item.code }));
    setCode(formatCodeByFramework(item.framework, item.code));
    setSavedPanelOpen(false);
  };

  const handleDeleteSavedWork = (id) => {
    const next = savedWorks.filter((item) => item.id !== id);
    setSavedWorks(next);
    window.localStorage.setItem(LOCAL_SAVED_WORKS_KEY, JSON.stringify(next));
  };

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(125, 211, 252, 0.22)",
          backdropFilter: "blur(12px)",
          background: "rgba(2, 6, 23, 0.68)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "72px !important" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Avatar src="/logo-diana.png" sx={{ width: 36, height: 36 }} />
            <Typography fontWeight={800}>Builder IDE</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={avatar}
              onClick={(e) => setProfileAnchor(e.currentTarget)}
              sx={{ width: 38, height: 38, cursor: "pointer", border: "1px solid rgba(125, 211, 252, 0.4)" }}
            />
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              PaperProps={{
                sx: {
                  mt: 1,
                  border: "1px solid rgba(125, 211, 252, 0.2)",
                  background: "rgba(2, 6, 23, 0.9)",
                  color: "#e2e8f0",
                },
              }}
            >
              <MenuItem disabled sx={{ opacity: 1 }}>
                <ListItemText
                  primary={user?.user_metadata?.full_name || "Profil"}
                  secondary={user?.email || ""}
                  primaryTypographyProps={{ sx: { color: "#f8fafc", fontWeight: 700 } }}
                  secondaryTypographyProps={{ sx: { color: "#94a3b8", fontSize: 12 } }}
                />
              </MenuItem>
              <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.2)" }} />
              <MenuItem
                onClick={() => {
                  setProfileAnchor(null);
                  setSavedPanelOpen(true);
                }}
              >
                <ListItemIcon sx={{ color: "#7dd3fc" }}>
                  <FolderRoundedIcon fontSize="small" />
                </ListItemIcon>
                Travaux sauvegardes
              </MenuItem>
              <MenuItem onClick={() => setProfileAnchor(null)}>
                <ListItemIcon sx={{ color: "#7dd3fc" }}>
                  <HistoryRoundedIcon fontSize="small" />
                </ListItemIcon>
                Historique de versions
              </MenuItem>
              <MenuItem onClick={() => setProfileAnchor(null)}>
                <ListItemIcon sx={{ color: "#7dd3fc" }}>
                  <SettingsRoundedIcon fontSize="small" />
                </ListItemIcon>
                Parametres
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon sx={{ color: "#fca5a5" }}>
                  <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                Deconnexion
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: "88px", px: { xs: 2, md: 3 }, pb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1, mb: 1.2 }}>
          {categories.map((item) => (
            <Chip
              key={item.key}
              label={item.label}
              onClick={(event) => {
                setCategory(item.key);
                setCategoryAnchor(event.currentTarget);
              }}
              sx={{
                borderRadius: 999,
                color: category === item.key ? "#082f49" : "#dbeafe",
                background:
                  category === item.key
                    ? "linear-gradient(100deg, #67e8f9, #2dd4bf)"
                    : "rgba(15, 23, 42, 0.78)",
                border: "1px solid rgba(125, 211, 252, 0.28)",
              }}
            />
          ))}
        </Box>

        <Menu
          anchorEl={categoryAnchor}
          open={Boolean(categoryAnchor)}
          onClose={() => setCategoryAnchor(null)}
          PaperProps={{
            sx: {
              mt: 1,
              p: 1.2,
              minWidth: { xs: 300, sm: 430 },
              border: "1px solid rgba(125, 211, 252, 0.2)",
              background: "rgba(2, 6, 23, 0.94)",
              color: "#e2e8f0",
            },
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#9fb4cc", mb: 0.8 }}>Styles • {category}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.2 }}>
            {getStyleOptions(category).map((item) => (
              <Chip
                key={item.id}
                label={item.label}
                onClick={() => setStyleId(item.id)}
                sx={{
                  borderRadius: 999,
                  color: styleId === item.id ? "#082f49" : "#dbeafe",
                  background:
                    styleId === item.id
                      ? "linear-gradient(100deg, #a7f3d0, #67e8f9)"
                      : "rgba(15, 23, 42, 0.78)",
                  border: "1px solid rgba(125, 211, 252, 0.28)",
                }}
              />
            ))}
          </Box>

          <Typography sx={{ fontSize: 12, color: "#9fb4cc", mb: 0.8 }}>Framework</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.2 }}>
            {frameworks.map((item) => (
              <Chip
                key={item.key}
                label={item.label}
                onClick={() => setFramework(item.key)}
                sx={{
                  borderRadius: 999,
                  color: framework === item.key ? "#082f49" : "#dbeafe",
                  background:
                    framework === item.key
                      ? "linear-gradient(100deg, #93c5fd, #67e8f9)"
                      : "rgba(15, 23, 42, 0.78)",
                  border: "1px solid rgba(125, 211, 252, 0.28)",
                }}
              />
            ))}
          </Box>

          <Typography sx={{ fontSize: 12, color: "#9fb4cc", mb: 0.8 }}>Couleurs / gradients</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
            {themePresets.map((preset) => (
              <Chip
                key={preset.key}
                label={preset.label}
                onClick={() => handleApplyTheme(preset.key)}
                sx={{
                  borderRadius: 999,
                  color: themeKey === preset.key ? "#082f49" : "#dbeafe",
                  background:
                    themeKey === preset.key
                      ? `linear-gradient(100deg, ${preset.gradient[0]}, ${preset.gradient[1]})`
                      : "rgba(15, 23, 42, 0.78)",
                  border: "1px solid rgba(125, 211, 252, 0.28)",
                }}
              />
            ))}
          </Box>
        </Menu>

        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {previewModes.map((item) => (
            <Chip
              key={item.key}
              icon={item.icon}
              label={item.label}
              onClick={() => setPreviewMode(item.key)}
              sx={{
                borderRadius: 999,
                color: previewMode === item.key ? "#082f49" : "#dbeafe",
                background:
                  previewMode === item.key
                    ? "linear-gradient(100deg, #bfdbfe, #67e8f9)"
                    : "rgba(15, 23, 42, 0.78)",
                border: "1px solid rgba(125, 211, 252, 0.28)",
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
          <Paper
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(125, 211, 252, 0.24)",
              background: "rgba(15, 23, 42, 0.62)",
              minHeight: { xs: 360, lg: "calc(100dvh - 230px)" },
            }}
          >
            <Box sx={{ px: 2, py: 1.2, borderBottom: "1px solid rgba(125, 211, 252, 0.2)" }}>
              <Typography fontWeight={700}>Rendu Live ({framework})</Typography>
            </Box>
            <Box sx={{ height: { xs: 320, lg: "calc(100% - 49px)" }, p: 1.2, display: "grid", placeItems: "center" }}>
              <Box
                sx={{
                  width: previewWidth,
                  height: "100%",
                  maxWidth: "100%",
                  borderRadius: previewMode === "desktop" ? 1 : 3,
                  overflow: "hidden",
                  border: previewMode === "desktop" ? "none" : "1px solid rgba(125, 211, 252, 0.32)",
                  boxShadow: previewMode === "desktop" ? "none" : "0 12px 26px rgba(2, 6, 23, 0.48)",
                  transition: "all .2s ease",
                }}
              >
                <iframe
                  title="preview"
                  srcDoc={previewDoc}
                  sandbox="allow-scripts allow-modals"
                  style={{ width: "100%", height: "100%", border: 0, background: "white" }}
                />
              </Box>
            </Box>
          </Paper>

          <Paper
            sx={{
              borderRadius: 3,
              border: "1px solid rgba(125, 211, 252, 0.24)",
              background: "rgba(15, 23, 42, 0.62)",
              minHeight: { xs: 420, lg: "calc(100dvh - 230px)" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.2,
                borderBottom: "1px solid rgba(125, 211, 252, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography fontWeight={700}>Code editable</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  onClick={handleCopyCode}
                  sx={{ borderRadius: 999, color: "#dbeafe", border: "1px solid rgba(125, 211, 252, 0.35)" }}
                >
                  {copyLabel}
                </Button>
                <Button
                  size="small"
                  onClick={handleFormatCode}
                  sx={{ borderRadius: 999, color: "#dbeafe", border: "1px solid rgba(125, 211, 252, 0.35)" }}
                >
                  Formater
                </Button>
                <Button
                  size="small"
                  onClick={handleSaveCurrentWork}
                  sx={{
                    borderRadius: 999,
                    color: "#dbeafe",
                    border: "1px solid rgba(125, 211, 252, 0.35)",
                  }}
                >
                  {saveLabel}
                </Button>
                <Button
                  size="small"
                  onClick={handleDownloadZip}
                  sx={{
                    borderRadius: 999,
                    color: "white",
                    background: `linear-gradient(100deg, ${currentTheme.gradient[0]}, ${currentTheme.gradient[1]})`,
                  }}
                >
                  Export .zip
                </Button>
              </Box>
            </Box>
            <TextField
              multiline
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  p: 2,
                  color: "#e2e8f0",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 13,
                  alignItems: "flex-start",
                  height: { xs: 360, lg: "calc(100dvh - 280px)" },
                  overflow: "auto",
                },
              }}
            />
          </Paper>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={savedPanelOpen}
        onClose={() => setSavedPanelOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            background: "rgba(2, 6, 23, 0.96)",
            color: "#e2e8f0",
            borderLeft: "1px solid rgba(125, 211, 252, 0.22)",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography fontWeight={800}>Travaux sauvegardes</Typography>
          <Button size="small" onClick={() => setSavedPanelOpen(false)} sx={{ color: "#7dd3fc" }}>
            Fermer
          </Button>
        </Box>
        <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.18)" }} />
        <List sx={{ p: 1 }}>
          {savedWorks.length === 0 && (
            <Typography sx={{ px: 1.2, py: 2, color: "#94a3b8", fontSize: 14 }}>
              Aucun travail sauvegarde pour le moment.
            </Typography>
          )}
          {savedWorks.map((item) => (
            <ListItemButton
              key={item.id}
              onClick={() => handleLoadSavedWork(item)}
              sx={{
                mb: 0.7,
                borderRadius: 2,
                border: "1px solid rgba(125, 211, 252, 0.2)",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 1 }}>
                <Box>
                  <Typography fontSize={14} fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#94a3b8", fontSize: 12 }}>
                    {new Date(item.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteSavedWork(item.id);
                  }}
                  sx={{ minWidth: 0, p: 0.5, color: "#fca5a5" }}
                >
                  <DeleteRoundedIcon fontSize="small" />
                </Button>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
