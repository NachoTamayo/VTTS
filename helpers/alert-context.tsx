import React, { createContext, useState, ReactNode } from "react";

// Definir los tipos para la alerta y el contexto
type AlertType = "info" | "success" | "warning" | "error";

interface Alert {
  message: string;
  type: AlertType;
}

interface AlertContextType {
  alert: Alert | null;
  showAlert: (message: string, type?: AlertType) => void;
  hideAlert: () => void;
}

// Crear el contexto con un valor predeterminado
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Definir los props para el Provider
interface AlertProviderProps {
  children: ReactNode;
}

// Crear el Provider
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  // Función para mostrar una alerta
  const showAlert = (message: string, type: AlertType = "info") => {
    setAlert({ message, type });
  };

  // Función para ocultar la alerta
  const hideAlert = () => {
    setAlert(null);
  };

  return <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>{children}</AlertContext.Provider>;
};

// Custom hook para usar el contexto
export const useAlert = (): AlertContextType => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export default AlertContext;
