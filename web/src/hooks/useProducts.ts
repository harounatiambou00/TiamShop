export default function useProducts() {
  const getTenBestSellerProducts = async () => {};
  const getProductById = async (productId: string) => {
    let url =
      process.env.REACT_APP_API_URL + "products/get-product-by-id/" + productId;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });

    let content = await response.json();
    if (content.sucess) return content;
    else
      return {
        data: null,
        success: false,
        message: content ? content.message : "",
      };
  };

  return [getProductById];
}
