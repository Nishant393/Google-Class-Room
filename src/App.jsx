
import "./globals.css";
import { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy imports
const SignIn = lazy(() => import("./Auth/InputPages/SignIn"));
const Home = lazy(() => import("./root/Pages/Home"));
const Root = lazy(() => import("./root/Root"));
const Auth = lazy(() => import("./Auth/Auth"));
const SignUp = lazy(() => import("./Auth/InputPages/SignUp"));
const Class = lazy(() => import("./root/Pages/Class"));
const Classwork = lazy(() => import("./root/Pages/Classwork"));
const Pepole = lazy(() => import("./root/Pages/Pepole"));
const Stream = lazy(() => import("./root/Pages/Stream"));
const NotFound = lazy(() => import("./root/Pages/NotFound"));

const App = () => {
  const [load, setLoad] = useState(false);

  return (
    <>
      <main className="h-screen flex">
        {/* Suspense provides a fallback UI while the lazy components are loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Root />}>
              <Route index element={<Home />} />
              <Route path="/c/:id" element={<Class />}>
                <Route index element={<Stream />} />
                <Route path="pepole" element={<Pepole />} />
                <Route path="t" element={<Classwork />} />
              </Route>
            </Route>
            <Route element={<Auth />}>
              <Route element={<SignIn />} path="/sign-in" />
              <Route element={<SignUp />} path="/sign-up" />
            </Route>
            <Route path="*" element={<NotFound/>} /> 
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default App;
