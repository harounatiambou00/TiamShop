import ProductCaracteristic from "../../../data/models/ProductCaracteristic";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

type Props = {
  caracteristics: ProductCaracteristic[];
};

const ProductCaracteristics = ({ caracteristics }: Props) => {
  const firstTabCaracteristics = caracteristics.slice(
    0,
    caracteristics.length / 2 + 1
  );
  const secondTabCaracteristics = caracteristics.slice(
    caracteristics.length / 2 + 1
  );
  return (
    <div className="w-full bg-white mt-10 p-5">
      <h1 className="font-raleway uppercase sm:text-2xl lg:text-xl font-medium">
        Caractéristiques
      </h1>
      {/*Only on large screens */}
      <div className="grid-cols-2 gap-5 items-start mt-8 sm:hidden lg:grid">
        <Table>
          <TableBody>
            {firstTabCaracteristics.map((caracteristic) => {
              return (
                <TableRow
                  className={
                    firstTabCaracteristics.indexOf(caracteristic) % 2 !== 0
                      ? "bg-transparent"
                      : "bg-gray-100"
                  }
                >
                  <TableCell className="font-kanit">
                    {caracteristic.productCaracteristicKey}
                  </TableCell>
                  <TableCell className="font-kanit">
                    {caracteristic.productCaracteristicValue}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Table>
          <TableBody>
            {secondTabCaracteristics.map((caracteristic) => {
              return (
                <TableRow
                  className={
                    secondTabCaracteristics.indexOf(caracteristic) % 2 !== 0
                      ? "bg-transparent"
                      : "bg-gray-100"
                  }
                >
                  <TableCell className="font-kanit">
                    {caracteristic.productCaracteristicKey}
                  </TableCell>
                  <TableCell className="font-kanit">
                    {caracteristic.productCaracteristicValue}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/*Only on sm screens */}
      <div className="grid grid-cols-1 gap-5 items-start mt-8 sm:grid lg:hidden">
        <Table>
          <TableBody>
            {caracteristics.map((caracteristic) => {
              return (
                <TableRow
                  className={
                    caracteristics.indexOf(caracteristic) % 2 !== 0
                      ? "bg-transparent"
                      : "bg-gray-100"
                  }
                >
                  <TableCell className="font-kanit text-xl">
                    {caracteristic.productCaracteristicKey}
                  </TableCell>
                  <TableCell className="font-kanit text-xl">
                    {caracteristic.productCaracteristicValue}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductCaracteristics;
