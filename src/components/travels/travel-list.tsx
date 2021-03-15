import { PreviewTravelFragment } from "src/__generated__";
import { TravelItem } from "./travel-item";

export type Props = { travels: PreviewTravelFragment[] };

export const TravelList = ({ travels }: Props) => {
  return (
    <div className="p-4">
      <div className="flex flex-wrap -m-4">
        {travels.map((trvl) => (
          <TravelItem {...trvl} key={trvl.uuid} />
        ))}
      </div>
    </div>
  );
};
