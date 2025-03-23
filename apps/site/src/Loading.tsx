import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <span style={{ fontSize: "1.5rem", color: "#6c757d" }}>Loading...</span>
    </div>
  );
};

export default LoadingScreen;
