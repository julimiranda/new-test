import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "Teste" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      d
    </div>
  );
}
