import React from "react";
import { Page } from "../../components/admin-layout";
import { Brand } from "../../data/models/Brand";
import BrandsList from "./BrandsList";
import { CircularProgress } from "@mui/material";
import AddBrandDialog from "./add-brand-dialog/AddBrandDialog";

const BrandsPage = () => {
  const [brands, setBrands] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getBrands = async () => {
    setIsLoading(true);
    const url = process.env.REACT_APP_API_URL + "brands";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;

    for (let i of data) {
      setBrands((currentBrands) => [
        ...currentBrands,
        {
          ...{},
          BrandId: i.brandId,
          BrandName: i.brandName,
          PartnershipDate:
            i.partnershipDate != null
              ? new Date(
                  parseInt(i.partnershipDate.slice(0, 4)),
                  parseInt(i.partnershipDate.slice(5, 7)) - 1,
                  parseInt(i.partnershipDate.slice(8, 10))
                )
              : null,
          BrandWebsiteLink: i.brandWebsiteLink,
          BrandImageId: i.brandImageId,
        },
      ]);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getBrands();
  }, []);

  const [openAddBrandModal, setOpenAddBrandModal] =
    React.useState<boolean>(false);

  return (
    <Page
      title="Les marques"
      subtitle="La liste de toutes les marques incluant leurs noms, email, numéro de téléphone ..."
      buttonTitle="Ajouter"
      buttonAction={() => setOpenAddBrandModal(true)}
    >
      {isLoading ? (
        <div className="w-full h-20 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <BrandsList brands={brands} />
          <AddBrandDialog
            open={openAddBrandModal}
            setOpen={setOpenAddBrandModal}
          />
        </div>
      )}
    </Page>
  );
};

export default BrandsPage;
