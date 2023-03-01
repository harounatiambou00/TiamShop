import { Skeleton } from "@mui/material";

const BillboardSection = () => {
  return (
    <div className="w-full h-96 pt-5 px-10 grid grid-cols-12 gap-7">
      <div className="h-full col-span-8 drop-shadow-sm">
        <Skeleton
          variant="rectangular"
          animation="pulse"
          className="w-full h-full rounded-md"
        />
      </div>
      <div className="h-full col-span-4 flex flex-col">
        <div className="w-full h-1/2 pb-2">
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="w-full h-1/2 pt-2">
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="w-full h-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BillboardSection;
