import Icon from "../Icons/Icon";

export default function ShapeItem() {
  return (
    <div className="h-10 w-full transition-colors pl-8 pr-4 flex items-center hover:bg-primary-200 hover:cursor-default">
      <Icon name="square" size={14} />

      <span className="font-latoRegular ml-4 text-[0.7em]">Rectangle</span>
    </div>
  )
}