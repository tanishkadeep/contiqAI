import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

interface SelectPlatformProps {
  onPlatformChange: (value: string) => void;
}

export function SelectPlatform({ onPlatformChange }: SelectPlatformProps) {
  return (
    <Select onValueChange={onPlatformChange}>
      <SelectTrigger className="w-full bg-white dark:bg-neutral-800 text-base">
        <SelectValue placeholder="Select a platform" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Platforms</SelectLabel>

          <SelectItem value="Instagram">
            <div className="flex gap-2 items-center">
              <FaInstagram />
              <div>Instagram</div>
            </div>
          </SelectItem>

          <SelectItem value="LinkedIn">
            <div className="flex gap-2 items-center">
              <FaLinkedinIn className="text-neutral-600 dark:text-neutral-100" />
              <div>LinkedIn</div>
            </div>
          </SelectItem>

          <SelectItem value="X">
            <div className="flex gap-2 items-center">
              <FaXTwitter />
              <div>X</div>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}