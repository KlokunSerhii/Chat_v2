export default function MessageContextMenu({ position, onClose, onReply, onCopy, onDelete }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid #ccc',
        borderRadius: '8px',
        zIndex: 1000,
        padding: '8px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        minWidth: '120px',
      }}
      onClick={onClose}
    >
      <div style={menuItemStyle} onClick={onReply}>
        Відповісти
      </div>
      <div style={menuItemStyle} onClick={onCopy}>
        Копіювати
      </div>
      <div style={{ ...menuItemStyle, color: 'red' }} onClick={onDelete}>
        Видалити
      </div>
    </div>
  );
}

const menuItemStyle = {
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '14px',
  userSelect: 'none',
};
