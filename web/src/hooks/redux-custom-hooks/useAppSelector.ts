import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
