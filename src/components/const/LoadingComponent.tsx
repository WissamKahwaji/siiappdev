const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-7 h-7 bg-navBackground rounded-lg animate-bounce duration-500 delay-75"></div>
      <div className="w-7 h-7 bg-secondary rounded-lg animate-bounce duration-500 delay-150"></div>
      <div className="w-7 h-7 bg-gray-50 border-4 border-secondary rounded-lg animate-bounce duration-500 delay-300"></div>
    </div>
  );
};

export default LoadingComponent;
