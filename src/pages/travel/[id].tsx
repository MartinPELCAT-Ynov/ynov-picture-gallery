import { GetServerSideProps } from "next";
import React from "react";
import { AlbumsView } from "src/components/albums/albums-view";
import { Button } from "src/components/forms/Button";
import { PreviouIcon } from "src/components/icons/PreviouIcon";
import { Modal } from "src/components/Modal";
import { AlbumsContextProvider } from "src/contexts/albums-context";
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
        <AlbumsContextProvider>
          <TravelContext.Consumer>
            {({ travel }) => (
              <>
                <div className="divide-y">
                  <div className="px-10 py-5 flex justify-between items-center">
                    <span className="text-4xl font-light flex items-center space-x-4">
                      <PreviouIcon />
                      <span className="italic font-medium">{travel?.name}</span>
                    </span>
                    <Button.Create label="Create album" onClick={show} />
                  </div>
                  <AlbumsView />
                </div>
                <Modal content={content} />
              </>
            )}
          </TravelContext.Consumer>
        </AlbumsContextProvider>
      </TravelContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
