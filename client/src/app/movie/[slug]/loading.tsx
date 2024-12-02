import LogoSpinner from "@/components/loading/logo-spinner";

const MovieLoading = () => {
  return (
    <div className="pointer-events-none flex min-h-screen flex-col items-center justify-center gap-8 bg-background">
      <LogoSpinner />
    </div>
  );
};

export default MovieLoading;
