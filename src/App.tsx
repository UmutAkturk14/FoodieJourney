import "./App.css";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";
import { HealthQuestionnaire } from "@components/HealthQuestionnaire/HealthQuestionnaire";

function App() {
  return (
    <>
      <Navbar />
      <HealthQuestionnaire />
      <Footer />
    </>
  );
}

export default App;
