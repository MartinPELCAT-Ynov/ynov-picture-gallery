import { GetServerSideProps } from "next";
import React from "react";
import { AlbumView } from "src/components/album/album-view";
import { Button } from "src/components/forms/Button";
import { PreviouIcon } from "src/components/icons/PreviouIcon";
import { Modal } from "src/components/Modal";
import { AlbumContext, AlbumContextProvider } from "src/contexts/album-context";
import { TravelContextProvider } from "src/contexts/travel-context";
import { useModal } from "src/hooks/useModal";
import { Layout } from "src/layouts";
import { withSession } from "src/middleware/withSession";
import { InviteEmailModal } from "src/modals/invite-email-modal";
import { UploadImageModal } from "src/modals/upload-image-modal";

export default function Travel() {
  const { show, content } = useModal(<UploadImageModal />);
  const { show: showInvite, content: inviteContent } = useModal(
    <InviteEmailModal />
  );
  return (
    <Layout>
      <TravelContextProvider>
        <AlbumContextProvider>
          <div className="absolute h-full w-full">
            <div className="divide-y flex-1 absolute flex flex-col h-full">
              <div className="px-10 py-5 flex justify-between items-center">
                <span className="text-4xl font-light flex items-center space-x-4">
                  <PreviouIcon />
                  <AlbumContext.Consumer>
                    {({ album }) => (
                      <span className="italic font-medium text-4xl">
                        {album?.name}
                      </span>
                    )}
                  </AlbumContext.Consumer>
                </span>
                <div className="flex space-x-4">
                  <Button.Create label="Invite" onClick={showInvite} />
                  <Button.Create label="Upload" onClick={show} />
                </div>
              </div>
              <div className="flex h-full">
                <div className="w-3/4">
                  <AlbumView />
                </div>
                <div className="w-1/4 bg-gray-700">Column</div>
              </div>
            </div>
          </div>
          <Modal content={content} />
          <Modal content={inviteContent} />
        </AlbumContextProvider>
      </TravelContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
