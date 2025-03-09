"use client";

import * as React from "react";
import { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Preset } from "../data/presets";

interface PresetSelectorProps extends PopoverProps {
  presets: Preset[];
  livePrints: Preset[];
  selectedPreset: Preset | null;
  setSelectedPreset: (preset: Preset) => void;
}

export function PresetSelector({
  presets,
  livePrints,
  selectedPreset,
  setSelectedPreset,
  ...props
}: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedPreset ? selectedPreset.name : "Load a preset..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search presets..." />
          <CommandList>
            <CommandEmpty>No presets found.</CommandEmpty>
            <CommandGroup heading="Examples">
              {presets.map((preset) => (
                <CommandItem
                  key={preset.id}
                  onSelect={() => {
                    setSelectedPreset(preset);
                    setOpen(false);
                  }}
                >
                  {preset.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedPreset?.id === preset.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {livePrints.length > 0 && (
              <CommandGroup heading="Live prints">
                {livePrints.map((preset) => (
                  <CommandItem
                    key={preset.id}
                    onSelect={() => {
                      setSelectedPreset(preset);
                      setOpen(false);
                    }}
                  >
                    {preset.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedPreset?.id === preset.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
