import { createContext } from "react";

export const travelBlogContext = createContext(null);

const TravelContext = (props) => {
  return (
    <travelBlogContext.Provider value={""}>
      {props.children}
    </travelBlogContext.Provider>
  );
};

export default TravelContext;
