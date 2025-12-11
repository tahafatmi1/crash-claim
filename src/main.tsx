import React, { StrictMode, useEffect, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";

// --------------------------------------------------
// TrustedForm Wrapper Component
// --------------------------------------------------
function TrustedFormWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("trustedform-script")) return;

    const tf = document.createElement("script");
    tf.id = "trustedform-script";
    tf.type = "text/javascript";
    tf.async = true;
    tf.src =
      (document.location.protocol === "https:" ? "https" : "http") +
      "://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=" +
      new Date().getTime() +
      Math.random();
    document.head.appendChild(tf);

    // Cleanup on unmount
    return () => {
      if (tf.parentNode) tf.parentNode.removeChild(tf);
    };
  }, []);

  return <>{children}</>;
}

// --------------------------------------------------
// Render App
// --------------------------------------------------
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrustedFormWrapper>
      <AppWrapper>
        <App />
      </AppWrapper>
    </TrustedFormWrapper>
  </StrictMode>
);
