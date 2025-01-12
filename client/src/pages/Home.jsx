import { MapPinned } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import CarImage from "../../public/car-images/van.png";
import { useGetProducts } from "../hooks/products/useGetProducts.js";
import useProductStore from "../store/productStore.js";
import CarDetailsDialog from "./homepage/CarDetailsDialog.jsx";
import ExportBookingsButton from "../components/ExportTodaysBooking.jsx";
import translateToFinnish from "../lib/translateToFinnish.js";
import { Trans, useTranslation } from "react-i18next";

const Home = () => {
  const { products, setProducts } = useProductStore();
  const [translatedProducts, setTranslatedProducts] = useState([]);

  const { data, isLoading, isFetching, error } = useGetProducts();
  const { t, i18n } = useTranslation();

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);

      // Translate products to Finnish
      translateToFinnish(data.products).then((translatedData) => {
        setTranslatedProducts(translatedData); // Set the translated products
        console.log(translatedData);
      });
    }
  }, [data, setProducts]);

  return (
    <div className="max-w-screen-2xl mx-auto px-3 lg:px-2 xl:px-0">
      <ExportBookingsButton />
      <div className="relative rounded-3xl md:rounded-[100px] shadow-md overflow-hidden mt-8 flex justify-center items-center lg:mx-auto bg-radial-gradient">
        {/* Image Section */}
        <img
          src={CarImage} // Replace with your car image
          alt="Car"
          className="w-full object-cover max-h-[800px] max-w-5xl"
        />
      </div>

      {/* Content Section */}
      <section className="bg-background py-12">
        <div className="text-center text-white mb-8">
          <MapPinned className="text-secondary mx-auto mb-4" size={50} />
          <h2 className="text-2xl font-bold uppercase tracking-wide text-secondary-foreground">
            Helsinki
          </h2>
          <p className="mt-2 text-primary-foreground text-4xl uppercase tracking-widest">
            <Trans i18nKey="contentDescription" ns="translation">
              The most beautiful <br />thing in the world.
              {t("contentDescription", { ns: "translation" })}
            </Trans>
          </p>
        </div>
        <div className="mx-auto p-6 md:p-14 bg-primary-foreground rounded-2xl md:rounded-[50px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && <p>t</p>}
            {error && <Trans i18nKey="errorFetchingProducts" ns="translation"><p>Error fetching products: {{ errorMsg: error.message }}</p></Trans>}
            {!loading && translatedProducts.length > 0 ? (
              translatedProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition duration-300 ease-in-out p-4"
                >
                  <div className="bg-gray flex justify-center rounded-lg">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    {/* Product Category */}
                    <p className="text-sm text-gray my-2">{product.category}</p>
                    <h3 className="text-primary-foreground text-lg font-semibold mb-20 uppercase">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary text-lg font-bold">
                        {product.pricePerHour.length > 0 && (
                          <p>
                            {product.pricePerHour[0].discountPrice} € /{" "}
                            <sup>hr</sup>
                          </p>
                        )}
                      </span>
                      <CarDetailsDialog product={product} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white font-semibold text-lg">
                {t("noProducts", { ns: "translation" })}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
