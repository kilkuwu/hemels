export default function _404() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textShadow: "0 0 10px #ccc",
          fontSize: "1.5rem",
        }}
      >
        <div style={{ paddingRight: "0.5em", borderRight: "solid 1px" }}>
          404
        </div>
        <div style={{ paddingLeft: "0.5em" }}>
          This page could not be found.
        </div>
      </div>
    </div>
  );
}
