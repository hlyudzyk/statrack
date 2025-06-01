export const AccountPageSkeleton = () => {
  return (
      <div
          className="flex flex-col items-center p-6 rounded-xl border-gray-300 shadow-xl animate-pulse">
        <div className="lg:w-[50%] sm:w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center md:justify-start">
              <div
                  className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-gray-200 rounded-full"></div>
            </div>

            <div
                className="py-4 px-6 bg-gray-300 text-white rounded-xl flex justify-center md:justify-start">
              <div className="h-8 w-[120px] bg-gray-400 rounded"></div>
            </div>
          </div>

          <div className="w-full pt-20">
            <div className="mb-6 h-8 bg-gray-200 rounded"></div>

            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="w-full p-4 h-12 bg-gray-200 rounded-xl"></div>
              </div>
            </div>

            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="w-full p-4 h-[200px] bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>

          <div className="cursor-pointer bg-gray-400 h-12 w-32 rounded-xl mt-4"></div>
        </div>
      </div>

  )
}

export  const PropertyItemSkeleton = () => {
  return (
      <div className="cursor-pointer">
        <div className="relative overflow-hidden aspect-square rounded-xl bg-gray-300 animate-pulse">
        </div>

        <div className="mt-2">
          <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        </div>

        <div className="mt-2">
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
  );
};


export const UserSkeleton = () => {
  return (
      <div className="basis-[250px] max-w-[100%] grow animate-pulse rounded-xl bg-white p-4 shadow-md">
        <div className="h-24 w-24 rounded-full bg-gray-300 mx-auto mb-4" />
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
      </div>
  );
};

export const EventSkeleton = () => {
  return (
      <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow animate-pulse">
        <div className="h-40 w-full bg-gray-300 rounded-lg mb-4" />
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />
        <div className="flex items-center gap-3 mt-4">
          <div className="h-10 w-10 bg-gray-300 rounded-full" />
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
        </div>
      </div>
  );
};


export const PropertyListSkeleton = () => {
  return(
      <>
        <PropertyItemSkeleton/>
        <PropertyItemSkeleton/>
        <PropertyItemSkeleton/>
        <PropertyItemSkeleton/>
      </>
  )
}