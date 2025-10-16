import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadBooks } from "../../store/bookSlice";

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.books);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadBooks());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading books.</div>;
  }

  return <>{children}</>;
};

export default AppInitializer;
