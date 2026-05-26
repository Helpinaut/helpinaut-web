import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value?: string | null;
  onValueChange: (value: string | null) => void;
};

const items = [
  { label: "All types", value: "all" },
  { label: "Need service", value: "request" },
  { label: "Offer service", value: "offer" },
];

export function TypeSelector({ value, onValueChange }: Props) {
  return (
    <Select value={value} onValueChange={onValueChange} items={items}>
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="All types" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select service type</SelectLabel>
          <SelectSeparator />
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
