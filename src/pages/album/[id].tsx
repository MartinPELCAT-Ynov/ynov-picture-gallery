import { GetServerSideProps } from "next";
import React from "react";
import { Button } from "src/components/forms/Button";
import { PreviouIcon } from "src/components/icons/PreviouIcon";
import { Modal } from "src/components/Modal";
import { AlbumsContextProvider } from "src/contexts/albums-context";
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
        <AlbumsContextProvider>
          <div className="divide-y">
            <div className="px-10 py-5 flex justify-between items-center">
              <span className="text-4xl font-light flex items-center space-x-4">
                <PreviouIcon />
                <span className="italic font-medium text-4xl">{`[ALBUM NAME]`}</span>
              </span>
              <div className="flex space-x-4">
                <Button.Create label="Invite" onClick={showInvite} />
                <Button.Create label="Upload" onClick={show} />
              </div>
            </div>
            {/* <AlbumView /> */}
          </div>
          <Modal content={content} />
          <Modal content={inviteContent} />
        </AlbumsContextProvider>
      </TravelContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
