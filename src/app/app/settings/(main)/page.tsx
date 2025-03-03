import { auth } from "@/services/auth";
import ProfileForm from "./_components/form";

export const Page = async () => {
  const session = await auth();
  return <ProfileForm defaultValues={session?.user} />;
};

export default Page;
