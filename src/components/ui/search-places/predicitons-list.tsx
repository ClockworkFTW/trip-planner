import PredictionText from "./prediction-text";
import PredictionType from "./prediction-type";
import type { Prediction } from "@/types/predictions";

type OnClick = (prediction: Prediction) => void;

type PredictionsListProps = {
  predictions?: Prediction[];
  onClick: OnClick;
};

export default function PredictionsList(props: PredictionsListProps) {
  const { predictions, onClick } = props;

  if (!predictions) return null;

  return (
    <ul className="mt-1 rounded border border-solid border-gray-300">
      {predictions.map((prediction) => (
        <PredictionItem
          key={prediction.place_id}
          prediction={prediction}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

type PredictionItemProps = {
  prediction: Prediction;
  onClick: OnClick;
};

function PredictionItem(props: PredictionItemProps) {
  const { prediction, onClick } = props;

  if (!prediction.place_id) return null;

  function handleClick() {
    onClick(prediction);
  }

  const {
    main_text,
    main_text_matched_substrings,
    secondary_text,
    secondary_text_matched_substrings,
  } = prediction.structured_formatting;

  return (
    <li
      onClick={handleClick}
      className="flex items-center justify-between p-2 hover:cursor-pointer hover:bg-gray-100"
    >
      <div>
        <h1>
          <PredictionText
            text={main_text}
            substrings={main_text_matched_substrings}
          />
        </h1>
        <p className="text-xs text-gray-700">
          <PredictionText
            text={secondary_text}
            substrings={secondary_text_matched_substrings}
          />
        </p>
      </div>
      <PredictionType types={prediction.types} />
    </li>
  );
}
