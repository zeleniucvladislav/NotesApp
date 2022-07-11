import { AuthForm } from "../components/authForm";
import { registerFields } from "./registerFields";
import { useAxios } from "utils/hooks/useAxios";

type Props = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Register = ({ setLogin }: Props) => {
  const { request } = useAxios();

  const handleRequest = async (data: any) => {
    const requestData = data;
    delete requestData.repeatPwd;
    const res = await request("/auth/register", "POST", requestData);

    if (res) {
      setLogin(true);
    }
  };

  return (
    <AuthForm
      handleRequest={handleRequest}
      fields={registerFields}
      buttonText="REGISTER"
    />
  );
};
