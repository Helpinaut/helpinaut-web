import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Props = {
  value: [min: number, max: number];
  onValueChange: (value: [number, number]) => void;
  onValueCommitted: (value: [number, number]) => void;
};

export function PriceSlider({ value, onValueChange, onValueCommitted }: Props) {
  return (
    <div className="mx-w-md flex w-full flex-col gap-1">
      <Label className="sr-only" htmlFor="slider">
        Price range
      </Label>
      <Slider
        id="slider"
        min={1}
        max={9999}
        value={value}
        onValueChange={(values) => onValueChange(values as [number, number])}
        onValueCommitted={(values) =>
          onValueCommitted(values as [number, number])
        }
      />
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>{value[0]}€</span>
        <span>{value[1]}€</span>
      </div>
    </div>
  );
}
