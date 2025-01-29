import Card from "../../globals/components/card/Card";
import Hero from "./components/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">
          Top Products
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default Home;
