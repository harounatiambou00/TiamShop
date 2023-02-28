import "./styles.css";
type Props = {
  text: string;
  action?: () => void;
};

const UnderlinedLink = ({ text, action }: Props) => {
  return (
    <div className="pb-1 relative" onClick={action ? () => action() : () => {}}>
      <span className="link link-underline link-underline-primary cursor-pointer sm:text-3xl lg:text-sm select-none">
        <span>{text}</span>
      </span>
    </div>
  );
};

export default UnderlinedLink;
