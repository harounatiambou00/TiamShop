import { Fab } from "@mui/material";
import { MdAddCircleOutline } from "react-icons/md";

type Props = {
  title: string;
  subtitle?: string;
  buttonTitle: string;
  buttonAction?:
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | (() => void);
  children: React.ReactNode;
};

const Page = (props: Props) => {
  return (
    <div className="h-full w-full overflow-y-scroll px-10 pt-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-primary font-semibold font-raleway uppercase">
            {props.title}
          </h1>
          <span className="text-sm text-gray-500">{props.subtitle}</span>
        </div>
        <Fab
          variant="extended"
          className="fixed bottom-10 right-10 text-primary font-raleway "
          onClick={props.buttonAction && props.buttonAction}
        >
          <MdAddCircleOutline className="text-2xl mr-3 text-primary" />
          {props.buttonTitle}
        </Fab>
      </div>
      {props.children}
    </div>
  );
};

export default Page;
