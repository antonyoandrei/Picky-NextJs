import { Toaster } from "react-hot-toast";

const ToasterComponent = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        error: {
          iconTheme: {
            primary: "var(--secondary)",
            secondary: "var(--primary)",
          },
          style: {
            background: "var(--primary)",
            color: "var(--secondary)",
          },
        },
        success: {
          iconTheme: {
            primary: "var(--secondary)",
            secondary: "var(--primary)",
          },
          style: {
            background: "var(--primary)",
            color: "var(--secondary)",
          },
        },
      }}
    />
  );
};

export default ToasterComponent;
