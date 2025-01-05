// translateLib.js
import translate from "google-translate-api-x";

/**
 * Translate the string properties of a product to Finnish language
 * @param {Array<Object>} products - The array of product objects
 * @returns {Promise<Array<Object>>} - A new array of products with translated values
 */
export default async function translateToFinnish(products) {
  const translatedProducts = await Promise.all(
    products.map(async (product) => {
      const translatedProduct = { ...product };

      // Translate string fields for each product
      for (const key in product) {
        if (typeof product[key] === "string") {
          try {
            // Using google-translate-api-x to translate the string to Finnish
            const translatedText = await translate(product[key], { to: "fi" });
            translatedProduct[key] = translatedText.text;
          } catch (error) {
            console.error(`Error translating ${key}:`, error);
            translatedProduct[key] = product[key]; // In case of an error, use the original value
          }
        }
      }

      // Translate pricePerHour array
      if (Array.isArray(product.pricePerHour)) {
        translatedProduct.pricePerHour = await Promise.all(
          product.pricePerHour.map(async (price) => {
            const translatedPrice = { ...price };

            // Translate fields in pricePerHour
            for (const key in price) {
              if (typeof price[key] === "string") {
                try {
                  const translatedText = await translate(price[key], {
                    to: "fi",
                  });
                  translatedPrice[key] = translatedText.text;
                } catch (error) {
                  console.error(`Error translating ${key}:`, error);
                  translatedPrice[key] = price[key]; // In case of an error, use the original value
                }
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
