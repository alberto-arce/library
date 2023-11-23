import { User } from "../../components/User";
import { LayoutModule } from "../layout";

export const UserModule: React.FC<{ userRole: string | undefined }> = ({
  userRole,
}) => {
  return (
    <>
      <LayoutModule userRole={userRole} />
      <div style={{ marginTop: "20px" }}>
        <User />
      </div>
    </>
  );
};
