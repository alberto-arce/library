import { Book } from "../../components/Book";
import { LayoutModule } from "../layout";

export const BookModule = () => {
  return (
    <>
      <LayoutModule />
      <div style={{ marginTop: "20px" }}>
        <Book />
      </div>
    </>
  );
}
