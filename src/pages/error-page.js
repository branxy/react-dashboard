import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();

  return (
    <>
      <p>Error: {err.statusText || err.message}</p>
      <p>
        Back to <NavLink to="/">homepage</NavLink>
      </p>
    </>
  );
}
