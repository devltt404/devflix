import Logo from "../logo";

const LogoSpinner = () => {
  return (
    <>
      <Logo className="text-5xl md:text-7xl" />

      <div className="flex h-14 w-14 animate-spin items-center justify-center rounded-full bg-gradient-to-tr from-primary to-white">
        <div className="h-11 w-11 rounded-full bg-background"></div>
      </div>
    </>
  );
};

export default LogoSpinner;
