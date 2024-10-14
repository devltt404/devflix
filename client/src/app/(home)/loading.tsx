import LogoSpinner from "@/components/loading/logo-spinner";

const RootLoading = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] flex min-h-screen flex-col items-center justify-center gap-8 bg-background">
      <LogoSpinner />
    </div>
  );
};

export default RootLoading;
