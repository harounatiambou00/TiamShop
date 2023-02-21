import React from "react";
import { Page } from "../../components/admin-layout";
import { CircularProgress } from "@mui/material";
import CategoriesList from "./categories-list/CategoriesList";
import AddCategoryOrSubCategoryDialog from "./add-category-or-subcategory-dialog/AddCategoryOrSubCategoryDialog";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getCategories = async () => {
    setIsLoading(true);
    const url = process.env.REACT_APP_API_URL + "categories";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;

    for (let i of data) {
      setCategories((currentCategories) => [
        ...currentCategories,
        {
          ...{},
          CategoryId: i.categoryId,
          CategoryName: i.categoryName,
          CategoryTitle: i.categoryTitle,
          CategoryImageId: i.categoryImageId,
          CategoryRanking: i.categoryRanking,
        },
      ]);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const refreshCategories = () => {
    setCategories([]);
    getCategories();
  };

  const [openAddCategoryDialog, setOpenAddCategoryDialog] =
    React.useState<boolean>(false);
  return (
    <Page
      title="Les Catégories de produits"
      buttonTitle="Ajouter"
      buttonAction={() => setOpenAddCategoryDialog(true)}
    >
      {isLoading ? (
        <div className="w-full h-20 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="mt-10">
          <CategoriesList
            categories={categories}
            refreshCategories={refreshCategories}
          />
          <AddCategoryOrSubCategoryDialog
            open={openAddCategoryDialog}
            setOpen={setOpenAddCategoryDialog}
            categories={categories}
            refreshCategories={refreshCategories}
          />
        </div>
      )}
    </Page>
  );
};

export default AdminCategoriesPage;
