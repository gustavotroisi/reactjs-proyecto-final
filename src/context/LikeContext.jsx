import { useState, useContext, createContext } from "react";

export const LikeContext = createContext();

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike debe ser usado dentro de un LikeProvider");
  }
  return context;
};

export const LikeProvider = ({ children }) => {
  const [like, setLike] = useState([]);

  const setMeGusta = (id) => {
    const itemMeGusta = like.find((item) => item === id);
    if (itemMeGusta) {
      const removeLike = like.filter((item) => item !== id);
      setLike(removeLike);
    } else {
      setLike([...like, id]);
    }
  };

  const chequeaSiMeGusta = (id) => {
    if (like.find((item) => item === id)) return true;
    return false;
  };

  return (
    <LikeContext.Provider
      value={{
        setMeGusta,
        chequeaSiMeGusta,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
