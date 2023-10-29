import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";

import { memberService } from "../../services";
import { borrowService } from "../../services";
import { BorrowModalProps, IMember } from "./interfaces";
import "./index.css";

export const BorrowModal: React.FC<BorrowModalProps> = ({
  isOpen,
  onClose,
  selectedBook,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [members, setMembers] = useState<IMember[] | undefined>([]);
  const [numberSelectedBooks, setNumberSelectedBooks] = useState<string>("1");
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await memberService.getMembers();
      setMembers(response?.data);
    };
    fetchData();
  }, []);

  const handleChooseMember = (member: IMember) => {
    setSelectedMember(member);
  };

  const closeBorrowModal = () => {
    onClose();
  };

  /**
   * TODO: add modal
   */
  const handleConfirmBorrow = () => {
    if (selectedMember) {
      const newBorrow = {
        memberId: selectedMember._id,
        bookId: selectedBook?._id,
      };
      borrowService.createBorrow(newBorrow);
      closeBorrowModal();
    }
  };

  const filteredMembers = members?.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal open={isOpen} onClose={closeBorrowModal}>
      <div className="modal-container">
        {selectedBook && (
          <div>
            <Typography
              variant="h6"
              color="textSecondary"
              style={{ marginBottom: "5px" }}
            >
              Selected Book: {selectedBook.title}
            </Typography>
          </div>
        )}
        <TextField
          label="Search by member"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Box className="table-container">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="sticky-header">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers?.map((member, index) => (
                  <TableRow
                    key={index}
                    className={
                      selectedMember && selectedMember._id === member._id
                        ? "selected-row"
                        : ""
                    }
                    onClick={() => handleChooseMember(member)}
                  >
                    <TableCell>{member.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
        <TextField
          label="Cantidad de libros"
          variant="outlined"
          fullWidth
          type="number"
          value={numberSelectedBooks}
          onChange={(e) => setNumberSelectedBooks(e.target.value)}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmBorrow}
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};

