"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DataWindowType } from "../../types";

type DataContextType = {
  setDataRows: (window: DataWindowType) => void;
  clearDataRows: () => void;
  dataRows: Array<DataWindowType>;
  assignmentChecked: boolean;
  setAssignmentChecked: (checked: boolean) => void;
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
  const [dataRows, setRows] = useState<Array<DataWindowType>>([]);
  const [assignmentChecked, setChecked] = useState<boolean>(false);
  const setAssignmentChecked = (checked: boolean) => {
    setChecked(checked);
  };

  const setDataRows = (window: DataWindowType) => {
    setRows((prevRows) => prevRows.concat(window));
  };

  const clearDataRows = () => {
    setRows([]);
  };

  return (
    <DataContext.Provider
      value={{
        setDataRows,
        clearDataRows,
        dataRows,
        assignmentChecked,
        setAssignmentChecked,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
