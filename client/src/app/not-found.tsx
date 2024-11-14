export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white text-center font-sans dark:bg-black">
      <div className="flex items-center">
        <h1 className="mr-6 border-r border-gray-300 pr-6 text-3xl font-medium dark:border-gray-700 dark:text-white">
          404
        </h1>
        <h2 className="font-normal dark:text-gray-300">
          This page could not be found.
        </h2>
      </div>
    </div>
  );
}
