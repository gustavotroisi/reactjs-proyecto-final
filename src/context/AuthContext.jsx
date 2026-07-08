import { createContext, useState, useContext, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged, // es como un event listener
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// 1. Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para controlar el uso del contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Obtenemos la instancia de auth una sola vez
  const db = getFirestore(); // Inicializamos Firestore
  const navigate = useNavigate();

  // Función para registrar un nuevo usuario
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Función para iniciar sesión
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Función para cerrar sesión
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    // observamos el usuario que se esta autenticando
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Obtenemos el usuario con ese ID
        const userDocRef = doc(db, "usuarios", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        // Si el documento existe y tiene rol de admin, lo asignamos.
        if (userDocSnap.exists() && userDocSnap.data().rol === "admin") {
          setUser({ ...currentUser, rol: "admin" });
        } else {
          // Para cualquier otro caso, es un usuario regular.
          setUser({ ...currentUser, rol: "user" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    // Limpiamos el observador al desmontar
    return () => unsubscribe(); //asi desmonta useeffect al observer
  }, [auth, db]); // Agregamos 'auth' como dependencia

  // Crear el objeto 'value' con TODAS las funciones definidas
  const value = {
    user,
    loading, // Es buena práctica pasar el estado de carga también
    signup,
    login, // Ahora 'login' sí existe y se puede pasar
    logout,
  };
  // Retornar el Provider, asegurándonos de no renderizar hasta que cargue
  // Esto evita que los componentes hijos puedan acceder a 'user' cuando es null
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
