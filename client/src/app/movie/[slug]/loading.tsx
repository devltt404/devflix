import LogoSpinner from "@/components/loading/logo-spinner";

const MovieLoading = () => {
  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center pointer-events-none bg-background">
      <LogoSpinner />
    </div>
  );
};

export default MovieLoading;
