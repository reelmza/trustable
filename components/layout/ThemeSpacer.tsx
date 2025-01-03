const ThemeSpacer = ({
  size,
}: {
  size: "elements" | "components" | "sections";
}) => {
  if (size === "elements") {
    return <div className="h-2 w-full"></div>;
  }

  if (size === "components") {
    return <div className="h-5 w-full"></div>;
  }

  if (size === "sections") {
    return <div className="h-8 w-full"></div>;
  }
};

export default ThemeSpacer;
