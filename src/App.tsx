// import { Routes, Route } from "react-router-dom"
import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import ScrollToTop from "@/components/common/ScrollToTop"
import { Toaster } from "@/components/ui/toaster"
import routes from "./routes"

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  )
}

export default App

