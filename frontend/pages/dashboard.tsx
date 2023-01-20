import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";

import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";
import Statistics from "../components/Statistics";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const StatisticsArea = styled.div`
  display: flex;
`;

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <MdLastPage /> : <MdFirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? <MdArrowForward /> : <MdArrowBack />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <MdArrowBack /> : <MdArrowForward />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <MdFirstPage /> : <MdLastPage />}
      </IconButton>
    </Box>
  );
}

const Dashboard: NextPage = () => {
  const api = useApi();
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const [lastData, setLastData] = useState<any>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    api.listRecord().then(({ data }) => {
      setList(data);
    });
    api.lastData().then(({ data }) => {
      setLastData(data);
    });
  }, []);

  const handleSelect = (id: number) => {
    router.push(`data/${id}`);
  };
  return (
    <>
      {list.length && (
        <>
          <Typography
            variant="h4"
            component="div"
            style={{ marginBottom: "10px" }}
          >
            Statistics
          </Typography>
          {lastData && (
            <StatisticsArea>
              <Statistics title="RecordCount" value={list.length.toString()} />
              <Statistics
                title="LastData"
                value={new Date(lastData.time).toLocaleString()}
              />
            </StatisticsArea>
          )}
          <Typography
            variant="h4"
            component="div"
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            Data
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((l, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {l.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {l.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button onClick={() => handleSelect(l.id)}>
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    //colSpan={3}
                    count={list.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={(_, p) => setPage(p)}
                    onRowsPerPageChange={(e) =>
                      setRowsPerPage(parseInt(e.target.value, 10))
                    }
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Dashboard;
