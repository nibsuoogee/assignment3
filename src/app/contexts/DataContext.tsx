"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DataContextType = {
  setDataRows: (rows: Array<Record<string, any>>) => void;
  dataRows: Array<Record<string, any>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dataRows, setRows] = useState<Array<Record<string, any>>>([]);

  const setDataRows = (rows: Array<Record<string, any>>) => {
    setRows(rows);
  };

  return (
    <DataContext.Provider value={{ setDataRows, dataRows }}>
      {children}
    </DataContext.Provider>
  );
};
