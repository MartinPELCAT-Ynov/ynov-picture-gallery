import { GetServerSideProps } from "next";
import { Button } from "src/components/forms/Button";
import { FetchTravels } from "src/components/travels/fetch-travels";
import { Layout } from "src/layouts";
import { withSession } from "src/middleware/withSession";

export default function Home() {
  return (
    <Layout>
      <div className="divide-y">
        <div className="px-10 py-5 flex justify-between">
          <span className="text-4xl font-light">Travels</span>
          <Button.Create label="Create travel" />
        </div>
        <FetchTravels />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
