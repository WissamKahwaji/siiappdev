import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./layouts/header";
import { useEffect } from "react";
import Footer from "./layouts/footer";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Navbar />

      <main className="mt-[43px] sm:mt-[53px] md:mt-[56px] lg:mt-[56px] xl:mt-[67px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
