import { User } from "../../components/User";
import { LayoutModule } from "../layout";

export const UserModule: React.FC<{ userName: string, userRole: string | undefined }> = ({
  userName,
  userRole,
}) => {
  return (
    <>
      <LayoutModule userName={userName} userRole={userRole} />
      <div style={{ marginTop: "20px" }}>
        <User />
      </div>
    </>
  );
};
