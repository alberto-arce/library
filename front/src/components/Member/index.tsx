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
} from "@mui/material";

import { AddItemDialog } from "../AddItemDialog";
import { EditItemDialog } from "../EditItemDialog";
import { IMember } from "./interfaces";
import { memberService } from "../../services";

export const Member = () => {
  const [members, setMembers] = useState<IMember[] | undefined>([]);
  const [isAddingMember, setisAddingMember] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMember, setEditMember] = useState<IMember | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await memberService.getMembers();
      setMembers(response.data);
    };
    fetchData();
  }, []);

  const handleEdit = (member: IMember) => {
    setEditMember(member);
    setIsEditing(true);
  };

  const handleSaveEdit = async (editedMember: IMember) => {
    try {
      const response = await memberService.updateMember(
        editedMember._id,
        editedMember
      );
      if (response.success) {
        const updatedMembers = await memberService.getMembers();
        setMembers(updatedMembers.data);
      } else {
        console.error("Failed to update member.");
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
    setIsEditing(false);
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddMemberDialog}
        style={{ marginBottom: "20px" }}
      >
        Agregar socio
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.status.toUpperCase()}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(member)}
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
      <EditItemDialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
        title="Editar socio"
        fields={[{ label: "Nombre", value: "name" }]}
        initialData={editMember}
      />
    </Container>
  );
};
