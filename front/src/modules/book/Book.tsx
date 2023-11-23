import { Book } from "../../components/Book";
import { LayoutModule } from "../layout";

export const BookModule: React.FC<{ userRole: string | undefined }> = ({ userRole }) => {
  return (
    <>
      <LayoutModule userRole={userRole}/>
      <div style={{ marginTop: "20px" }}>
        <Book />
      </div>
    </>
  );
}
