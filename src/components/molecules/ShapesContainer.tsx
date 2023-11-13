import ShapeItem from "../atoms/ShapeItems/ShapeItem";

export default function ShapesContainer() {
  return (
    <aside className="w-[15rem] h-full border-r-[1px] border-gray">
      <div className="px-4 h-10 w-full border-b-[1px] border-gray flex items-center">
        <span className="font-latoBold text-[0.9em]">Shapes</span>
      </div>

      <div>
        <ShapeItem />
        <ShapeItem />
        <ShapeItem />
      </div>
    </aside>
  )
}