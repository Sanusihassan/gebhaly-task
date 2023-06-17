"use client";
import Navbar from "./NavBar";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Fade from '@mui/material/Fade';

const Loader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    }
  }, []);
  return (
    <div
      style={{
        paddingTop: 64,
      }}
    >
      <Navbar />
      <Fade in={mounted} unmountOnExit>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "85vh",
            maxHeight: "100%",
            width: "100%",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      </Fade>
    </div>
  );
};

export default Loader;
