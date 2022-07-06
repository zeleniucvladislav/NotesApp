import { useAxios } from "utils/hooks/useAxios";
import { loginFields } from "./loginFields";
import { AuthForm } from "../components/authForm";
import { useUserContext } from "context/user/user.context";

export const Login = () => {
  const { request } = useAxios();
  const { login } = useUserContext();

  const handleRequest = async (data: any) => {
    const response: any = await request("/api/auth/login", "POST", data);

    login(response.token, response.username);
  };

  return (
    <AuthForm
      handleRequest={handleRequest}
      fields={loginFields}
      buttonText="LOGIN"
    />
  );
};
