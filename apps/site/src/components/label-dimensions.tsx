import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const dimensions = [
  {
    value: "4x6",
    label: '4" x 6"',
  },
  {
    value: "4x2",
    label: '4" x 2"',
  },
  {
    value: "4x3",
    label: '4" x 3"',
  },
  {
    value: "2x1",
    label: '2" x 1"',
  },
  {
    value: "3x1_5",
    label: '3" x 1.5"',
  },
];

type LabelDimensionsProps = {
  value: string;
  setValue: (value: string) => void;
};

export function LabelDimensions({ value, setValue }: LabelDimensionsProps) {
  return (
    <div className="w-40">
      <Select defaultValue={value} onValueChange={setValue} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a dimension" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dimensions.map((dimension) => (
              <SelectItem value={dimension.value}>{dimension.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
