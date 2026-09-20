import { readFileSync } from "node:fs";
import { join } from "node:path";

const ICON_DIR = join(process.cwd(), "public", "icons");
const cache = new Map<string, string>();

// Reads public/icons/<name>.svg once and resizes its root element.
function loadSvg(name: string, size: number) {
  const key = `${name}@${size}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const svg = readFileSync(join(ICON_DIR, `${name}.svg`), "utf8")
    .trim()
    .replace(/^<svg[^>]*>/, (root) =>
      root
        .replace(/\swidth="[^"]*"/, ` width="${size}"`)
        .replace(/\sheight="[^"]*"/, ` height="${size}"`),
    );
  cache.set(key, svg);
  return svg;
}

// Small UI icons are inlined in the HTML instead of being <img> requests: a separate request
// makes them pop in after first paint (visible as flicker on every reload, since files in
// public/ are revalidated each time). Server component, so the file is read at build time.
export default function InlineIcon({
  name,
  size,
  className,
}: {
  name: string;
  size: number;
  // Responsive box (e.g. "size-[18px] md:size-[25px]"); the SVG then fills it. Without it the
  // icon is `size`px square.
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={
        className
          ? `block shrink-0 [&>svg]:size-full ${className}`
          : "block shrink-0"
      }
      style={className ? undefined : { width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: loadSvg(name, size) }}
    />
  );
}
