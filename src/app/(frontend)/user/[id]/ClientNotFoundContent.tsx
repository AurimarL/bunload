"use client";

import { usePathname } from "next/navigation";

export default function ClientNotFoundContent() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // Split and remove empty strings

  // Assuming the ID is the last segment of the path
  const notFoundId = segments[segments.length - 1];

  return (
    <div>
      <h1>Page Not Found</h1>
      {notFoundId && <p>The User with ID: {notFoundId} could not be found.</p>}
      {!notFoundId && <p>The requested page could not be found.</p>}
    </div>
  );
}
