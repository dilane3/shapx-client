// @ts-ignore
import { ChromePicker } from "react-color";
import Icon from "../atoms/Icons/Icon";

type Props = {
  color: string;
  onChangeColor: (color: string) => void;
  onClose: () => void
};

export default function ColorPicker({ color, onChangeColor, onClose }: Props) {
  return (
    <div className="absolute left-[-17rem] p-2 bg-secondary shadow-md shadow-tertiary">
      <div className="relative px-4 pb-2 h-10 w-full flex items-center justify-center">
        <span className="font-latoBold text-[0.9em] capitalize">
          Select Color
        </span>

        <div className="w-8 h-8 absolute right-0 top-0 border-[1px] border-transparent hover:border-gray hover:cursor-pointer flex justify-center items-center" onClick={onClose}>
          <Icon name="x" />
        </div>
      </div>
      <ChromePicker color={color} onChangeComplete={onChangeColor} />
    </div>
  );
}
