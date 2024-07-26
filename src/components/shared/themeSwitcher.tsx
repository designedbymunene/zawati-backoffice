import { useState, useEffect, Key } from "react";
import { useTheme } from "next-themes";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MoonIcon, PaletteIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered">
          {theme === "system" ? (
            <PaletteIcon />
          ) : theme === "light" ? (
            <SunIcon />
          ) : (
            <MoonIcon />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme Actions"
        selectionMode="single"
        onAction={(key) => setTheme(key as string)}
      >
        <DropdownItem
          key="system"
          shortcut={<PaletteIcon className="h-4 w-4" />}
        >
          System
        </DropdownItem>
        <DropdownItem key="dark" shortcut={<MoonIcon className="h-4 w-4" />}>
          Dark
        </DropdownItem>
        <DropdownItem key="light" shortcut={<SunIcon className="h-4 w-4" />}>
          Light
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeSwitcher;

{
  /* <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select> */
}
