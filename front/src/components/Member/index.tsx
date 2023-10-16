import { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
} from "@mui/material";

import { AddItemDialog } from "../AddItemDialog";
import { IMember } from "./interfaces";
import { memberService } from "../../services";

export const Member = () => {
  const [members, setMembers] = useState<IMember[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddingMember, setisAddingMember] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await memberService.getMembers();
      setMembers(response.data);
    };
    fetchData();
  }, []);

  const handleEdit = (_id: string) => {
    // Implement edit logic here
    console.log(`Edit member with ID: ${_id}`);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await memberService.deleteMember(_id);
      if (response.success) {
        setMembers((prevMembers) =>
          prevMembers?.filter((member) => member._id !== _id)
        );
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredMembers = members?.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddMemberDialog = () => {
    setisAddingMember(true);
  };

  const handleCloseAddMemberDialog = () => {
    setisAddingMember(false);
  };

  const handleSaveNewMember = async (newMember: IMember) => {
    try {
      const response = await memberService.createMember(newMember);
      if (response.success) {
        const response = await memberService.getMembers();
        setMembers(response.data);
      } else {
        console.error("Failed to create member.");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
    handleCloseAddMemberDialog();
  };

  return (
    <Container>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddMemberDialog}
        style={{ marginBottom: "20px" }}
      >
        Add Member
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers?.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(member._id)}
                    sx={{ marginRight: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <AddItemDialog
        open={isAddingMember}
        onClose={handleCloseAddMemberDialog}
        onSave={handleSaveNewMember}
        title="Add a new member"
        fields={[{ label: "Name", value: "name" }]}
      />
    </Container>
  );
};
