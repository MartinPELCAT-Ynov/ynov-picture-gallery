import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { Button } from "src/components/forms/Button";
import { Modal } from "src/components/Modal";
import { AlbumContextProvider } from "src/contexts/album-context";
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
          <div className="divide-y">
            <div className="px-10 py-5 flex justify-between">
              <span className="text-4xl font-light">
                <Link href="/">
                  <a className="underline">Album</a>
                </Link>
                : <span className="italic font-medium">{"[ALBUM NAME]"}</span>
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
        </AlbumContextProvider>
      </TravelContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSession();
