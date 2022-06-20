import React from "react";
// next rotuer
import { useRouter } from "next/router";
export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
}
