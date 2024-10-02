import LogoSpinner from "@/components/loading/logo-spinner";

const RootLoading = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center fixed inset-0 z-[999] pointer-events-none bg-background">
      <LogoSpinner />
    </div>
  );
};

export default RootLoading;
