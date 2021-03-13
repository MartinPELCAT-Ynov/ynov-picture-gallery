import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "src/layouts";
import { useValidateEmailMutation } from "src/__generated__";

export default function EmailValidation() {
  const { query } = useRouter();
  const [validate, { loading, error }] = useValidateEmailMutation();

  const fetchValidate = async () => {
    try {
      if (query.data) {
        await validate({
          variables: { key: query.data as string },
        });
      }
    } catch (error) {
      //Do Nothing
    }
  };

  useEffect(() => {
    fetchValidate();
  }, [query]);

  if (loading) return <Layout />;

  if (error) {
    return (
      <Layout>
        <div className="py-10">
          <div className="w-2/3 mx-auto">
            <div className="bg-white shadow-md rounded-md p-4">
              <span className="text-3xl text-red-600">
                Error: {error.message}
              </span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-2/3 mx-auto py-10">
        <div className="bg-white shadow-md rounded-md p-4 border-b-8 border-indigo-500">
          <div className="text-6xl  leading-none text-gray-700 text-center font-extralight">
            Success !
          </div>
          <div className=" flex justify-center mt-8">
            <div className="text-xl">
              <div className="text-center">Your account is activated</div>
              <div className="text-center">Sign in to get started</div>
              <div className="mt-10">
                <Link href="/auth/login">
                  <a>
                    <button className="px-6 py-2 bg-indigo-500 rounded-full text-white font-bold hover:bg-opacity-90 transition hover:scale-105 duration-500 ease-in-out transform focus:outline-none">
                      Log In to continue
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
