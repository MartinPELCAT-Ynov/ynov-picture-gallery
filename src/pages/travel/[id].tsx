import { GetServerSideProps } from "next";
import React from "react";
import { AlbumsView } from "src/components/albums/albums-view";
import { Button } from "src/components/forms/Button";
import { PreviouIcon } from "src/components/icons/PreviouIcon";
import { Modal } from "src/components/Modal";
import { CommentColumn } from "src/components/reactions/comment-column";
import { LikeBanner } from "src/components/reactions/like-banner";
import { AlbumsContextProvider } from "src/contexts/albums-context";
import {
  TravelContext,
  TravelContextProvider,
} from "src/contexts/travel-context";
import { useModal } from "src/hooks/useModal";
import { Layout } from "src/layouts";
import { withSession } from "src/middleware/withSession";
import { CreateAlbumModal } from "src/modals/create-album-modal";
import { CreateDestinationModal } from "src/modals/create-destination-modal";

export default function Travel() {
  const { show, content } = useModal(<CreateAlbumModal />);
  const {
    show: showDestinationModal,
    content: contentDestinationModal,
  } = useModal(<CreateDestinationModal />);
  return (
    <Layout>
      <TravelContextProvider>
        <AlbumsContextProvider>
          <div className="px-10 py-5 flex justify-between items-center">
            <span className="text-4xl font-light flex items-center space-x-4">
              <PreviouIcon />
              <TravelContext.Consumer>
                {({ travel }) => (
                  <span className="italic font-medium">{travel?.name}</span>
                )}
              </TravelContext.Consumer>
            </span>
            <div className="flex space-x-4">
              <Button.Create
                label="Ajouter une destination"
                onClick={showDestinationModal}
              />
              <Button.Create label="Create album" onClick={show} />
            </div>
          </div>
          <div className="flex h-full w-full flex-1">
            <div className="w-3/4 overflow-y-auto">
              <AlbumsView />
            </div>
            <div className="w-1/4 bg-gray-100">
              <TravelContext.Consumer>
                {({ travel }) => (
                  <>
                    <LikeBanner
                      liked={travel?.liked ?? false}
                      likes={travel?.likes ?? 0}
                      entityUuid={travel?.uuid}
                    />
                    <CommentColumn
                      entityUuid={travel?.uuid}
                      comments={travel?.comments}
                    />
                  </>
                )}
              </TravelContext.Consumer>
            </div>
          </div>
          <Modal content={contentDestinationModal} />
          <Modal content={content} />
        </AlbumsContextProvider>
      </TravelContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
