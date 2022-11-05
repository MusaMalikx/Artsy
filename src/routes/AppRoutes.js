import { Route, Routes } from "react-router-dom";
// import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
// import OurTeam from "../pages/OurTeam/OurTeam";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        {/* <Route path="contact" element={<Contact />} />
        <Route path="our-team" element={<OurTeam />}/> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;