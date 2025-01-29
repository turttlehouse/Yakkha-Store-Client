import React from "react";
import Card from "../../globals/components/card/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Hero from "./components/Hero";
import { fetchProducts } from "../../store/productSlice";

const Home = () => {
  const dipatch = useAppDispatch();
  //state ma whole store airahunxa so tya bata pani products matra nikalna ko lagi accessing productsliec using products key from store
  const {product} = useAppSelector((state) => state.products);

  React.useEffect(() => {
    dipatch(fetchProducts());
  }, []);

  return (
    <>
      <Hero />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">
          Top Products
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
        {
          product?.length > 0 && product.map((pd)=>{
            return(
              <Card key={pd.id} data={pd} />
            )
          })
        }
          
        </div>
      </div>
    </>
  );
};

export default Home;
