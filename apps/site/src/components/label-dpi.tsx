import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

const dpi = [
  {
    value: "152",
    label: "152",
  },
  {
    value: "203",
    label: "203",
  },
  {
    value: "300",
    label: "300",
  },
  {
    value: "600",
    label: "600",
  },
];

type LabelDPIProps = {
  value: string;
  setValue: (value: string) => void;
};

export function LabelDPI({ value, setValue }: LabelDPIProps) {
  return (
    <div className="w-40">
      <Select defaultValue={value} onValueChange={setValue} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a dimension" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dpi.map((d) => (
              <SelectItem value={d.value} key={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
