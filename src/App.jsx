import { UserContext } from "./context/UserContext";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import HootList from "./components/HootList/HootList";
import * as hootService from "./services/hootService";
import { useContext, useState, useEffect } from "react";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";
import { Routes, Route, useNavigate } from "react-router";
import CommentForm from "./components/CommentForm/CommentForm";

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

  const handleDeleteHoot = async (hootId) => {
    const deletedHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate("/hoots");
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        {/* Core Home Route */}
        <Route path="/" element={<Landing />} />

        {/* Protected Routes (Fall back to Landing if user is signed out) */}
        <Route
          path="/hoots"
          element={user ? <HootList hoots={hoots} /> : <Landing />}
        />
        <Route
          path="/hoots/new"
          element={
            user ? <HootForm handleAddHoot={handleAddHoot} /> : <Landing />
          }
        />
        <Route
          path="/hoots/:hootId"
          element={
            user ? (
              <HootDetails handleDeleteHoot={handleDeleteHoot} />
            ) : (
              <Landing />
            )
          }
        />
        <Route
          path="/hoots/:hootId/edit"
          element={
            user ? (
              <HootForm handleUpdateHoot={handleUpdateHoot} />
            ) : (
              <Landing />
            )
          }
        />
        <Route
          path="/hoots/:hootId/comments/:commentId"
          element={user ? <CommentForm /> : <Landing />}
        />

        {/* Guest Routes (Fall back to Dashboard if user is already signed in) */}
        <Route
          path="/sign-up"
          element={!user ? <SignUpForm /> : <Dashboard />}
        />
        <Route
          path="/sign-in"
          element={!user ? <SignInForm /> : <Dashboard />}
        />
      </Routes>
    </>
  );
};

export default App;
