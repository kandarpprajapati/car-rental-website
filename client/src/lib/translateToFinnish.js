import translate from "google-translate-api-x";

/**
 * Translate the string values of a product to Finnish language
 * @param {Array<Object>} products - The array of product objects
 * @returns {Promise<Array<Object>>} - A new array of products with translated values
 */
export default async function translateToFinnish(products) {
  const translatedProducts = await Promise.all(
    products.map(async (product) => {
      const translatedProduct = { ...product };

      for (const key in product) {
        // Skip translation for specific keys or non-string values
        if (key === "_id" || typeof product[key] !== "string") {
          continue;
        }

        try {
          const translatedText = await translate(product[key], { to: "fi" });
          translatedProduct[key] = translatedText.text;
        } catch (error) {
          console.error(`Error translating value for ${key}:`, error);
          translatedProduct[key] = product[key]; // Fallback to original value
        }
      }

      // Translate pricePerHour array if it exists
      if (Array.isArray(product.pricePerHour)) {
        translatedProduct.pricePerHour = await Promise.all(
          product.pricePerHour.map(async (price) => {
            const translatedPrice = { ...price };

            for (const key in price) {
              // Skip keys like `_id` or non-string values
              if (key === "_id" || typeof price[key] !== "string") {
                continue;
              }

              try {
                const translatedText = await translate(price[key], {
                  to: "fi",
                });
                translatedPrice[key] = translatedText.text;
              } catch (error) {
                console.error(
                  `Error translating value for pricePerHour[${key}]:`,
                  error
                );
                translatedPrice[key] = price[key]; // Fallback to original value
              }
            }

            return translatedPrice;
          })
        );
      }

      return translatedProduct;
    })
  );

  return translatedProducts;
}
