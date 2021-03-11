import { useRouter } from "next/router";
import Link from "next/link";
import { FormEvent, useContext } from "react";
import { Button } from "src/components/forms/Button";
import { Form } from "src/components/forms/Form";
import { FormRow } from "src/components/forms/form-row";
import { Input } from "src/components/forms/Input";
import { SessionContext } from "src/contexts/session-context";
import { generateFormDatas } from "src/utils/form-utils";
import { useRegisterMutation } from "src/__generated__";

type FormDatas = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Register() {
  const [register, { loading, error }] = useRegisterMutation();
  const { setUser } = useContext(SessionContext);
  const { push } = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const datas = generateFormDatas<FormDatas>(e.currentTarget);
      const { data } = await register({ variables: datas });
      setUser(data?.register);
      push("/");
    } catch (error) {
      //DO NOTHING
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="shadow-md w-2/6 divide-y rounded-lg bg-white">
        <div className="justify-center flex p-4">
          <span className="text-3xl font-bold">Register</span>
        </div>
        <div className="p-4">
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <Input.Default label="Firstname" name="firstName" />
              <Input.Default label="Lastname" name="lastName" />
            </FormRow>
            <FormRow>
              <Input.Default label="Email" name="email" />
            </FormRow>
            <FormRow>
              <Input.Default label="Password" name="password" type="password" />
            </FormRow>
            {error && (
              <FormRow>
                <div className="w-full bg-red-200 text-red-600 border border-red-700 rounded-md p-2 text-center">
                  {error.message}
                </div>
              </FormRow>
            )}
            <div className="mt-4">
              <FormRow>
                <Button.Default label="Register" loading={loading} />
              </FormRow>
            </div>
            <div className="flex justify-end">
              <Link href="/auth/login">
                <a className="text-blue-600 hover:underline text-sm">
                  Already reistered? Login !
                </a>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
