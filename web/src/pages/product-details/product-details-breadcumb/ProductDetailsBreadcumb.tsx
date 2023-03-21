import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { Category } from "../../../data/models/Category";

type Props = {
  product: ProductAndRelatedInfo;
};

const ProductDetailsBreadcumb = ({ product }: Props) => {
  const navigate = useNavigate();
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  ) as Category[];
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );

  let productSubCategory = subCategories.find(
    (s) => s.SubCategoryId === product.subCategoryId
  );

  let productCategory = categories.find(
    (c) => c.CategoryId === productSubCategory?.CategoryId
  );

  return (
    <div className="h-10 w-full border-2 sm:rounded-lg lg:rounded-md px-5 sm:hidden lg:flex items-center bg-white">
      <span
        className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome className="mr-2" />
        Acceuil
      </span>
      <span
        className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer"
        onClick={() => navigate("/category/" + productCategory?.CategoryName)}
      >
        <MdKeyboardArrowRight className="mx-2" />
        {productCategory?.CategoryTitle}
      </span>
      <span
        className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer"
        onClick={() =>
          navigate("/sub-category/" + productSubCategory?.SubCategoryName)
        }
      >
        <MdKeyboardArrowRight className="mx-2" />
        {productSubCategory?.SubCategoryTitle}
      </span>
      <span className="flex items-center text-gray-600">
        <MdKeyboardArrowRight className="mx-2" />
        {product.productName}
      </span>
    </div>
  );
};

export default ProductDetailsBreadcumb;
