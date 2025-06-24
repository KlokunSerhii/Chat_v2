export  function ReactionsDisplay({ reactions, username, onReact }) {
  if (!reactions || Object.keys(reactions).length === 0) return null;

  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
      {Object.entries(reactions).map(([emoji, users]) => {
        const reactedByMe = users.includes(username);

        const handleClick = () => {
          onReact(emoji, reactedByMe);
        };
        console.log("ReactionsDisplay рендериться", reactions);
        return (
          <div
            key={`${emoji}-${users.join(",")}`}
            onClick={handleClick}
            style={{
              fontSize: "1rem",
              padding: "2px 6px",
              borderRadius: "12px",
              backgroundColor: reactedByMe ? "#d1e7ff" : "#1e1e1e",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              userSelect: "none",
            }}
            title={users.join(", ")}
          >
            {emoji} <span>{users.length}</span>
          </div>
        );
      })}
    </div>
  );
}