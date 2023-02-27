import React from "react";
import { SearchValuesType } from "../../../data/SearchValuesType";
import FiltersSection from "../filters-section/FiltersSection";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";

type Props = {
  values: SearchValuesType;
  setValues: React.Dispatch<React.SetStateAction<SearchValuesType>>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
const SmallScreensFiltersSectionWrapper: React.FC<Props> = ({
  values,
  setValues,
  openDialog,
  setOpenDialog,
}: Props) => {
  return (
    <div className="sm:block lg:hidden">
      <Dialog
        maxWidth="xl"
        fullWidth
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <div className="px-10 py-5 w-full">
          <div className="w-full flex justify-end mb-7">
            <MdClose
              className="text-4xl"
              onClick={() => setOpenDialog(false)}
            />
          </div>
          <FiltersSection values={values} setValues={setValues} />
        </div>
      </Dialog>
    </div>
  );
};

export default SmallScreensFiltersSectionWrapper;
