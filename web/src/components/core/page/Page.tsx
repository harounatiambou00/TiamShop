import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Page = (props: Props) => {
  return <div className="sm:p-5 lg:py-5 lg:px-10">{props.children}</div>;
};

export default Page;
