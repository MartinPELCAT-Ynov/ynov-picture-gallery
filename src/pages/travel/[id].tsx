import { GetServerSideProps } from "next";
import React from "react";
import { AlbumView } from "src/components/albums/album-view";
import { Button } from "src/components/forms/Button";
import { Modal } from "src/components/Modal";
import { AlbumContextProvider } from "src/contexts/album-context";
import {
  TravelContext,
  TravelContextProvider,
} from "src/contexts/travel-context";
import { useModal } from "src/hooks/useModal";
import { Layout } from "src/layouts";
import { withSession } from "src/middleware/withSession";
import { CreateAlbumModal } from "src/modals/create-album-modal";

export default function Travel() {
  const { show, content } = useModal(<CreateAlbumModal />);

  return (
    <Layout>
      <TravelContextProvider>
        <AlbumContextProvider>
          <TravelContext.Consumer>
            {({ travel }) => (
              <>
                <div className="divide-y">
                  <div className="px-10 py-5 flex justify-between">
                    <span className="text-4xl font-light">
                      Travel: {travel?.name}
                    </span>
                    <Button.Create label="Create album" onClick={show} />
                  </div>
                  <AlbumView />
                </div>
                <Modal content={content} />
              </>
            )}
          </TravelContext.Consumer>
        </AlbumContextProvider>
      </TravelContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
