import Userfront from "@userfront/react";

Userfront.init("vnd78z9b");

const SignupForm = Userfront.build({
  toolId: "nkdmaal"
});

export default function App() {
  return <SignupForm />;
};