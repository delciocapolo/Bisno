import Divider from "../divider";
import LogoApp from "../logo";

export default function Footer() {
  return (
    <footer className="">
      <Divider />

      <div className="max-w-[94%] py-4 mx-auto flex justify-between items-center">
        <LogoApp className="text-xl" />

        <p className="text-body-14 text-gray-300">
          Feito em Angola, para Angola.
        </p>
      </div>
    </footer>
  );
}
