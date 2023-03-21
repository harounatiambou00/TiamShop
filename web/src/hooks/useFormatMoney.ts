export default function useFormatMoney() {
  const formatPrice = (price: number) => {
    let str = price.toString() as string;
    let response = "";
    for (let i = str.length - 1; i >= 0; i++) {
      response = str[i] + response;
    }

    return response;
  };

  return [formatPrice] as const;
}
