import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default MainLayout;