export default function PropertiesContainer() {
  return (
    <aside className="w-[15rem] h-full border-l-[1px] border-gray">
      <div className="px-4 h-10 w-full border-b-[1px] border-gray flex items-center justify-center">
        <span className="font-latoBold text-[0.9em]">Rectangle</span>
      </div>

      <div className="px-4 h-auto w-full border-b-[1px] border-gray flex flex-col gap-2 py-2">
        <div className="flex items-center">
          <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
            <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
              X
            </span>
            <input
              className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
              value={23}
            />
          </div>

          <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
            <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
              Y
            </span>
            <input
              className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
              value={23}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
            <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
              W
            </span>
            <input
              className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
              value={320}
            />
          </div>

          <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
            <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
              H
            </span>
            <input
              className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
              value={200}
            />
          </div>
        </div>
      </div>

      <div className="px-4 h-auto w-full border-b-[1px] border-gray flex flex-col gap-2 py-2">
        <div className="flex items-center">
          <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
            <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
              Perimeter
            </span>
            <input
              className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
              value={243}
              disabled
            />
          </div>

          <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
            <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
              Area
            </span>
            <input
              className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
              value={382}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[50%] flex items-center px-2 border-[1px] border-transparent hover:border-gray hover:cursor-default">
            <span className="font-latoRegular text-[0.7em] text-blue-gray-300">
              Radius
            </span>
            <input
              className="w-full h-8 border-0 px-2 bg-transparent outline-0 font-latoRegular text-[0.7em] pb-1 ml-2 hover:cursor-default"
              value={7}
              disabled
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
