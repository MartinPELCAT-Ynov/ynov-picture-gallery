import clsx from "clsx";
import Link from "next/link";
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useContext,
  useRef,
  useState,
} from "react";
import { SessionContext, SessionUser } from "src/contexts/session-context";
import { Logo } from "../logo";
import { useClickAway } from "react-use";
import { useLogoutMutation } from "src/__generated__";

export const Header = () => {
  return (
    <div className="flex shadow-md bg-white text-gray-800 justify-between items-center px-3">
      <Link href="/">
        <a className="py-3">
          <div className="flex space-x-2 items-center">
            <div>
              <Logo width={50} height={15} />
            </div>
            <span className="uppercase font-bold text-2xl">Gallery</span>
          </div>
        </a>
      </Link>
      <ConnectionStatus />
    </div>
  );
};

const ConnectionStatus = () => {
  const { user, loading } = useContext(SessionContext);
  if (loading) return null;
  return user ? <ConnectedStatus {...user} /> : <NotConnectedStatus />;
};

const ConnectedStatus = ({ firstName, lastName }: SessionUser) => {
  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  useClickAway(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <div
        role="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="py-1 px-2 border-b-2 border-opacity-0 border-black font-semibold hover:border-opacity-100 duration-300 transition"
      >
        {firstName} {lastName}
      </div>
      <div
        className={clsx(
          !open && "hidden",
          "bg-white p-1 shadow-md absolute top-14 right-0 border rounded-md w-60 space-y-1"
        )}
      >
        <DropDown />
      </div>
    </div>
  );
};

const DropDown = () => {
  const [logout] = useLogoutMutation();
  const { setUser } = useContext(SessionContext);

  const handleLogOut = async () => {
    try {
      await logout();
      setUser(undefined);
    } catch (error) {}
  };
  return (
    <>
      <Link href="/profile">
        <a>
          <DropDownItem>Profile</DropDownItem>
        </a>
      </Link>
      <DropDownItem onClick={handleLogOut}>Log Out </DropDownItem>
    </>
  );
};

const DropDownItem: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div
      role="button"
      {...props}
      className="p-2 bg-opacity-0 hover:bg-opacity-100 hover:bg-gray-200 rounded-md duration-300 transition"
    >
      {children}
    </div>
  );
};

const NotConnectedStatus = () => {
  return (
    <Link href="/auth/login">
      <a className="py-1 px-2 border-b-2 border-opacity-0 border-black font-semibold hover:border-opacity-100 duration-300 transition">
        Se connecter
      </a>
    </Link>
  );
};
