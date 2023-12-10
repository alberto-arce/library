import { Book } from "../../components/Book";
import { LayoutModule } from "../layout";

export const BookModule: React.FC<{
  userName: string;
  userRole: string | undefined;
}> = ({ userName, userRole }) => {
  return (
    <>
      <LayoutModule userName={userName} userRole={userRole} />
      <div style={{ marginTop: "20px" }}>
        <Book />
      </div>
    </>
  );
};
