type HighlightProps = {
  text?: string;
  substrings?: { length: number; offset: number }[];
};

export default function Highlight({ text, substrings }: HighlightProps) {
  if (!text) return null;

  if (!substrings) return <span>{text}</span>;

  const { offset, length } = substrings[0];

  return (
    <span>
      {text.split("").map((char, i) => {
        if (i >= offset && i < offset + length) {
          return <b key={i}>{char}</b>;
        } else {
          return char;
        }
      })}
    </span>
  );
}
