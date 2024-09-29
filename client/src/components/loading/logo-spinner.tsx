import Logo from "../logo";

const LogoSpinner = () => {
  return (
    <>
      <Logo className="text-7xl" />

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-primary  to-white animate-spin">
        <div className="h-11 w-11 rounded-full  bg-background"></div>
      </div>
    </>
  );
};

export default LogoSpinner;
