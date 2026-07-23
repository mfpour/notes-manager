import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <main className="content">
          <div className="container">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;