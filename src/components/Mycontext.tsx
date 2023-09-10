import React, { createContext, useContext, useState, ReactNode } from "react";

interface MyContextProps {
  children: ReactNode;
}

interface MyContextValue {
  status: number;
  id: number;
  name: string;
  authorized: () => void;
  unAuthorized: () => void;
  updateId: (IdConnect: number) => void;
}

const MyContext = createContext<MyContextValue | undefined>(undefined);

export const MyContextProvider: React.FC<MyContextProps> = ({ children }) => {
  const [status, setStatus] = useState(0);
  const [id, setId] = useState(0);
  const [name, setName] = useState("0");

  const authorized = () => {
    setStatus(1);
  };

  const unAuthorized = () => {
    setStatus(0);
  };

  const updateId = (IdConnect: number) => {
    setId(IdConnect);
  };

  const contextValue: MyContextValue = {
    status,
    id,
    name,
    authorized,
    unAuthorized,
    updateId,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};
