import useOnClickOutside from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ExpandableSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const closeSearch = useCallback(() => setIsOpen(false), []);
  useOnClickOutside<HTMLInputElement>(inputRef, closeSearch);

  useEffect(() => {
    isOpen ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
      else if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        if (inputRef.current) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative hidden min-w-10 md:block">
      <Input
        ref={inputRef}
        className={cn(
          "transition-[width] duration-200 ease-out",
          isOpen ? "w-56 pl-10" : "w-0",
        )}
        placeholder="Search a movie..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        aria-label="Search"
        variant="outline"
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          isOpen && "border-none bg-transparent",
        )}
        size="icon"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <Search className={cn("h-[1.2rem] w-[1.2rem]", isOpen && "scale-90")} />
      </Button>
    </div>
  );
}
