import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { Button } from "src/components/forms/Button";
import { Form } from "src/components/forms/Form";
import { FormRow } from "src/components/forms/form-row";
import { Input } from "src/components/forms/Input";
import { useModalContext } from "src/hooks/useModalContext";
import { generateFormDatas } from "src/utils/form-utils";
import {
  CreateDestinationInput,
  useCreateDestinationMutation,
} from "src/__generated__";
import { encode } from "ngeohash";

type FormDatas = Omit<CreateDestinationInput, "geohash">;

export const CreateDestinationModal = () => {
  const { hide } = useModalContext();
  const [createDestination] = useCreateDestinationMutation();
  const [debounce, setDebounce] = useState<NodeJS.Timeout | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [city, setCity] = useState("");

  const { query } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log("travelId = ", query.id);
      const datas = generateFormDatas<FormDatas>(e.currentTarget);
      const geohash = encode(selectedCity.lat, selectedCity.lon);
      await createDestination({
        variables: { ...datas, geohash, travelId: query.id as string },
      });
      hide();
    } catch (error) {
      // DO NOTHING
    }
  };

  const handleCityChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setCity(e.target.value);
    if (debounce) clearTimeout(debounce);
    const timeout = setTimeout(async () => {
      const {
        data,
      } = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&city=${e.target.value}`,
        { headers: { "Access-Control-Allow-Origin": "GET" } }
      );

      console.log(data);
      setCities(data);
      setShowDropDown(true);
      setDebounce(null);
    }, 300);
    setDebounce(timeout);
  };
  useEffect(() => {
    setCity(selectedCity?.display_name ?? "");
  }, [selectedCity]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow className="border-b pb-4 justify-center">
        <span className="text-3xl font-light italic">Create destination</span>
      </FormRow>
      <FormRow>
        <Input.Default label="Name" name="name" required />
        <div className="flex-1 relative">
          <Input.Default
            label="City"
            required
            onChange={handleCityChange}
            value={city}
          />

          <div
            className={clsx(
              !showDropDown && "hidden",
              "absolute left-0 right-0 bg-white rounded-md shadow-md z-50 py-2 divide-y"
            )}
          >
            {cities
              .filter((city) => city.importance > 0.5)
              .map((city) => {
                return (
                  <div
                    role="button"
                    className="p-2 text-sm hover:bg-gray-200 rounded-md mx-2"
                    key={city.place_id}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowDropDown(false);
                    }}
                  >
                    {city.display_name}
                  </div>
                );
              })}
          </div>
        </div>
      </FormRow>
      <FormRow>
        <Input.Default
          type="date"
          label="Arrival date"
          name="arrivalDate"
          required
        />
        <Input.Default
          type="date"
          label="Departure date"
          name="departureDate"
          required
        />
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
