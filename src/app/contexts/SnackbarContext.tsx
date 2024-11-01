// src/contexts/SnackbarContext.tsx
"use client"; // <-- Add this line at the top

import { Snackbar } from "@mui/joy";
import { createContext, useContext, useState, ReactNode } from "react";

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
  };

  const handleClose = () => {
    setSnackbar({ open: false, message: "" });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        variant="outlined"
        open={snackbar.open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        {snackbar.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
