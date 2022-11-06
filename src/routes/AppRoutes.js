import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import API from "../utils/unsplash";

const AppRoutes = () => {

  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    API.search
      .getPhotos({ query: "art" })
      .then(res => {
        setPhotosResponse(res.response.results);
        // console.log(res.response.results)
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home data={data} />} />
        {/* <Route path="contact" element={<Contact />} />
        <Route path="our-team" element={<OurTeam />}/> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;