// import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { AppWrapper } from "./components/common/PageMeta";
// import { TrustedFormProvider } from "./components/common/TrustedFormProvider";

// // --------------------------------------------------
// // Render App
// // --------------------------------------------------
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <TrustedFormProvider>
//       <AppWrapper>
//         <App />
//       </AppWrapper>
//     </TrustedFormProvider>
//   </StrictMode>
// );

// import React, { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
// import { BrowserRouter } from "react-router-dom"
// import "./index.css"
// import App from "./App"
// import { AppWrapper } from "./components/common/PageMeta"
// import { TrustedFormProvider } from "./components/common/TrustedFormProvider"

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <TrustedFormProvider>
//         <AppWrapper>
//           <App />
//         </AppWrapper>
//       </TrustedFormProvider>
//     </BrowserRouter>
//   </StrictMode>
// )
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { AppWrapper } from "./components/common/PageMeta"
import { TrustedFormProvider } from "./components/common/TrustedFormProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TrustedFormProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </TrustedFormProvider>
    </BrowserRouter>
  </StrictMode>
)
