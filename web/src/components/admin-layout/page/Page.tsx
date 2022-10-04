import { Button } from "@mui/material";

type Props = {
  title: string;
  subtitle: string;
  buttonTitle: string;
  buttonAction?: () => {};
  children: React.ReactNode;
};

const Page = (props: Props) => {
  return (
    <div className="h-full w-full overflow-y-scroll px-10 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl text-gray-600 font-medium
              "
          >
            {props.title}
          </h1>
          <span className="text-sm text-gray-500">{props.subtitle}</span>
        </div>
        <Button
          variant="contained"
          className="bg-primary font-raleway font-semibold"
        >
          {props.buttonTitle}
        </Button>
      </div>
      {props.children}
    </div>
  );
};

export default Page;
