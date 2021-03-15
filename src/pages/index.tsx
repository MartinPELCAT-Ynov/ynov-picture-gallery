import { GetServerSideProps } from "next";
import { Button } from "src/components/forms/Button";
import { Modal } from "src/components/Modal";
import { TravelsView } from "src/components/travels/travels-view";
import { TravelsContextProvider } from "src/contexts/travels-context";
import { useModal } from "src/hooks/useModal";
import { Layout } from "src/layouts";
import { withSession } from "src/middleware/withSession";
import { CreateTravelModal } from "src/modals/create-travel-modal";

export default function Home() {
  const { show, content } = useModal(<CreateTravelModal />);

  return (
    <Layout>
      <TravelsContextProvider>
        <div className="divide-y">
          <div className="px-10 py-5 flex justify-between">
            <span className="text-4xl font-light">All Travels</span>
            <Button.Create label="Create travel" onClick={show} />
          </div>
          <TravelsView />
        </div>
        <Modal content={content} />
      </TravelsContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
