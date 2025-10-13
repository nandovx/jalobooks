import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { loadBooksFromStorage } from "../../store/bookSlice";

const InitializeApp: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBooksFromStorage());
  }, [dispatch]);

  return <>{children}</>;
};

export default InitializeApp;
