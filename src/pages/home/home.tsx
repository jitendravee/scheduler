import { Calender } from "./components/Calender";
import { NavBar } from "./components/NavBar";

const Home = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <Calender />
    </div>
  );
};

export default Home;
