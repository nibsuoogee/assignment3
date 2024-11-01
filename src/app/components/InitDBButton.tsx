"use client";

import { Button } from "@mui/joy";
import { useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

export default function InitDBButton() {
  const { showSnackbar } = useSnackbar();
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("/api/init-db", { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Failed to initialize database");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
    showSnackbar(message);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        size="md"
        variant={"outlined"}
        color="neutral"
      >
        Initialize databases
      </Button>
    </div>
  );
}
