import React from "react";
import { Product } from "../../../data/models/Product";
import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BiArrowToBottom, BiEdit } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

type Props = {
  products: Product[];
};

const ProductsTable = ({ products }: Props) => {
  return (
    <TableContainer className="mt-12 bg-gray-50" component={Paper}>
      <Table sx={{ minWidth: 2000 }}>
        <TableHead>
          <TableRow>
            <TableCell
              padding="checkbox"
              align="center"
              className="font-kanit"
            ></TableCell>
            <TableCell align="center" className="font-kanit">
              Nom
            </TableCell>
            <TableCell align="center" className="font-kanit">
              Description
            </TableCell>
            <TableCell align="center" className="font-kanit">
              Référence
            </TableCell>
            <TableCell align="center" className="font-kanit">
              Prix
            </TableCell>
            <TableCell align="center" className="font-kanit">
              Quantité
            </TableCell>
            <TableCell align="center" className="font-kanit">
              Garantie
            </TableCell>
            <TableCell align="center" className="font-kanit">
              Couleur
            </TableCell>
            <TableCell
              padding="checkbox"
              align="center"
              className="font-kanit"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow>
                <TableCell
                  align="center"
                  className="font-kanit flex items-center"
                >
                  <Checkbox size="small" />
                  <IconButton size="small">
                    <MdKeyboardArrowDown />
                  </IconButton>
                </TableCell>
                <TableCell align="center" className="font-kanit max-w-0">
                  {product.productName}
                </TableCell>
                <TableCell align="center" className="font-kanit max-w-md">
                  {product.productDescription}
                </TableCell>
                <TableCell align="center" className="font-kanit">
                  {product.productReference}
                </TableCell>
                <TableCell align="center" className="font-kanit">
                  {product.productPrice}
                </TableCell>
                <TableCell align="center" className="font-kanit">
                  {product.productQuantity}
                </TableCell>
                <TableCell align="center" className="font-kanit">
                  {product.waranty}
                </TableCell>
                <TableCell align="center" className="font-kanit">
                  {product.color}
                </TableCell>
                <TableCell
                  align="center"
                  className="font-kanit flex items-center"
                >
                  <IconButton size="small">
                    <FiEdit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <BsTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
