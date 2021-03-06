import { useRouter } from "next/router";
import { FormEvent, useContext } from "react";
import { Button } from "src/components/forms/Button";
import { Form } from "src/components/forms/Form";
import { FormRow } from "src/components/forms/form-row";
import { Input } from "src/components/forms/Input";
import { AlbumsContext } from "src/contexts/albums-context";
import { useModalContext } from "src/hooks/useModalContext";
import { generateFormDatas } from "src/utils/form-utils";
import { useCreateAlbumMutation } from "src/__generated__";

type FormDatas = { name: string };

export const CreateAlbumModal = () => {
  const { hide } = useModalContext();
  const [create] = useCreateAlbumMutation();
  const { addAlbum } = useContext(AlbumsContext);

  const { query } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const datas = generateFormDatas<FormDatas>(e.currentTarget);
      const { data } = await create({
        variables: { ...datas, travelId: query.id as string },
      });
      addAlbum(data?.createAlbum!);
      hide();
    } catch (error) {
      // DO NOTHING
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow className="border-b pb-4 justify-center">
        <span className="text-3xl font-light italic">Create album</span>
      </FormRow>
      <FormRow>
        <Input.Default label="Name" name="name" required />
      </FormRow>
      <FormRow className="justify-end">
        <div className="w-1/2 flex space-x-4">
          <Button.Default
            label="Cancel"
            type="button"
            className="bg-gray-300"
            onClick={hide}
          />
          <Button.Default
            label="Create"
            type="submit"
            className="bg-indigo-500 text-white"
          />
        </div>
      </FormRow>
    </Form>
  );
};
