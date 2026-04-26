export default function CVPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: '#111827', // bg-gray-900
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
