import React, { useEffect, useState } from "react";
import { LockCloseIcon } from "../icons/LockCloseIcon";
import { LockOpenIcon } from "../icons/LockOpenIcon";
import { useChangePublicAccesMutation } from "src/__generated__";

type Props = { albumUuid?: string; isPublic: boolean };

export const AlbumLockState = ({ albumUuid, isPublic }: Props) => {
  const [publicState, setPublicState] = useState(isPublic);

  const [changeAccess] = useChangePublicAccesMutation();

  useEffect(() => {
    setPublicState(isPublic);
  }, [isPublic]);

  const handleChangeVisibility = async () => {
    try {
      const { data } = await changeAccess({ variables: { id: albumUuid! } });
      if (data && data.changePublic.success) {
        setPublicState(true);
      } else if (data && !data.changePublic.success) {
        setPublicState(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!albumUuid) return null;
  return (
    <div role="button" onClick={handleChangeVisibility}>
      {publicState ? <LockOpenIcon /> : <LockCloseIcon />}
    </div>
  );
};
